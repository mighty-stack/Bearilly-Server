import notificationService from './notification.service.js';

const createNotification = async (req, res) => {
    try {
        const { userId, title, message } = req.body;
        const notification = await notificationService.createNotification(userId, title, message);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserNotifications = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const notifications = await notificationService.getUserNotifications(userId);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};

const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await notificationService.markAsRead(notificationId);
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const notificationController = {
    createNotification,
    getUserNotifications,
    markAsRead
}

export default notificationController