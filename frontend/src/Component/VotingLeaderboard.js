import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Appcontext } from "../Context/Context";

const VotingLeaderboard = () => {
  const { backend } = useContext(Appcontext);

  const [partycount, setPartycount] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend}/candidate/vote/count`);
        if (!response || !response.data) {
          console.log("Internal server error");
          return;
        }
        console.log(response.data);
        setSuccess(true);
        setPartycount(response.data);
      } catch (error) {
        console.error("Error fetching party count:", error);
      }
    };

    fetchData();
  }, [backend]);

  return (
    <div className="flex justify-center items-center pt-4 mt-6">
      <motion.div
        className="rounded-xl border-2 border-neutral-300 bg-neutral-700 w-full max-w-lg h-56 mt-12 p-4 text-white"
        animate={{
          x: ["-8%", "8%", "-8%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <h1 className="text-xl font-bold text-center mb-2">Voting Leaderboard</h1>
        <ul className="text-center space-y-2">
          {success && partycount.length > 0 ? (
            partycount.map((party, index) => (
              <li key={index} className="flex justify-between px-4 py-1 bg-neutral-600 rounded-lg">
                <span className="font-semibold">{party.party}</span>
                <span>{party.count} votes</span>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-400">Loading vote counts...</p>
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default VotingLeaderboard;
