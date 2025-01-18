import HelmetTitle from "@/Shared/HelmetTitle";
import { useState } from "react";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { imageUpload } from "@/lib/utils";
import { ImSpinner9 } from "react-icons/im";
import { htmlToText } from 'html-to-text';
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useRole from "@/Hooks/useRole";

const UpdatePet = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [role] = useRole();

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const options = [
        { value: 'Cat', label: 'Cat' },
        { value: 'Dog', label: 'Dog' },
        { value: 'Bird', label: 'Bird' },
        { value: 'Rabbits', label: 'Rabbits' },
        { value: 'Mouse', label: 'Mouse' },
    ];

    const { id } = useParams();
    const { data: pet = {}, refetch } = useQuery({
        queryKey: ['singlePet', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/pet/${id}`);
            return data;
        }
    });

    const { petName, petAge, location, sortDescription, category, longDescription, image, _id } = pet;

    const navigate = useNavigate();

    const { mutateAsync } = useMutation({
        mutationFn: async petData => {
            const { data } = await axiosSecure.patch(`/pet/${_id}`, petData);
            return data;
        }
    });

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const plainTextDescription = htmlToText(description);

        const form = e.target;
        const petName = form.elements.petName.value;
        const petAge = form.elements.petAge.value;
        const location = form.elements.location.value;
        const sortDescription = form.elements.sortDescription.value;
        const category = selectedOption?.value;
        const image = form.image.files;
        let imageUrl = pet.image;

        console.log(imageUrl)

        if (image.length > 0) {
            const uploadResponse = await imageUpload(image);
            imageUrl = uploadResponse?.data?.display_url || null;
        }

        const petData = {
            petName,
            petAge,
            location,
            sortDescription,
            category,
            longDescription: plainTextDescription,
            image: imageUrl
        };

        try {
            await mutateAsync(petData);
            toast.success('Pet updated successfully!');
            if(role === 'admin') {
                navigate('/dashboard/all-pets');
            }
            else{
                navigate('/dashboard/my-added-pets');
            }
        } catch (error) {
            console.log('Error from update pets:', error);
            toast.error('Update failed. Please try again!');
        }
        refetch();
        setLoading(false);
    };

    return (
        <section className="pb-16">
            <HelmetTitle title="Update Pet"></HelmetTitle>

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
                                placeholder='Enter Pet Name'
                                name='petName'
                                defaultValue={petName}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-10 mt-4">
                        {/* Pet age */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Pet Age</h1>
                            <input 
                                className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                                type="text" 
                                placeholder='Enter Pet Age'
                                name='petAge'
                                defaultValue={petAge}
                            />
                        </div>

                        {/* Pet Category */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Pet Category</h1>
                            <Select
                                defaultValue={options.find(option => option.value === category) || null}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-10 mt-4">
                        {/* Pet location */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Pet Location</h1>
                            <input 
                                className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                                type="text" 
                                placeholder='Enter Pet Location'
                                name='location'
                                defaultValue={location}
                            />
                        </div>

                        {/* Short description */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Short Description</h1>
                            <textarea
                                className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                                placeholder="Enter short description here...."
                                name='sortDescription'
                                defaultValue={sortDescription}
                            >
                            </textarea>
                        </div>
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
    );
};

export default UpdatePet;
