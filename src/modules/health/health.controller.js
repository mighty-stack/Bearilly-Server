const getHealth = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
  });
};

const healthController = {
  getHealth,
};

export default healthController;
