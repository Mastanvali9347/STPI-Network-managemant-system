const deviceManagement = require('../services/deviceManagementService');
const networkSimulator = require('../services/networkSimulator');

const refreshSim = () => networkSimulator.refreshDevices();

exports.listDevices = (req, res) => {
  res.json(deviceManagement.getAll());
};

exports.getDevice = (req, res) => {
  const device = deviceManagement.getById(req.params.id);
  if (!device) return res.status(404).json({ message: 'Device not found' });
  res.json(device);
};

exports.createDevice = (req, res) => {
  const { deviceName, ipAddress } = req.body;
  if (!deviceName?.trim() || !ipAddress?.trim()) {
    return res.status(400).json({ message: 'Device name and IP address are required' });
  }
  const device = deviceManagement.create(req.body);
  refreshSim();
  res.status(201).json(device);
};

exports.updateDevice = (req, res) => {
  const device = deviceManagement.update(req.params.id, req.body);
  if (!device) return res.status(404).json({ message: 'Device not found' });
  refreshSim();
  res.json(device);
};

exports.deleteDevice = (req, res) => {
  const ok = deviceManagement.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Device not found' });
  refreshSim();
  res.json({ message: 'Device deleted' });
};

exports.toggleDevice = (req, res) => {
  const device = deviceManagement.toggleEnabled(req.params.id);
  if (!device) return res.status(404).json({ message: 'Device not found' });
  refreshSim();
  res.json(device);
};
