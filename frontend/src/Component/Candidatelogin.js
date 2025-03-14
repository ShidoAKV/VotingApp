import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupSuccessMessage from './SignupSuccessMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Appcontext } from '../Context/Context';

function Candidatelogin() {
    const navigate = useNavigate();
    const {backend}=useContext(Appcontext);

    const [signupinfo, setsignupinfo] = useState({
        name: '',
        party: '',
        age: '',
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

        // Retrieve JWT token from local storage (or another storage method)
        // const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6IjY3MjRiYTA1ZWVkM2JiZjg4Y2VjMGVlYSJ9LCJpYXQiOjE3MzA0NjA2ODgsImV4cCI6MTc0ODQ2MDY4OH0.03QcVYQEPTV0IPPaKyDhl5tl_mVqcQmUMn2psyeV2AM';

        try {
            const response = await axios.post(backend+'/candidate/candidatelogin',
                { name, party, age },
            );

            if (response.status === 200) {
                setsuccess(true);
                setsignupinfo({ name: '', party: '', age: '' });
                setMessage('Candidate login successfully')
                toast.success('Candidate login successfully')
            }else{
                setMessage('Wrong Credential')
                toast.warn('login Unsuccessfull')

            }
        } catch (error) {
            // console.error("Error during signup:", error);
            setMessage(error.response.data);
            toast.error(error.response.data.message)
        }
    };

    return (
        <>
        <ToastContainer/>
            <section className="bg-gray-50 dark:bg-gray-900 w-screen h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 w-[100%] h-[100%] pb-48">
                    <Link to="/candidatelogin" className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Candidate Login
                    </Link>
                    <div className="w-[35%] bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                        <div className="space-y-4 md:space-y-6 sm:p-8 h-[30%]">
                            <h1 className="text-sm  text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                              Login
                            </h1>
                            {success && <SignupSuccessMessage onDismiss={() => setsuccess(false)} />}
                            {<p className={`text-center text-${message==='Candidate login successfully'?'green':'red'}-500`}>{message}</p>}
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

                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Candidatelogin;
