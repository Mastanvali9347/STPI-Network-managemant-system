/**
 * Rule-based "AI-style" insights from simulated metrics (not a real ML model).
 */

const generateInsights = (snapshot = {}) => {
  const insights = [];
  const devices = snapshot.devices || [];
  const alerts = snapshot.alerts || [];

  const floor2 = devices.filter((d) => d.floor === 'Floor 2' || d.deviceName?.includes('Floor2'));
  const highTraffic = devices.filter((d) => d.traffic > 400);
  const warnings = devices.filter((d) => d.status === 'warning');
  const offline = devices.filter((d) => d.status === 'offline');
  const router = devices.find((d) => d.type === 'router');

  if (highTraffic.length) {
    insights.push({
      id: 'ins-traffic',
      type: 'warning',
      title: 'High traffic detected',
      message: `${highTraffic[0].deviceName} is carrying ${highTraffic[0].traffic} Mbps — review bandwidth allocation.`,
      confidence: 87,
    });
  }

  if (floor2.some((d) => d.traffic > 300)) {
    insights.push({
      id: 'ins-floor2',
      type: 'info',
      title: 'Floor 2 activity elevated',
      message: 'Simulated user density on Floor 2 exceeds weekly average during peak hours.',
      confidence: 76,
    });
  }

  if (router?.latency > 20) {
    insights.push({
      id: 'ins-latency',
      type: 'warning',
      title: 'Router latency increased',
      message: `Core router average latency is ${router.latency}ms — check upstream ISP link.`,
      confidence: 82,
    });
  } else {
    insights.push({
      id: 'ins-stable',
      type: 'success',
      title: 'Network health stable',
      message: 'Core routing and firewall segments are within normal operating thresholds.',
      confidence: 91,
    });
  }

  if (snapshot.networkStatus?.bandwidthUsagePercent > 85) {
    insights.push({
      id: 'ins-spike',
      type: 'critical',
      title: 'Traffic spike detected',
      message: `WAN utilization at ${snapshot.networkStatus.bandwidthUsagePercent}% — consider QoS policy review.`,
      confidence: 89,
    });
  }

  warnings.forEach((d, i) => {
    insights.push({
      id: `ins-warn-${i}`,
      type: 'warning',
      title: `${d.deviceName} needs attention`,
      message: `Device in ${d.location || d.floor} reported warning status (latency ${d.latency}ms).`,
      confidence: 72,
    });
  });

  if (offline.length) {
    insights.push({
      id: 'ins-offline',
      type: 'critical',
      title: 'Devices offline',
      message: `${offline.length} device(s) unreachable — check power and switch uplinks.`,
      confidence: 95,
    });
  }

  const openCritical = alerts.filter((a) => a.severity === 'critical' && !a.acknowledged);
  if (openCritical.length) {
    insights.push({
      id: 'ins-alerts',
      type: 'critical',
      title: 'Open critical alerts',
      message: `${openCritical.length} critical alert(s) require NOC review.`,
      confidence: 93,
    });
  }

  const recommendations = [
    {
      id: 'rec-1',
      title: 'Schedule maintenance window',
      detail: 'Apply firmware updates to access points during low-traffic hours (02:00–04:00 IST).',
    },
    {
      id: 'rec-2',
      title: 'Enable guest VLAN throttling',
      detail: 'Simulated guest segment shows burst traffic — cap at 50 Mbps per SSID.',
    },
    {
      id: 'rec-3',
      title: 'Review Floor 2 switch capacity',
      detail: 'Consider link aggregation if utilization stays above 80% for 7 days.',
    },
  ];

  return { insights: insights.slice(0, 8), recommendations };
};

module.exports = { generateInsights };
