import { getAdminOverview, listUsers, updateUserRole, listAccessCodes, getAdminAnalytics } from './admin.service.js';

const getAdminDashboard = async (req, res, next) => {
  try {
    const payload = await getAdminOverview();
    res.status(200).json({
      success: true,
      message: 'Admin dashboard overview retrieved successfully',
      data: payload,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const payload = await listUsers(req.query);
    res.status(200).json({
      success: true,
      data: payload,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRoleHandler = async (req, res, next) => {
  try {
    const user = await updateUserRole(req.params.id, req.body.role);
    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getAccessCodes = async (req, res, next) => {
  try {
    const payload = await listAccessCodes(req.query);
    res.status(200).json({
      success: true,
      data: payload,
    });
  } catch (error) {
    next(error);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const payload = await getAdminAnalytics();
    res.status(200).json({
      success: true,
      data: payload,
    });
  } catch (error) {
    next(error);
  }
};

const adminController = {
  getAdminDashboard,
  getUsers,
  updateUserRoleHandler,
  getAccessCodes,
  getAnalytics,
};

export default adminController;
