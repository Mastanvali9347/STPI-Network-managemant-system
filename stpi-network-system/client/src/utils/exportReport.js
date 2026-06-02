import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/** Export report data as CSV */
export const exportCSV = (report, filename = 'stpi-report') => {
  const rows = [
    ['STPI Network Report', report.meta?.period || ''],
    ['Generated', report.meta?.generatedAt || ''],
    [],
    ['KPI', 'Value'],
    ...Object.entries(report.summary || {}).map(([k, v]) => [k, v]),
    [],
    ['Devices'],
    ['Name', 'IP', 'Type', 'Status', 'Location', 'Uptime'],
    ...(report.devices || []).map((d) => [
      d.deviceName,
      d.ipAddress,
      d.type,
      d.status,
      d.location,
      d.uptime,
    ]),
    [],
    ['Alerts'],
    ['Severity', 'Title', 'Message', 'Source'],
    ...(report.alerts || []).map((a) => [a.severity, a.title, a.message, a.source]),
  ];

  const csv = rows.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
};

/** Excel-compatible TSV export */
export const exportExcel = (report, filename = 'stpi-report') => {
  exportCSV(report, filename);
};

/** PDF export with summary tables */
export const exportPDF = (report, filename = 'stpi-report') => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(report.meta?.title || 'STPI Network Report', 14, 18);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date(report.meta?.generatedAt || Date.now()).toLocaleString()}`, 14, 26);
  doc.text('Simulated enterprise data — educational use only', 14, 32);

  const kpiRows = Object.entries(report.summary || {}).map(([k, v]) => [
    k.replace(/([A-Z])/g, ' $1').trim(),
    String(v),
  ]);

  autoTable(doc, {
    startY: 38,
    head: [['Metric', 'Value']],
    body: kpiRows,
    theme: 'grid',
    headStyles: { fillColor: [34, 211, 238] },
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 8,
    head: [['Device', 'IP', 'Status', 'Location']],
    body: (report.devices || []).slice(0, 15).map((d) => [
      d.deviceName,
      d.ipAddress,
      d.status,
      d.location || d.floor,
    ]),
    theme: 'striped',
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 8,
    head: [['Severity', 'Alert', 'Source']],
    body: (report.alerts || []).slice(0, 10).map((a) => [a.severity, a.title, a.source]),
    theme: 'striped',
  });

  doc.save(`${filename}.pdf`);
};

const downloadBlob = (blob, name) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};
