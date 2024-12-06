import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Votecount() {
    const [partycount, setpartycount] = useState([]);
    const [success, setsuccess] = useState(false);

    const handlechange = async () => {
        try {
            const response = await axios.get('http://localhost:7000/candidate/vote/count');
            if (!response || !response.data) {
                console.log('Internal server error');
                return;
            }
         console.log(response.data);

            setsuccess(true);
            setpartycount(response.data); // Set partycount to response.data
        } catch (error) {
            console.error("Error fetching party count:", error);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen w-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 w-full h-full pb-48">
                <Link to="Signup" className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    VoteCount
                </Link>
                <div className="w-1/3 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="space-y-4 md:space-y-6 sm:p-8 h-1/3">
                        <h1 className="  text-center  text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Vote Count of Parties
                        </h1>
                        {success && partycount.length > 0 ? (
                            partycount.map((item, index) => (
                                <p className= 'text-white  shadow-white shadow-md  font-semibold bg-blue-700 rounded-md text-center'   key={index}>{item.party} : {item.count}</p> // Displaying party name and vote count
                            ))
                        ) : (
                            <p className='text-white font-semibold text-center'   >Please press button to view votecount</p>
                        )}
                        <button
                            onClick={handlechange}
                            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            GET Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Votecount;
