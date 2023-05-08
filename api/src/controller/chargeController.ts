import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51N3ihlL855zR6kNDHj8kE4AHaWG465FYySwVS6Jln6g6ioivHtzyAeYIDWlQghscRtYr0K1ROttoS5GH0S9HzYne00WrSJY278',{
  apiVersion:'2022-11-15'
});


const chargeController =  async (req: any, res: any) => {
  try {
    const { amount, source, receipt_email } = req.body;

    // Create a Stripe charge
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
      receipt_email
    });

    res.json({ success: true, charge });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export default chargeController;

