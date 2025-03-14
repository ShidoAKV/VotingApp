import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Appcontext } from '../Context/Context';

const CandidateProfile = () => {
  // User login state
  const {backend}=useContext(Appcontext);;

  const [voterData, setVoterData] = useState(null);
  const [voterSuccess, setVoterSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [voterLogin, setVoterLogin] = useState({
    adhaarNo: '',
    password: '',
  });

  // Candidate login state
  const [candidateData, setCandidateData] = useState(null);
  const [candidateSuccess, setCandidateSuccess] = useState(false);
  const [candidateLogin, setCandidateLogin] = useState({
    partyName: '',
    password: '',
  });


  const [isCandidate, setIsCandidate] = useState(false);


  const handleVoterLoginChange = (e) => {
    setVoterLogin({ ...voterLogin, [e.target.name]: e.target.value });
  };


  const handleCandidateLoginChange = (e) => {
    setCandidateLogin({ ...candidateLogin, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let imagePreviewUrl;
    if (image) {
      imagePreviewUrl = URL.createObjectURL(image);
    }
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [image]);
  // console.log(image);
//  console.log(voterData.userdata._id);
 
  const handleimagechange = async () => {
    try {
      if (image) {
        const formdata = new FormData();
       if(voterData.userdata._id) formdata.append('id',voterData.userdata._id);
       if(image) formdata.append('image', image); 
      
        const { data } = await axios.post(backend+'/user/upload', formdata,
          {
            headers: {
              'Content-Type': 'multipart/form-data', 
            },
    
          }
        );
        if (data.success) {
          toast.success('Image uploaded successfully');
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error('upload the correct image');
      }
    } catch (error) {
      toast.error('Image upload failed', error);
    }
  };








  const handleVoterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { adhaarNo, password } = voterLogin;

      if (!/^[0-9]{12}$/.test(adhaarNo)) {
        toast.error('Enter a valid 12-digit Aadhaar Number');
        return;
      }
      const {data} = await axios.get(backend+'/user/profile', { params: { adhaarNo, password } });
      if(data.success){
        setVoterSuccess(true);
        setVoterData(data);
        setVoterLogin({adhaarNo:'',password: '' });
      }else{
        toast.error( 'Fetching failed');
      }
    } catch (error) {
      toast.error(error.response?.data || 'Login failed');
    }
  };
 
  // console.log(voterData);
  

  const handleCandidateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { partyName, password } = candidateLogin;
      const response = await axios.get(backend+'/candidate/candidateprofile', { params: { partyName, password } });
      setCandidateSuccess(true);
      setCandidateData(response.data);

      setCandidateLogin({ partyName: '', password: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };


  
  return (
    <div className='bg-gray-900 h-screen w-screen'>
      <div className="flex justify-center pt-5">
        <button className={`px-4 py-2 rounded-lg mr-2 ${!isCandidate ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setIsCandidate(false)}>User Profile</button>
        <button className={`px-4 py-2 rounded-lg ${isCandidate ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setIsCandidate(true)}>Candidate Profile</button>
      </div>
      <ToastContainer />

      {isCandidate ? (
        candidateSuccess ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-gray-900 border rounded-lg shadow-xl p-6 w-52 h-60 flex flex-col gap-2 border-blue-600">
              <h1 className="text-xl font-bold text-blue-300">{candidateData.name}</h1>
              <p className="text-gray-400">Party: {candidateData.party}</p>
              <p className="text-gray-400">Age: {candidateData.age}</p>
              <p className="text-gray-400">Votes: {candidateData.votecount}</p>
              <button className="px-5 py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg" onClick={() => setCandidateSuccess(false)}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <form className="bg-white p-6 rounded-lg shadow-md space-y-6" onSubmit={handleCandidateSubmit}>
              <h1 className="text-2xl font-bold">Candidate Login</h1>
              <input type="text" name="partyName" value={candidateLogin.partyName} onChange={handleCandidateLoginChange} placeholder="Party Name" className="border p-2 w-full" required />
              <input type="password" name="password" value={candidateLogin.password} onChange={handleCandidateLoginChange} placeholder="Password" className="border p-2 w-full" required />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full">Login</button>
            </form>
          </div>
        )
      ) : voterSuccess ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gray-900 border rounded-lg shadow-xl p-6 w-96 border-blue-600">
            <div className='flex items-center gap-5'>
              <img className="h-28 w-28 border-2 border-green-400" src={(voterData.userdata.image||image )? (voterData.userdata.image||URL.createObjectURL(image)) : null} alt="Profile Pic" />
              <div>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button onClick={handleimagechange} className='bg-blue-500 w-10 rounded-sm mt-4 '>edit</button>
              </div>
            </div>


            <h1 className="text-2xl font-bold text-blue-300">{voterData.userdata.name}</h1>
            <p className="text-gray-200">Email: {voterData.userdata.email}</p>
            <p className="text-gray-200">Mobile: {voterData.userdata.mobile}</p>
            <p className="text-gray-200">Address: {voterData.userdata.address}</p>
            <p className="text-gray-200">Aadhaar No: {voterData.userdata.adhaarno}</p>
            <button className="px-5 py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg" onClick={() => setVoterSuccess(false)}>Logout</button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <form className="bg-white p-6 rounded-lg shadow-md space-y-6" onSubmit={handleVoterSubmit}>
            <h1 className="text-2xl font-bold">User Login</h1>
            <input type="text" name="adhaarNo" value={voterLogin.adhaarNo} onChange={handleVoterLoginChange} placeholder="Aadhaar No" className="border p-2 w-full" required />
            <input type="password" name="password" value={voterLogin.password} onChange={handleVoterLoginChange} placeholder="Password" className="border p-2 w-full" required />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CandidateProfile;
