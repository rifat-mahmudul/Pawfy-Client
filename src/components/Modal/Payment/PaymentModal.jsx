
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types'
import CheckoutForm from './CheckoutForm';

const PaymentModal = ({ isOpen, onClose, campaignData, refetch }) => {

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
    const maximumDonation = campaignData.maximumDonation;
    const petName = campaignData.petName;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[70%] max-w-lg rounded-lg shadow-lg p-5 relative overflow-hidden">
                <h2 className="text-3xl font-bold mb-4 text-center text-purple-500">{'Payment Details'}</h2>

                <h1 className='mb-3 text-lg'><span className='font-bold'>Pet Name :</span>{petName}</h1>

                <h1 className='mb-3 text-lg'><span className='font-bold'>Maximum Donation :</span> $ {maximumDonation}</h1>

                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                        refetch={refetch}
                        campaignData={campaignData}
                        onClose={onClose}
                        >
                        </CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

PaymentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object,
    campaignData : PropTypes.object,
    refetch : PropTypes.func,
};

export default PaymentModal;
