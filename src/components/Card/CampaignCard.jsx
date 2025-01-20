import PropTypes from 'prop-types'
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router';

const CampaignCard = ({campaign}) => {

    const {image, petName, maximumDonation, _id, donatedAmount} = campaign;

    return (
        <div className='text-center w-[270px] rounded-lg transition hover:scale-105'>
            <img className='h-[220px] w-[270px] rounded-t-lg' src={image} alt="" />

            <div className='bg-[#80808042] rounded-b-lg px-1 pb-2'>
                <div className='flex items-center justify-between pt-3'>
                    <h1 className='font-bold text-lg'>{petName}</h1>
                    <h1>Maximum Donation : $ {maximumDonation}</h1>
                </div>

                <div className='flex items-center justify-between mt-2'>
                    <h1>Donated Amount : <span className='font-semibold'>${donatedAmount ? donatedAmount : '0'}</span></h1>
                    
                    <Link to={`/campaign-details/${_id}`}>
                        <button className='flex gap-1 items-center border border-purple-500 p-2 rounded-lg hover:bg-purple-500 hover:text-white transition-[0.5s]'>
                            <p><FaEye /></p>
                            <p>Details</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

CampaignCard.propTypes = {
    campaign: PropTypes.object,
}

export default CampaignCard
