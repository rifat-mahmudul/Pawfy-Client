import PropTypes from 'prop-types'
import { IoLocationOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router';

const CampaignCard = ({campaign}) => {

    const {image, maximumDonation, sortDescription, longDescription,lastDate, _id} = campaign;

    return (
        <div className='text-center w-[270px] rounded-lg transition hover:scale-105'>
            <img className='h-[220px] w-[270px] rounded-t-lg' src={image} alt="" />

            <h1 className='font-bold text-lg'>Maximum Donation : {maximumDonation}</h1>
            <h1 className='font-bold text-lg'>Maximum Donation : {maximumDonation}</h1>
        </div>
    )
}

CampaignCard.propTypes = {
    campaign: PropTypes.object,
}

export default CampaignCard
