import { Link, useLocation, useNavigate } from 'react-router'
import loginImg from '../../assets/login-pets.webp'
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from '@/Provider/ThemeProvider';
import { FaGithub } from "react-icons/fa";
import useAuth from '@/Hooks/useAuth';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { ImSpinner9 } from "react-icons/im";

const LoginForm = () => {

    const {theme} = useTheme();
    const {googleSignIn, signIn, setLoading, loading} = useAuth();
    const navigate = useNavigate;
    const location = useLocation();
    const from = location.state || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const {email, password} = data;
        
        try {
            await signIn(email, password);
            toast.success('Login Successful!');
            navigate(from);
        } catch (error) {
            toast.error('Login failed. Please try again', error)
        }
        finally{
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await googleSignIn();
            toast.success('Login Successful!');
            navigate(from);
        } 
        catch (error) {
            toast.error('Login failed. Please try again', error)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className={`max-w-[90%] lg:max-w-[900px] mx-auto flex flex-col sm:flex-row border border-purple-500 shadow-xl ${theme === 'light' ? 'shadow-purple-300' : 'shadow-purple-900'} sm:py-8 sm:pl-8 rounded-lg p-2 sm:p-0`}>
        
            <div className='sm:w-[40%]'>
                <img className='h-[400px] ' src={loginImg} alt="" />
            </div>

            <div className='sm:w-[60%]'>

                <h1 className='text-center text-3xl font-russo mb-3'>Login</h1>

                <div className='sm:px-8'>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* email input */}
                        <div>
                            <h1 className='font-semibold mb-2'>Email</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="email" 
                            placeholder='Enter Your Email' 
                            {...register('email', {
                                required : "Email is required",
                                pattern : {
                                    value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message : 'Invalid Email Address'
                                }
                            })}
                            />
                        </div>
                        
                        {
                            errors.email && 
                            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                        }

                        {/* password input */}
                        <div className='mt-3'>
                            <h1 className='font-semibold mb-2'>Password</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="password" 
                            placeholder='Enter Your Password' 
                            {...register('password', {
                                required : "Password is required",
                                minLength : {
                                    value : 6,
                                    message : "Password must be at least 6 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                    message: "Password must include uppercase and lowercase letters",
                                },
                            })}
                            />
                        </div>
                        
                        {
                            errors.password && 
                            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                        }

                        <button 
                        disabled={loading}
                        type='submit'
                        className={`py-3 w-full bg-purple-500 mt-4 rounded-lg text-white font-bold text-lg transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-400`}
                        >
                            {loading ? <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> : 'Register'}
                        </button>

                    </form>

                    <p className='text-sm mt-4 sm:flex justify-center space-x-2'>
                        <span>Do not have an account?</span>
                        <span className='text-blue-500'>
                            <Link className='flex items-center space-x-1' to='/register'>
                            <span>Register here!</span> <LuSquareArrowOutUpRight />
                        </Link>
                        </span>
                    </p>

                    <div className='flex items-center justify-center space-x-4 mt-1'>
                        <div className='border border-gray-300 w-full'></div>
                        <div>
                            <h1>Or</h1>
                        </div>
                        <div className='border border-gray-300 w-full'></div>
                    </div>

                    <div className='flex flex-col sm:flex-row sm:space-x-5'>
                        
                        <button 
                        onClick={handleGoogleLogin}
                        className='py-3 w-full mt-2 rounded-lg font-bold flex items-center justify-center space-x-2 disabled:cursor-pointer border border-purple-500'
                        >
                            <FcGoogle className='text-3xl' /> <span>Continue With Google</span>
                        </button>

                        <button 
                        className='py-3 w-full mt-2 rounded-lg font-bold flex items-center justify-center space-x-2 disabled:cursor-pointer border border-purple-500'
                        >
                            <FaGithub className='text-3xl' /> <span>Continue With Github</span>
                        </button>
                    </div>

                </div>
                
            </div>

        </div>
    )
}

export default LoginForm
