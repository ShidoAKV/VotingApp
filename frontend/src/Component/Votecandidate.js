import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SignupSuccessMessage from './SignupSuccessMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Appcontext } from '../Context/Context';

function Votecandidate() {
    const [signupinfo, setsignupinfo] = useState({
        name: '',
        party: '',
        password: '',
        adhaarno: ''
    });
    const [message, setMessage] = useState('');
    const [success, setsuccess] = useState(false);
    
    const {backend}=useContext(Appcontext);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setsignupinfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, party, password, adhaarno } = signupinfo;

        if (!name || !party || !password || !adhaarno) {
            setMessage("All fields are required.");
            toast.error("All fields are required.");
            return;
        }

        try {
            // Authenticate user to get token
            const userinfo = await axios.post(backend+'/user/login', { name, password, adhaarno });
            if (!userinfo) {
                toast.error(".");
                return;
            }

            const token = userinfo.data.token;
            // toast.success('token retrieved successfully')
            // Send vote request with token
            const response = await axios.post(backend+`/candidate/vote/${party}`,
                { name, party },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            //  console.log(response.status);
             

            if (response.status === 200) {
                setsuccess(true);
                setsignupinfo({ name: '', party: '', password: '', adhaarno: '' }); 
                setMessage('');
                toast.success("Vote submitted successfully!");
            } 
            else {
                setMessage('Failed to vote. Try again.');
                toast.error("Failed to vote. Try again.");
            }
        } catch (error) {
            if (error.response) {   
                toast.error(error.response.data.message);
                setMessage(`${error.response.data.message}`);
            }
            else{
                toast.error('Internel server error')
                setMessage('Internal server error. Please try again later.');
            }
            
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen w-screen">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 w-full h-full pb-48">
                <Link to="Signup" className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Vote
                </Link>
                <div className="w-1/3 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="space-y-4 md:space-y-6 sm:p-8 h-1/3">
                        <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Vote for party
                        </h1>
                        {message && <p className="text-red-500">{message}</p>}
                        <form className="space-y-2 md:space-y-4" onSubmit={handlesubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input onChange={handlechange} value={signupinfo.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
                            </div>
                            <div>
                                <label htmlFor="adhaarno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adhaar No</label>
                                <input onChange={handlechange} value={signupinfo.adhaarno} type="text" name="adhaarno" id="adhaarno" placeholder="4755 62xx xxxx" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="party" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Party</label>
                                <input onChange={handlechange} value={signupinfo.party} type="text" name="party" id="party" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BJP/Congress etc" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={handlechange} value={signupinfo.password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Vote Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Votecandidate;
