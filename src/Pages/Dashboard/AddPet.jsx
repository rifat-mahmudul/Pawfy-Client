import HelmetTitle from "@/Shared/HelmetTitle"
import { useState } from "react";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddPet = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [description, setDescription] = useState('');

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];


    return (
        <section className="pb-16">
            <HelmetTitle title="Add A Pet"></HelmetTitle>
            
            <div>

                <form>

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
                                    />
                                    <div className='bg-purple-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-purple-700'>
                                        Upload
                                    </div>
                                    </label>
                                </div>
                                </div>
                            </div>
                        </div>

                        {/* name input */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Pet Name</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="text" 
                            placeholder='Enter Your Name'
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-10 mt-4">
                        {/* Pet age */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Pet Age</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="number" 
                            placeholder='Enter Your Name'
                            />
                        </div>

                        {/* Pet Category */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Pet Category</h1>
                            <Select
                                defaultValue={selectedOption}
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
                            placeholder='Enter Your Name'
                            />
                        </div>

                        {/* Short description */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Short Description</h1>
                            <textarea
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            placeholder="Enter short description here...."
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
                                value={description}
                                onChange={handleDescriptionChange}
                                className="h-20"
                            />
                        </div>
                    </div>

                    <button 
                        // disabled={loading}
                        type='submit'
                        className={`py-3 w-full bg-purple-500 sm:mt-16 mt-20 rounded-lg text-white font-bold text-lg transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-400`}>
                            {/* {loading ? <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> : 'Register'} */}
                            Submit
                    </button>

                </form>

            </div>
        </section>
    )
}

export default AddPet
