import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupSuccessMessage from './SignupSuccessMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';

function Editcandidate() {
    const navigate = useNavigate();
    const [signupinfo, setsignupinfo] = useState({
        name: '',
        party: '',
        age: '',
        previousparty:''
    });
    const [success, setsuccess] = useState(false);
    const [loginSuccess, setloginSuccess] = useState(false);
    const [token, settoken] = useState('');

    const [Adminlogin, setAdminlogin] = useState({
        adhaarno: '',
        password: ''
    });

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setsignupinfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdminLoginChange = (e) => {
        const { name, value } = e.target;
        setAdminlogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, party, age ,previousparty} = signupinfo;

        if (!name || !party || !age||!previousparty) {
            toast.error("All fields are required.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:7001/candidate/editcandidate`,
                { name, party, age ,previousparty},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            ); 

            if (response.status === 200) {
                setsuccess(true);
                setsignupinfo({ name: '', party: '', age: '' ,previousparty:''});
                toast.success('Candidate details updated successfully!');
            } else {
                toast.error('Failed to update candidate details.');
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error(error.response.data.message);
        }
    };

    const handlesubmit2 = async (e) => {
        e.preventDefault();
        const { adhaarno, password } = Adminlogin;

        try {
            const response = await axios.post('http://localhost:7001/user/adminlogin', { adhaarno, password });

            if (response.status === 200) {
                setloginSuccess(true);
                console.log(response);
                settoken(response.data.token);
                setAdminlogin({ adhaarno: '', password: '' });
                toast.success('Login successful!');
            } else {
                toast.error('Login unsuccessful');
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <>
            <ToastContainer />
            {loginSuccess ? (
                <section className="bg-gray-50 dark:bg-gray-900 w-screen h-screen">
                    <div className="flex flex-col items-center justify-center px-6 py-8 w-[100%] h-[100%] pb-48">
                        <Link to="/editcandidate" className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Edit Candidate  
                        </Link>
                        <div className="w-[35%] bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                            <div className="space-y-4 md:space-y-6 sm:p-8 h-[30%]">
                                <h1 className="text-center text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Edit Candidate
                                </h1>
                                <form className="space-y-2 md:space-y-4" onSubmit={handlesubmit}>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SetUsername</label>
                                        <input onChange={handleSignupChange} value={signupinfo.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
                                    </div>
                                    <div>
                                        <label htmlFor="previousparty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Previous Party</label>
                                        <input onChange={handleSignupChange} value={signupinfo.previousparty} type="text" name="previousparty" id="previousparty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BJP/Congress etc" />
                                    </div>
                                    <div>
                                        <label htmlFor="party" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SetParty</label>
                                        <input onChange={handleSignupChange} value={signupinfo.party} type="text" name="party" id="party" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BJP/Congress etc" />
                                    </div>
                                    <div>
                                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SetAge</label>
                                        <input onChange={handleSignupChange} value={signupinfo.age} type="text" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="min 20" />
                                    </div>

                                    <button type="submit" className="w-full bg-red-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="bg-gray-50 dark:bg-gray-900 w-screen h-screen">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <Link to="Login" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Admin Login
                        </Link>
                        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handlesubmit2}>
                                    <div>
                                        <label htmlFor="adhaarno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Aadhaar</label>
                                        <input
                                            onChange={handleAdminLoginChange}
                                            value={Adminlogin.adhaarno}
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
                                            onChange={handleAdminLoginChange}
                                            value={Adminlogin.password}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default Editcandidate;
