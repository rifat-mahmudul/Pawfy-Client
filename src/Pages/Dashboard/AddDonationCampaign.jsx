import HelmetTitle from "@/Shared/HelmetTitle"
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useAuth from "@/Hooks/useAuth";
import { useForm } from "react-hook-form"
import { imageUpload } from "@/lib/utils";
import { ImSpinner9 } from "react-icons/im";
import { htmlToText } from 'html-to-text';
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddDonationCampaign = () => {

    const [description, setDescription] = useState('');
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()

    const watchedImage = watch('image');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {mutateAsync} = useMutation({
        mutationFn : async donateData => {
            const {data} = await axiosSecure.post('/donation', donateData);
            return data;
        }
    })

    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = async data => {

        setLoading(true);
        const {image} = data;
        const photo = await imageUpload(image);
        const plainTextDescription = htmlToText(description);

        data.image = photo.data.display_url;
        data.longDescription = plainTextDescription;
        data.lastDate = startDate
        data.userEmail = user?.email;
        data.date = date;
        data.time = time;
        
        try {
            await mutateAsync(data);
            toast.success('Donation create successfully!');
            navigate('/dashboard/my-donation-campaign')
        } catch (error) {
            console.log('error from create donation',error);
            toast.error('Donation create failed. Please try again!')
        }
        setLoading(false)
    }


    return (
        <section className="pb-16">
            <HelmetTitle title="Create Donation Campaign"></HelmetTitle>
            
            <div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex flex-col sm:flex-row items-center gap-10">
                        {/* Image input */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Pet Image</h1>

                            <div className='w-full  m-auto rounded-lg'>
                                <div className='file_upload px-5 py-3 relative border-2 border-dotted border-purple-500 rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                    <input
                                        className='text-sm cursor-pointer w-full hidden'
                                        type='file'
                                        accept='image/*'
                                        hidden
                                        {...register('image', {
                                            required : "Image is required"
                                        })}
                                    />
                                    <div className='bg-purple-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-purple-700'>
                                    {watchedImage && watchedImage[0] ? `${watchedImage[0].name.slice(0, 10)}...${watchedImage[0].type}` : "Upload"}
                                    </div>
                                    </label>
                                </div>
                                </div>
                            </div>

                            {
                            errors.image && 
                            <p className='text-red-500 text-sm mt-1'>{errors.image.message}</p>
                            }
                        </div>


                        {/* Maximum donation input */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Maximum Donation</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="number" 
                            placeholder='Enter maximum donation'
                            {...register('maximumDonation', {
                                required : "Maximum donation is required"
                            })}
                            />

                            {
                                errors.maximumDonation && 
                                <p className='text-red-500 text-sm mt-1'>{errors.maximumDonation.message}</p>
                            }
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
                            />
                        </div>

                        
                        {/* Short description */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Short Description</h1>
                            <textarea
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit '
                            placeholder="Enter short description here...."
                            {...register('sortDescription', {
                                required : "Short description is required"
                            })}
                            >
                            </textarea>

                            {
                                errors.sortDescription && 
                                <p className='text-red-500 text-sm mt-1'>{errors.sortDescription.message}</p>
                            }
                        </div>
                    </div>

                    <div className="mt-4">
                        {/* Long description */}
                        <div>
                            <h1 className='font-semibold mb-2'>Long Description</h1>
                            <ReactQuill
                                theme="snow"
                                value={description}
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

export default AddDonationCampaign