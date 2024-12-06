import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Logout() {
    const [logininfo, setlogininfo] = useState({ adhaarno: '', password: '' });
    const [loginSuccess, setLoginSuccess] = useState(false); 

    const handlechange = (e) => {
        const { name, value } = e.target;
        setlogininfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { adhaarno, password } = logininfo;

        try {
            const response = await axios.post('http://localhost:7000/user/login', { adhaarno, password });

            if (response.status === 200) {
                console.log(response);
                setLoginSuccess(true); // Show success message
                setlogininfo({ adhaarno: '', password: '' });
                toast.success('Login Successfully')


                
            } 
        } catch (error) {
            // console.log('Error during login:', error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
        <ToastContainer/>
            <section className="bg-gray-50 dark:bg-gray-900  w-screen h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
                    <Link to="Login" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Login
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            {loginSuccess && <SuccessMessage onDismiss={() => setLoginSuccess(false)} />} {/* Success Message */}
                            <form className="space-y-4 md:space-y-6" onSubmit={handlesubmit}>
                                <div>
                                    <label htmlFor="adhaarno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Aadhaar</label>
                                    <input
                                        onChange={handlechange}
                                        value={logininfo.adhaarno}
                                        type="text"
                                        name="adhaarno"
                                        id="adhaarno"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your Aadhaar Number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        onChange={handlechange}
                                        value={logininfo.password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Logout;
