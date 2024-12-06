import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupSuccessMessage from './SignupSuccessMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Votecandidate from './Votecandidate';
function Signup() {
    const navigate=useNavigate();
    const [signupinfo, setsignupinfo] = useState({
        name: '',
        email: '',
        password: '',
        adhaarno: '',
        age: '',
        mobile: '',
        address: '',
        role:'',
    });
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
        const { name, adhaarno, password, email, age, mobile, address ,role} = signupinfo;
    
        if (!name || !email || !adhaarno || !password || !age || !mobile || !address||!role) {
            toast.error('All field required')
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:7000/user/signup', {
                name, email, password, adhaarno, age, mobile, address,role
            });
            if (response.status === 200) {
                setsuccess(true); // Update to use `setsuccess`
                setsignupinfo({ name: '', email: '', password: '', adhaarno: '', age: '', mobile: '', address: '',role:'' });
                toast.success('User SignUp successfully');
                setTimeout(() => {
                    navigate('/vote')
                }, 3000);
               
            } else {
                toast.error('User not created');
            }
        } catch (error) {
            toast.error(error.response.data)
            // console.error( error);
            
        }
    };
    
    return (
        <>
        <ToastContainer />
        
            <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 w-[100%] h-[100%] pb-48">
                <Link to="Signup" className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    SignUp   
                </Link>
                <div className="w-[35%] bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="space-y-4 md:space-y-6 sm:p-8 h-[30%]">
                        <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-2 md:space-y-4" onSubmit={handlesubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input onChange={handlechange} value={signupinfo.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={handlechange} value={signupinfo.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="adhaarno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adhaar No</label>
                                <input onChange={handlechange}  value={signupinfo.adhaarno} type="text" name="adhaarno" id="adhaarno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="47xx 55xx 66xx" />
                            </div>
                            <div>
                                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                <input onChange={handlechange} value={signupinfo.age} type="text" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="min 18" />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                                <input onChange={handlechange} value={signupinfo.mobile} type="text" name="mobile" id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9834xxxxxx" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input onChange={handlechange} value={signupinfo.address} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mundka etc." />
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                <input onChange={handlechange} value={signupinfo.role} type="text" name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="admin/voter" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={handlechange} value={signupinfo.password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input onChange={handlechange}  type="password" name="confirm-Password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                              <br />
                              <br />

                              <p onClick={()=>navigate('/login')
                              } className='text-white pl-[45%] cursor-pointer'>Login</p>
                             
                        </form>
                    </div>
                </div>
            </div>
        </section>
            

           
        </>
    );
}

export default Signup;
