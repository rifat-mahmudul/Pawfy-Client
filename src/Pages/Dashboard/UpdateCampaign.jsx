import HelmetTitle from "@/Shared/HelmetTitle"
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { imageUpload } from "@/lib/utils";
import { ImSpinner9 } from "react-icons/im";
import { htmlToText } from 'html-to-text';
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useRole from "@/Hooks/useRole";

const UpdateCampaign = () => {

    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [role] = useRole();

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const { id } = useParams();
    const { data: campaign = {}, refetch } = useQuery({
        queryKey: ['singlePet', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/campaign/${id}`);
            return data;
        }
    });

    const { petName, maximumDonation, sortDescription, longDescription, image, _id } = campaign;

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        if (campaign.lastDate) {
            setStartDate(new Date(campaign.lastDate));
        }
    }, [campaign.lastDate]); 

    const {mutateAsync} = useMutation({
        mutationFn : async (petData) => {
            const {data} = await axiosSecure.patch(`/donationCampaign/${_id}`, petData)
            return data;
        }
    })

    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = async e => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const petName = form.elements.petName.value;
        const maximumDonation = form.elements.maximumDonation.value;
        const sortDescription = form.elements.sortDescription.value;
        const image = form.image.files;
        let imageUrl = campaign.image;
        const plainTextDescription = htmlToText(description);

        if (image.length > 0) {
            const uploadResponse = await imageUpload(image);
            imageUrl = uploadResponse?.data?.display_url || null;
        }

        const petData = {
            petName,
            maximumDonation,
            sortDescription,
            longDescription: plainTextDescription,
            image: imageUrl,
            lastDate : startDate
        };

        
        try {
            await mutateAsync(petData);
            toast.success('Campaign Update successfully!');
            if(role === 'admin') {
                navigate('/dashboard/all-donations');
            }
            else{
                navigate('/dashboard/my-donation-campaign');
            }
        } catch (error) {
            console.log('error from Campaign Update',error);
            toast.error('Donation Campaign Update. Please try again!')
        }
        refetch();
        setLoading(false)
    }


    return (
        <section className="pb-16">
            <HelmetTitle title="Update My Added Campaign"></HelmetTitle>
            
            <div>

                <form onSubmit={handleSubmit}>

                    <div className="flex flex-col sm:flex-row items-center gap-10">
                        {/* Image input */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Pet Image</h1>

                            <div className="flex gap-5">
                                <div className='w-full m-auto rounded-lg'>
                                    <div className='file_upload px-5 py-3 relative border-2 border-dotted border-purple-500 rounded-lg'>
                                        <div className='flex flex-col w-max mx-auto text-center'>
                                            <label>
                                                <input
                                                    className='text-sm cursor-pointer w-full hidden'
                                                    type='file'
                                                    name='image'
                                                    accept='image/*'
                                                />
                                                <div className='bg-purple-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-purple-700'>
                                                    Upload
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                {image && <img src={image} alt="Pet" className='mt-3 rounded-lg h-14 w-14' />}
                                </div>
                            </div>
                        </div>

                         {/* name input */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Pet Name</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="text" 
                            name='petName'
                            defaultValue={petName}
                            />
                        </div>

                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-10 mt-4">

                        {/* Last date of donation */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Last Date Of Donation</h1>
                            <DatePicker 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)} 
                            wrapperClassName="w-full"
                            />
                        </div>

                        
                        {/* Maximum donation input */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Maximum Donation</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="number" 
                            placeholder='Enter maximum donation'
                            name="maximumDonation"
                            defaultValue={maximumDonation}
                            />
                        </div>

                    </div>

                    
                        {/* Short description */}
                        <div className='w-[100%] mt-4'>
                            <h1 className='font-semibold mb-2'>Short Description</h1>
                            <textarea
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit '
                            placeholder="Enter short description here...."
                            name='sortDescription'
                            defaultValue={sortDescription}
                            >
                            </textarea>
                        </div>

                    <div className="mt-4">
                        {/* Long description */}
                        <div>
                            <h1 className='font-semibold mb-2'>Long Description</h1>
                            <ReactQuill
                                theme="snow"
                                value={description || longDescription || ''}
                                onChange={handleDescriptionChange}
                                className="h-20"
                            />
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        type='submit'
                        className={`py-3 w-full bg-purple-500 sm:mt-16 mt-20 rounded-lg text-white font-bold text-lg transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-400`}>
                            {loading ? <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> : 'Submit'}
                    </button>

                </form>

            </div>
        </section>
    )
}

export default UpdateCampaign