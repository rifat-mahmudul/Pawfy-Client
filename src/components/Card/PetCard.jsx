import PropTypes from 'prop-types'
import { IoLocationOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const PetCard = ({pet}) => {

    const {image, petName, petAge, location, _id} = pet;

    useEffect(() => {
            AOS.init();
    }, []);

    return (
        <div data-aos="fade-up"  data-aos-duration="1000" className='text-center w-[270px] rounded-lg transition hover:scale-105 overflow-hidden'>
            <img className='h-[220px] w-[270px] rounded-t-lg hover:scale-110 transition' src={image} alt="" />

            <div className='bg-[#80808042] rounded-b-lg px-1 pb-2'>
                <div className='flex items-center justify-between pt-3'>
                    <h1 className='font-bold text-lg'>{petName}</h1>
                    <h1>Age : {petAge}</h1>
                </div>

                <div className='flex items-center justify-between mt-2'>
                    <h1 className='flex gap-1 items-center'>
                        <p><IoLocationOutline /></p>
                        <p>{location}</p>
                    </h1>
                    
                    <Link to={`/pet-details/${_id}`}>
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

PetCard.propTypes = {
    pet: PropTypes.object,
}

export default PetCard
