import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupSuccessMessage from './SignupSuccessMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Candidatesignup() {
    const navigate = useNavigate();
    const [signupinfo, setsignupinfo] = useState({
        name: '',
        party: '',
        age: ''
    });
    const [message, setMessage] = useState('');
    const [success, setsuccess] = useState(false);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setsignupinfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, party, age } = signupinfo;

        if (!name || !party || !age) {
            setMessage("All fields are required.");
            return;
        }

        try {
                const response = await axios.post(
                    'http://localhost:7000/candidate/candidatesignup',
                    { name, party, age }
                );

                if (response.status === 200) {
                    setsuccess(true);
                    setsignupinfo({ name: '', party: '', age: '' });
                    setMessage('Signup successful!');
                    toast.success('candidate sign up successfully');
                } 
        } catch (error) {
            // console.error("Error during signup:", error);
            setMessage('Internal server error. Please try again later.');
            setMessage(error.response.data)
            toast.error(error.response.data)
        }
    };

    return (
        <>
        <ToastContainer/>
            <section className="bg-gray-50 dark:bg-gray-900 w-sceen h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 w-[100%] h-[100%] pb-48">
                    <Link to="Signup" className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        CandidateSignup   
                    </Link>
                    <div className="w-[35%] bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                        <div className="space-y-4 md:space-y-6 sm:p-8 h-[30%]">
                            <h1 className="text-center text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an Party Account
                            </h1>
                            {success && <SignupSuccessMessage onDismiss={() => setsuccess(false)} />}
                            {<p className={`text-center text-${message==='Signup successful!'?'green':'red'}-500`}>{message}</p>}
                            <form className="space-y-2 md:space-y-4" onSubmit={handlesubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input onChange={handlechange} value={signupinfo.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
                                </div>
                                <div>
                                    <label htmlFor="party" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Party</label>
                                    <input onChange={handlechange} value={signupinfo.party} type="text" name="party" id="party" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BJP/Congess etc" />
                                </div>
                                <div>
                                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                    <input onChange={handlechange} value={signupinfo.age} type="text" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="min 20" />
                                </div>

                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Candidatesignup;
