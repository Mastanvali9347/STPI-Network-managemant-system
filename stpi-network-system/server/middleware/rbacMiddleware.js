const { can } = require('../utils/rbac');

const requirePermission = (permission) => (req, res, next) => {
  const role = req.user?.role || req.auth?.role;
  if (!can(role, permission)) {
    return res.status(403).json({
      message: 'Insufficient permissions for this action',
      required: permission,
    });
  }
  next();
};

module.exports = { requirePermission };
