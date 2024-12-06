import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();

  const [voterdata, setVoterdata] = useState(null); // Default to null, since it's an object
  const [success, setSuccess] = useState(false);
  const [voterlogin, setvoterlogin] = useState({
    adhaarNo: '',
    password: '',
  });
  const [token, setToken] = useState('');

  const handlevoterloginChange = (e) => {
    const { name, value } = e.target;
    setvoterlogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { adhaarNo, password } = voterlogin;
      const response = await axios.get('http://localhost:7000/user/profile', {
        params: { adhaarNo, password },
      });

      if (response.status === 200) {
        setSuccess(true);
        setToken(response.data.token);
        setVoterdata(response.data); // Set the object directly here
        setvoterlogin({ adhaarNo: '', password: '' });
        
      } else {
        toast.error('Login unsuccessful');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer />
      {success ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
          <div className="max-w-sm bg-gray-900 border border-gray-300 rounded-lg shadow-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl shadow-gray-600">
            <div className="flex justify-center mb-4">
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
               src="https://via.placeholder.com/150"
                alt="Profile"
              />
            </div>
            <div className="text-white flex flex-col ml-16  font-semibold space-y-2">
              <h1 className="text-2xl pl-20 font-bold text-blue-500">{voterdata.name}</h1>
              <p className="text-gray-200"><strong className='text-gray-500 font-bold mr-2'>Email</strong>: {voterdata.email}</p>
              <p className="text-gray-200"><strong className='text-gray-500 font-bold mr-2'>Mobile</strong>: {voterdata.mobile}</p>
              <p className="text-gray-200"><strong className='text-gray-500 font-bold mr-2'>Address</strong>: {voterdata.address}</p>
              <p className="text-gray-200"><strong className='text-gray-500 font-bold mr-2'>Adhaarno</strong>: {voterdata.adhaarno}</p>
              <p className="text-gray-200"><strong className='text-gray-500 font-bold mr-2'>Mobile</strong>: {voterdata.mobile}</p>
              <p className="text-gray-200"><strong className='text-gray-500 font-bold mr-2'>email</strong>: {voterdata.email}</p>
              <p className="text-gray-200"><strong className='text-gray-500 font-bold mr-2'>role</strong>: {voterdata.role}</p>
              <p className="text-gray-200"><strong className='text-gray-500 font-bold mr-2'>Voted</strong>: {voterdata.isvoted?'YES':'NO'}</p>
            </div>
            {/* Action Buttons */}
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => navigate('/vote')}
                className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Vote
              </button>
              <button
                onClick={() => setSuccess(false)}
                className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900 w-screen h-screen">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="adhaarNo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Aadhaar
                    </label>
                    <input
                      onChange={handlevoterloginChange}
                      value={voterlogin.adhaarNo}
                      type="text"
                      name="adhaarNo"
                      id="adhaarNo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your Aadhaar Number"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      onChange={handlevoterloginChange}
                      value={voterlogin.password}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
