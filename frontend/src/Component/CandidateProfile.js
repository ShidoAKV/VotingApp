import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const CandidateProfile = () => {
  const navigate = useNavigate();

  // User-specific state
  const [voterdata, setVoterdata] = useState(null);
  const [voterSuccess, setVoterSuccess] = useState(false);
  const [picture, setpicture] = useState(false);
  const [voterLogin, setVoterLogin] = useState({
    adhaarNo: '',
    password: '',
  });

  // Candidate-specific state
  const [candidateData, setCandidateData] = useState(null);
  const [candidateSuccess, setCandidateSuccess] = useState(false);
  const [candidateLogin, setCandidateLogin] = useState({
    partyName: '',
    password: '',
  });

  // Toggle between user and candidate modes
  const [isCandidate, setIsCandidate] = useState(false);

  // Handle voter login input changes
  const handleVoterLoginChange = (e) => {
    const { name, value } = e.target;
    setVoterLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUserPicture=()=>{
    setpicture(true)
  }
  // Handle candidate login input changes
  const handleCandidateLoginChange = (e) => {
    const { name, value } = e.target;
    setCandidateLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle voter login form submission
  const handleVoterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { adhaarNo, password } = voterLogin;
      if(adhaarNo.length>12) {
        toast.error('Enter valid AdhaarNo')
        return;
      }
      const response = await axios.get('http://localhost:7000/user/profile', {
        params: { adhaarNo, password },
      });

      //  console.log(response);
       
      if (response.status === 200) {
        setVoterSuccess(true);
        setVoterdata(response.data);
        setVoterLogin({ adhaarNo: '', password: '' });
      }

      
    } catch (error) {
        // console.log(error.response.data);
      // console.error('Login error:', error.response.message);
        toast.error(error.response.data);
    }
  };

  // Handle candidate login form submission
  const handleCandidateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { partyName, password } = candidateLogin;
      const response = await axios.get('http://localhost:7000/candidate/candidateprofile', {
        params: { partyName, password },
      });

      if (response.status === 200) {
        setCandidateSuccess(true);
        setCandidateData(response.data);
        setCandidateLogin({ partyName: '', password: '' });
      } 
      else if(response.status===401) {
        toast.error(response.message)
      }
    } catch (error) {
      // console.error(error.response.data.message);
      toast.error(error.response.data.message|| 'Something went wrong. Please try again.');
    }
  };

  const handleCandidatePicture=async(e)=>{

  }

  return (
    <>
      <div className='bg-gray-900 h-screen w-screen'>
      <div className="flex justify-center pt-5 bg-gray-900">
        <button
          className={`px-4 py-2 rounded-lg mr-2 ${
            !isCandidate ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setIsCandidate(false)}
        >
          User Profile
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            isCandidate ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setIsCandidate(true)}
        >
          Candidate Profile
        </button>
      </div>
       <ToastContainer />
      {isCandidate ? (
        candidateSuccess ? (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900">
            <div className=" bg-gray-900 border  rounded-lg shadow-xl p-6 w-52 h-60 flex flex-col gap-2 border-blue-500 border-x-blue-400  border-blue-600">
              <h1 className="text-xl font-bold text-blue-300 pl-5">{candidateData.name}</h1>
              <p className="text-gray-400">Party: {candidateData.party}</p>
              <p className="text-gray-400">Age: {candidateData.age}</p>
              <p className="text-gray-400">Votes: {candidateData.votecount}</p>
              <button
                className="px-5 py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg"
                onClick={() => setCandidateSuccess(false)}
              >
                Logout
              </button>
            </div>
        
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen ">
            <form
              className="space-y-6 bg-white p-6 rounded-lg shadow-md"
              onSubmit={handleCandidateSubmit}
            >
              <h1 className="text-2xl font-bold">Candidate Login</h1>
              <div>
                <label className="block mb-2">Party Name</label>
                <input
                  type="text"
                  name="partyName"
                  value={candidateLogin.partyName}
                  onChange={handleCandidateLoginChange}
                  className="border border-gray-300 p-2 rounded-lg w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={candidateLogin.password}
                  onChange={handleCandidateLoginChange}
                  className="border border-gray-300 p-2 rounded-lg w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
              >
                Login
              </button>
            </form>
          </div>
        )
      ) : voterSuccess ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900">
          <div className="max-w-sm bg-gray-900 border  rounded-lg shadow-xl p-6 w-96  border-x-blue-400  border-blue-600">
          <h1 className="text-2xl pl-24 font-bold text-blue-300 ">{voterdata.name}</h1>
              <p className="text-gray-200"><strong className='text-gray-200 pl-5 font-bold mr-2'>Email</strong>: {voterdata.email}</p>
              <p className="text-gray-200"><strong className='text-gray-200 pl-5 font-bold mr-2'>Mobile</strong>: {voterdata.mobile}</p>
              <p className="text-gray-200 flex"><strong className='text-gray-200 pl-5 font-bold mr-2'>Address</strong>:<p>{voterdata.address}</p></p>
              <p className="text-gray-200"><strong className='text-gray-200 pl-5 font-bold mr-2'>Adhaarno</strong>: {voterdata.adhaarno}</p>
              <p className="text-gray-200"><strong className='text-gray-200 pl-5 font-bold mr-2'>role</strong>: {voterdata.role}</p>
              <p className="text-gray-200"><strong className='text-gray-200 pl-5 font-bold mr-2'>Voted</strong>: {voterdata.isvoted ? 'YES' : 'NO'}</p>
            <button
              className="px-5 py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg"
              onClick={() => setVoterSuccess(false)}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <form
            className="space-y-6 bg-white p-6 rounded-lg shadow-md"
            onSubmit={handleVoterSubmit}
          >
            <h1 className="text-2xl font-bold">User Login</h1>
             <div className='flex gap-4'>
              <label className={`text-${(picture===true)?`green`:`blue`}-600`}><strong>Profile Pic</strong></label>
              <input 
              type="file" 
              onChange={handleUserPicture}
              />
             </div>
            <div>
              <label className="block mb-2">Adhaar No </label>
              <input
                type="text"
                name="adhaarNo"
                value={voterLogin.adhaarNo}
                onChange={handleVoterLoginChange}
                className="border border-gray-300 p-2 rounded-lg w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={voterLogin.password}
                onChange={handleVoterLoginChange}
                className="border border-gray-300 p-2 rounded-lg w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
            >
              Login
            </button>
          </form>
        </div>
      )}
      </div>
    </>
  );
};

export default CandidateProfile;
