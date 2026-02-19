import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import SkeletonCard from './../components/custom/SkeletonCard';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  
  if (isLoaded) {
    
    if (!isSignedIn) {
      navigate('/auth/sign-in');
    } 
    
    else if (user?.primaryEmailAddress?.emailAddress) {
      GetResumesList();
    }
  }
}, [user, isLoaded, isSignedIn]); 
  const GetResumesList = () => {
    setLoading(true); 
    
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(resp => {
        console.log("Resumes fetched:", resp.data.data);
        setResumeList(resp.data.data);
        setLoading(false); 
    })
    .catch(error => {
        console.error("Error fetching resumes:", error);
        setLoading(false); 
    });
}

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating your Resume</p>
      
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        {/* Create Button */}
        <AddResume />

        {/* Resume List */}
        {loading ? 
  
        [1, 2, 3, 4].map((item, index) => (
        <SkeletonCard key={index} />
        )) 
        : 
  
        resumeList.map((resume, index) => (
        <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList}/>
        ))
        }
      </div>
    </div>
  )
}

export default Dashboard