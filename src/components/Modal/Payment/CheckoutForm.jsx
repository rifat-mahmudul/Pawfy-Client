import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import PropTypes from 'prop-types'
import './Checkout.css'
import toast from "react-hot-toast";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ImSpinner9 } from "react-icons/im";

const CheckoutForm = ({onClose, campaignData, refetch}) => {

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [amount, setAmount] = useState();
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        if (amount) {
            getPaymentIntent();
        }
    }, [amount])

    const getPaymentIntent = async () => {

        try {
            const {data} = await axiosSecure.post('/create-payment-intent', {
                amount : amount,
                petId : campaignData.petId
            })
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.log(`error from checkout form : ${error}`)
        }
    }

    const handleSubmit = async (e) => {
        setProcessing(true)
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            setProcessing(false)
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
    
        if (error) {
            setProcessing(false)
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        // confirm payment
        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
                    card: card,
                    billing_details: {
                    name: campaignData?.donator?.name,
                    email: campaignData?.donator?.email,
                },
            },
        })

        if(paymentIntent.status === 'succeeded'){
            try {
                await axiosSecure.patch(`/donation/${campaignData?.petId}`, {
                    donator : campaignData?.donator,
                    donatedAmount : Number(amount),
                    transactionId: paymentIntent?.id,
                } )
                toast.success('Donation Successful!');
                refetch();
                navigate('/dashboard/my-donations');
            } catch (error) {
                console.log(error)
            } finally {
                setProcessing(false);
            }
        }

    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                type="number" 
                className='border border-purple-500 w-full p-3 outline-0 focus:border-2 rounded-lg mb-4' 
                placeholder='Enter Amount'
                onChange={e => setAmount(e.target.value)}
                required
                />
            </div>

            <CardElement
                options={{
                style: {
                    base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    },
                    invalid: {
                    color: '#9e2146',
                    },
                },
                }}
            />

            <div className="mt-5 flex justify-between">
                <button 
                className="bg-gradient-to-r from-purple-700 to-purple-400 hover:from-purple-400 hover:to-purple-700 text-white px-4 py-2 rounded-lg" 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}
                >
                    {processing ? <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> : `Donate $ ${amount}`}
                </button>
                
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </form>
    )
}

CheckoutForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    campaignData : PropTypes.object,
    refetch : PropTypes.func
};


export default CheckoutForm
