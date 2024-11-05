import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Removevote() {
    const [signupinfo, setsignupinfo] = useState({
        name: '',
        adhaarno: '',
        party:''
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        setsignupinfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, adhaarno ,party} = signupinfo;

        if (!name || !adhaarno||!party) {
            toast.error("Both fields are required.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:7000/candidate/editvote', { name, adhaarno ,party });
            if (response.status === 200) {
                toast.success('Vote removed successfully');
                setsignupinfo({
                    name: '',
                    adhaarno: '',
                    party:''
                });
                return;
            } else {
                toast.error('Failed to remove vote.');
                return;
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                
                toast.error(error.response.data);
            } else {
                toast.error('Internal server error');
            }
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen w-screen flex items-center justify-center">
            <ToastContainer />
            <div className="w-1/3 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
                   Edit your Vote
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name" // Added name attribute
                            value={signupinfo.name}
                            onChange={handlechange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="adhaarno" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Adhaar No
                        </label>
                        <input
                            type="text"
                            id="adhaarno"
                            name="adhaarno" // Added name attribute
                            value={signupinfo.adhaarno}
                            onChange={handlechange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your Aadhaar no"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="partyname" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Party Name
                        </label>
                        <input
                            type="text"
                            id="party"
                            name="party" // Added name attribute
                            value={signupinfo.party}
                            onChange={handlechange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Party name"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Removevote;
