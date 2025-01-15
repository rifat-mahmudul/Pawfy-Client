import HelmetTitle from "@/Shared/HelmetTitle"

const AddPet = () => {
    return (
        <section className="border border-red-500">
            <HelmetTitle title="Add A Pet"></HelmetTitle>
            
            <div>

                <form>

                    <div className="flex flex-col sm:flex-row items-center gap-10">
                        {/* Image input */}
                        <div className='sm:w-[48%] w-[100%]'>
                            <h1 className='font-semibold mb-2'>Upload Photo</h1>

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
                            <h1 className='font-semibold mb-2'>Name</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="text" 
                            placeholder='Enter Your Name'
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-10 mt-4">
                        {/* Image input */}
                        <div className='sm:w-[48%]'>
                            <h1 className='font-semibold mb-2'>Name</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="text" 
                            placeholder='Enter Your Name'
                            />
                        </div>

                        {/* name input */}
                        <div className='sm:w-[48%]'>
                            <h1 className='font-semibold mb-2'>Name</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="text" 
                            placeholder='Enter Your Name'
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-10 mt-4">
                        {/* Image input */}
                        <div className='sm:w-[48%]'>
                            <h1 className='font-semibold mb-2'>Name</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="text" 
                            placeholder='Enter Your Name'
                            />
                        </div>

                        {/* name input */}
                        <div className='sm:w-[48%]'>
                            <h1 className='font-semibold mb-2'>Name</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="text" 
                            placeholder='Enter Your Name'
                            />
                        </div>
                    </div>

                </form>

            </div>
        </section>
    )
}

export default AddPet
