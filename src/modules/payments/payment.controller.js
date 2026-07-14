import env from '../../config/env.js';

const initializePayment = async (req, res, next) => {
  try {
    const { email, amount, reference, callback_url, metadata } = req.body;

    if (!email || !amount) {
      return res.status(400).json({
        success: false,
        message: 'email and amount are required',
      });
    }

    const payload = {
      email,
      amount: Number(amount) * 100,
      reference: reference || `paystack_${Date.now()}`,
      callback_url,
      metadata: metadata || {},
    };

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env().PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      return res.status(400).json({
        success: false,
        message: data.message || 'Unable to initialize payment',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment initialized successfully',
      data: {
        authorizationUrl: data.data.authorization_url,
        reference: data.data.reference,
        accessCode: data.data.access_code,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const { reference } = req.params;

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${env().PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      return res.status(400).json({
        success: false,
        message: data.message || 'Unable to verify payment',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: data.data,
    });
  } catch (error) {
    next(error);
  }
};

const paymentController = {
  initializePayment,
  verifyPayment,
};

export default paymentController;
