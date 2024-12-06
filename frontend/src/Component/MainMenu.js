import React from 'react';
import { Link } from 'react-router-dom';

function MainMenu() {
    return (
        <header className="bg-gray-50 dark:bg-gray-900   shadow-md w-screen h-screen">
            <h1 className='text-white text-3xl     text-center pt-48 pb-16 '>Your Voting App</h1>
               <div className="flex items-center justify-center space-x-4 ">
           
                <Link to="/signup">
                    <button className="bg-blue-600 text-white font-medium rounded-lg px-5 py-2 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
                        Signup
                    </button>
                </Link>
                <Link to="/login">
                    <button className="bg-green-600 text-white font-medium rounded-lg px-5 py-2 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700">
                        Login
                    </button>
                </Link>
                <Link to="/candidatesignup">
                    <button className="bg-yellow-600 text-white font-medium rounded-lg px-5 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                        Candidate Signup
                    </button>
                </Link>
                <Link to="/vote">
                    <button className="bg-purple-600 text-white font-medium rounded-lg px-5 py-2 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-700">
                        Vote
                    </button>
                </Link>
                <Link to="/votecount">
                    <button className="bg-red-600 text-white font-medium rounded-lg px-5 py-2 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
                        Vote Count
                    </button>
                </Link>
                <Link to="/editvote">
                    <button className="bg-red-600 text-white font-medium rounded-lg px-5 py-2 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
                         Edit Vote
                    </button>
                </Link>
                <Link to="/editcandidate">
                    <button className="bg-red-600 text-white font-medium rounded-lg px-5 py-2 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
                         EditCandidate
                    </button>
                </Link>
                <Link to="/logincandidate">
                    <button className="bg-red-600 text-white font-medium rounded-lg px-5 py-2 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
                         Candidatelogin
                    </button>
                </Link>
                <Link to="/logout">
                    <button className="bg-red-600 text-white font-medium rounded-lg px-5 py-2 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
                         Logout
                    </button>
                </Link>
                <Link to="/profile">
                    <button className="bg-blue-600 text-white font-medium rounded-lg px-5 py-2 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
                         Profile
                    </button>
                </Link>
              

            </div>
        </header>
    );
}

export default MainMenu;
