import Stripe from "stripe"
import { Payment } from "../modules/paymentSchema.js"
import dotenv from "dotenv"

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SCRET_KEY)

export const createPayment = async(req,res)=>{
    try {
        const { amount, currency } = req.body;
    
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // المبلغ بالعملة الفرعية (مثلاً بالسنت للدولار)
            currency: currency || 'usd', // العملة المطلوبة
            payment_method_types: ['card'], // تحديد طريقة الدفع (البطاقات هنا)
        });
    
        return res.status(200).json({
            status:"success",
            data:{
                clientSecret: paymentIntent.client_secret,
            }
        });
    } catch (error) {
        return res.status(500).json({status:"error", error: error.message });
    }
}

export const paymentConfirmation = async(req,res)=>{
    try {
        const { paymentIntentId } = req.body;
        
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            const payment = new Payment({
                userId:req.user.id,
                paymentId:paymentIntent.id,
                amount:paymentIntent.amount / 100,
                amount_received:paymentIntent.amount_received / 100,
                currency:paymentIntent.currency,
                status:paymentIntent.status
            })
            payment.save().then(()=>{
                return res.status(200).json({status:"success", message: 'Payment confirmed successfully' });
            }).catch((error)=>{
                return res.status(400).json({status:"fail", message: error.message });
            })
        } else {
            return res.status(400).json({status:"fail", message: 'Payment confirmation failed' });
        }
    } catch (error) {
        return res.status(500).json({status:"error", message: error.message });
    }
}