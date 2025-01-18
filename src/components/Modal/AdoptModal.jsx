
import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const AdoptModal = ({ isOpen, onClose, pet, user }) => {
    
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const {petName, petAge, longDescription, userEmail, category, image, _id : petID} = pet;    

    const {mutateAsync} = useMutation({
        mutationFn : async foodData => {
            const {data} = await axiosSecure.post(`/adopt-request`, foodData)
            return data;
        }
    })

    const handleRequest = async (e) => {

        if(!user){
            return navigate('/login')
        }

        e.preventDefault();
        const petData = {
            petName,
            petAge,
            longDescription,
            category,
            image,
            address : address,
            phoneNumber : phoneNumber,
            petOwner : userEmail,
            requestUser : {
                name : user?.displayName,
                email : user?.email,
            },
        }

        if(user?.email === userEmail){
            return toast.error('You added this pet. Permission not allowed.');
        }

        try {
            await mutateAsync(petData);
            toast.success('Request Submitted Successfully.');
            navigate('/pet-listing')
        } catch (error) {
            toast.error('Request failed. Please try again.', error)
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div data-aos="zoom-in-up"  data-aos-duration="1000" className="bg-white w-[90%] max-w-lg rounded-lg shadow-lg p-5 relative overflow-hidden">
                <h2 className="text-3xl font-bold mb-4 text-center text-purple-500">{petName}</h2>

                <form onSubmit={handleRequest}>
                    <div className="space-y-3 max-h-[70vh] overflow-y-auto p-3">
                        <div className='flex gap-2'>
                            <label className="font-semibold">Pet ID:</label>
                            <p className="text-blue-500">{petID}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Food Image:</label>
                            <img
                                src={image}
                                alt={petName}
                                className="w-full h-40 rounded object-cover"
                            />
                        </div>
                        <div className="flex gap-2">
                            <label className="font-semibold">Category:</label>
                            <p >{category}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Your Email:</label>
                            <p className="bg-inherit border border-blue-500 p-2 rounded cursor-not-allowed">{user?.email}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Your Name:</label>
                            <p className="bg-inherit border border-blue-500 p-2 rounded cursor-not-allowed">{user?.displayName}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Phone Number:</label>
                            <input
                                className="w-full p-2 rounded bg-inherit border border-blue-500"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder='Enter your Phone Number'
                                required
                            ></input>
                        </div>
                        <div>
                            <label className="font-semibold">Address:</label>
                            <input
                                className="w-full p-2 rounded bg-inherit border border-blue-500"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='Enter Your Address'
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between">
                        <button
                            type='submit'
                            className="bg-gradient-to-r from-purple-700 to-purple-400 hover:from-purple-400 hover:to-purple-700 text-white px-4 py-2 rounded-lg"
                        >
                            Submit Request
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AdoptModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    pet: PropTypes.object,
    user: PropTypes.object
};

export default AdoptModal;
