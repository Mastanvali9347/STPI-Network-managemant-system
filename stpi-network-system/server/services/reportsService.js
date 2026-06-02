const { getExtendedAnalytics } = require('./analyticsExtended');
const { generateInsights } = require('./insightsService');
const deviceManagement = require('./deviceManagementService');

/**
 * Build report payload for export (daily / weekly / monthly).
 */
const buildReport = (period = 'daily', snapshot = {}) => {
  const rangeMap = { daily: 'today', weekly: '7d', monthly: '30d' };
  const range = rangeMap[period] || 'today';
  const analytics = getExtendedAnalytics(range, snapshot);
  const { insights, recommendations } = generateInsights(snapshot);
  const devices = deviceManagement.getAll();
  const alerts = snapshot.alerts || [];

  return {
    meta: {
      title: `STPI Network Report — ${period.charAt(0).toUpperCase() + period.slice(1)}`,
      generatedAt: new Date().toISOString(),
      period,
      environment: 'Simulated Enterprise Monitoring',
    },
    summary: analytics.kpis,
    analytics,
    insights,
    recommendations,
    devices,
    alerts: alerts.slice(0, 50),
    networkStatus: snapshot.networkStatus,
  };
};

module.exports = { buildReport };
