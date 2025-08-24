import StoryCard from '@/components/StoryCard'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StoryPage = () => {
    const [story, setStory] = useState([]);
    useEffect(() => {
      const fetchStories = async()=>{
        const storyRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/bloodServices/stories`);
        if(storyRes.status === 200){
            setStory(storyRes.data.stories);
        }
      }
      fetchStories();
    
    }, [])

    const tags = ["Regular Donor", "First Time Donor", "Blood Recipient", "Recipient to Donor", "Volunteer"];
    return (
        <div id='stories' className='flex flex-col gap-12 justify-center items-center bg-linear-to-br from-pink-50 to-gray-200 lg:py-25 md:py-20 py-15 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Donor Stories</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1'>Hear from our amazing donors and recipients about their life-changing experiences with blood donation.</h5>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
                {story.map((story, i) => <StoryCard key={i} story={story} />)}
            </div>
            
        </div>
    )
}

export default StoryPage;