import { useEffect, useState } from 'react';
import { FileText, Download, FileSpreadsheet, FileType } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { enterpriseApi } from '../api/enterpriseApi';
import { exportCSV, exportExcel, exportPDF } from '../utils/exportReport';

const PERIODS = [
  { id: 'daily', label: 'Daily report' },
  { id: 'weekly', label: 'Weekly report' },
  { id: 'monthly', label: 'Monthly report' },
];

export const ReportsPage = () => {
  const [period, setPeriod] = useState('daily');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    enterpriseApi
      .getReport(period)
      .then((res) => {
        if (active) setReport(res.data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [period]);

  const baseName = `stpi-${period}-report`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reports</h1>
        <p className="text-sm text-slate-400">
          Generate and export simulated network reports (educational use)
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PERIODS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPeriod(p.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium border transition ${
              period === p.id
                ? 'border-cyan-500/40 bg-cyan-500/15 text-cyan-400'
                : 'border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!report || loading}
          onClick={() => exportPDF(report, baseName)}
          className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/60 px-4 py-2 text-sm text-white hover:border-cyan-500/40 disabled:opacity-50"
        >
          <FileText className="h-4 w-4 text-rose-400" /> Export PDF
        </button>
        <button
          type="button"
          disabled={!report || loading}
          onClick={() => exportCSV(report, baseName)}
          className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/60 px-4 py-2 text-sm text-white hover:border-cyan-500/40 disabled:opacity-50"
        >
          <Download className="h-4 w-4 text-cyan-400" /> Export CSV
        </button>
        <button
          type="button"
          disabled={!report || loading}
          onClick={() => exportExcel(report, baseName)}
          className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/60 px-4 py-2 text-sm text-white hover:border-cyan-500/40 disabled:opacity-50"
        >
          <FileSpreadsheet className="h-4 w-4 text-emerald-400" /> Export Excel
        </button>
      </div>

      {loading ? (
        <div className="h-64 rounded-xl bg-slate-800/40 animate-pulse shimmer-border" />
      ) : report ? (
        <Card title={report.meta?.title} className="bg-white/5! border-white/10!">
          <p className="text-xs text-slate-500 mb-4">
            Generated {new Date(report.meta.generatedAt).toLocaleString()}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {Object.entries(report.summary || {}).map(([key, val]) => (
              <div key={key} className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-3">
                <p className="text-[10px] uppercase text-slate-500">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-lg font-bold text-white">{String(val)}</p>
              </div>
            ))}
          </div>
          <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <FileType className="h-4 w-4" /> Insights summary
          </h3>
          <ul className="space-y-2 text-sm text-slate-400 mb-6">
            {(report.insights || []).slice(0, 5).map((i) => (
              <li key={i.id}>• {i.title}: {i.message}</li>
            ))}
          </ul>
          <h3 className="text-sm font-semibold text-white mb-2">Device summary ({report.devices?.length} devices)</h3>
          <p className="text-xs text-slate-500">
            Full device and alert tables are included in PDF/CSV exports.
          </p>
        </Card>
      ) : (
        <p className="text-slate-500 text-sm">Unable to load report</p>
      )}
    </div>
  );
};
