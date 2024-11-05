import express from 'express';
import Candidates from '../Models/candidates.js';
import {jwtAuthMiddleware,generateToken} from '../jwt.js';
import User from '../Models/user.js';

const router = express.Router();

router.get('/testing',async(req,res)=>{
     res.status(200).json("successfully executed")
})

const checkadminrole=async(userid)=>{
    try {
      const user=await User.findById(userid);
      return (user.role==='admin');
    } catch (error) {
       return false;
    }
}

router.post('/candidatesignup', jwtAuthMiddleware, async (req, res) => {
  try {
    // req.user contains the user data from the JWT token
    // console.log(!await checkadminrole(req.user.id));
    
    if (await checkadminrole(req.user.id)) {
      return res.status(404).send({ message: "user is not an admin" });
    }

    const data = req.body; // Candidate data
    const response = new Candidates(data);
    const savedResponse = await response.save();
    console.log("data saved successfully in candidate ");
    
    res.status(200).json({ response: savedResponse });
  } catch (error) {
    console.error("Error saving data", error);
    res.status(500).send({ message: "internal server error" });
  }
});



 
router.put('/:candidateid',jwtAuthMiddleware, async (req, res) => {
  try {
    // Accessing the id from jwt token (as user)
    if(!checkadminrole(req.user.id)) {
      return res.status(404).send({message:"user was not admin "})
    }
    const personid = req.params.candidateid;
    const updatedpersondata = await Candidates.findById(personid);

    if (!updatedpersondata) {
      return res.status(404).json({ message: "Person not found" });
    }
    //  res.status(200).send(req.body);
    const response = await Candidates.findByIdAndUpdate(personid,req.body, {
      new: true,
      runValidators: true,
    });

    if(!response){
      return res.status(403).json({ message: "Person not found" });
    }

    console.log("Data updated");
     res.status(200).json(response);
  } 
  catch (error) {
    console.error("Error updating data", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});



router.delete('/:candidateid',jwtAuthMiddleware, async (req, res) => {
  try {
    const personid = req.params.candidateid; 
    const response = await Candidates.findById(personid);
    
    if (!response) {
      return res.status(403).json({ message: "Person not found" });
    }

    await response.deleteOne();
    
    console.log("Data deleted successfully");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting data", error); 
    res.status(500).json({ message: "Internal server error", error });
  }
});


router.post('/vote/:party', jwtAuthMiddleware, async (req, res) => {
  const candidateparty = req.params.party;
  const userid = req.user.id;

  try {
    // Find candidate by party
    const candidate = await Candidates.findOne({ party: candidateparty });
    // console.log(candidate);
    
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Find user by ID
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(user);
    

    // Check if user has already voted
    if (user.isvoted) {
      return res.status(401).json({ message: "User has already voted" });
    }

    // Check if the user is an admin (admins can't vote)
    if (user.role === 'admin') {
      return res.status(403).json({ message: "Admins are not allowed to vote" });
    }

    // Record the vote
    candidate.votes.push({ user: userid }); // Push user vote into the array
    candidate.votecount += 1; // Increment vote count
    await candidate.save();

    // Mark user as voted
    user.isvoted = true;
    await user.save();

    return res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error processing vote", error); // Log error for debugging
    res.status(500).json({ message: "Internal server error", error });
  }
});


router.post('/editvote', async (req, res) => {
  try {
      const { name, adhaarno, party } = req.body; // Destructure request body

      // Check required fields
      if (!name || !adhaarno || !party) {
          return res.status(400).send('Name, Adhaar number, and party are required.');
      }

      // Find the user by Adhaar number
      const user = await User.findOne({ adhaarno: adhaarno });
      if (!user) {
          return res.status(400).send('User not found');
      }
      if(user.isvoted==false){
        return   res.status(400).send('User not voted yet');
      }

      // Find the candidate by party and name
      const candidate = await Candidates.findOne({ party: party});
      if (!candidate) {
          return res.status(400).send('Candidate not found');
      }

      // Check if the user has voted for this candidate
      // console.log(candidate.votes);
      
      const voteIndex = candidate.votes.findIndex(vote => vote.user.toString() === user.id.toString());
      
      if (voteIndex <0) {
          return res.status(400).send('User has not voted for this party');
      }

      // // Remove the user's vote
       candidate.votes.splice(voteIndex, 1);

      // Decrement the vote count
       candidate.votecount -= 1;
     

      // Save the updated candidate
      await candidate.save();

      // Update user voting status
      if (user.isvoted) {
          user.isvoted = false;
          await user.save();
      }

      return res.status(200).send('Vote deleted successfully');

  } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
  }
});



router.get('/vote/count', async (req, res) => {
  try {
   
    const candidates = await Candidates.find().sort({votecount:'desc'});
    const voterecord = candidates.map((data) => {
      return {
        party: data.party,
        count: data.votecount
      };
    });

    return res.status(200).json(voterecord);
  } catch (error) {
    console.error("Error fetching vote count", error); 
    res.status(500).json({ message: "Internal server error", error });
  }
});



export default router;    