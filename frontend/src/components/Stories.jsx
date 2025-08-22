import StoryCard from '@/components/StoryCard'
import React, { useState } from 'react'

const Stories = () => {
    const [isSharing, setIsSharing] = useState(false);
    const [sharingStory, setSharingStory] = useState({
        description: "",
        tag: ""
    })
    const story = [
        {
            name: "Pankaj Singh",
            imageUrl: "",
            rating: 5,
            comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eligendi molestias nisi fugit nostrum modi dolor, est suscipit eum at ratione illo rerum perferendis possimus, natus voluptatum dignissimos maiores, repudiandae non voluptas fugiat cumque!",
            tag: "First time donor",
            timeStamp: "23 Dec 2024"
        },
        {
            name: "Pankaj Singh",
            imageUrl: "",
            rating: 5,
            comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eligendi molestias nisi fugit nostrum modi dolor, est suscipit eum at ratione illo rerum perferendis possimus, natus voluptatum dignissimos maiores, repudiandae non voluptas fugiat cumque!",
            tag: "First time donor",
            timeStamp: "23 Dec 2024"
        },
        {
            name: "Pankaj Singh",
            imageUrl: "",
            rating: 5,
            comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eligendi molestias nisi fugit nostrum modi dolor, est suscipit eum at ratione illo rerum perferendis possimus, natus voluptatum dignissimos maiores, repudiandae non voluptas fugiat cumque!",
            tag: "First time donor",
            timeStamp: "23 Dec 2024"
        },
    ]

    const tags = ["Regular Donor", "First Time Donor", "Blood Recipient", "Recipient to Donor", "Volunteer"];
    return (
        <div id='stories' className='flex flex-col gap-12 justify-center items-center bg-linear-to-br from-pink-50 to-gray-200 my-14 lg:py-16 md:py-12 py-10 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Donor Stories</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1'>Hear from our amazing donors and recipients about their life-changing experiences with blood donation.</h5>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
                {story.map((story, i) => <StoryCard key={i} story={story} />)}
            </div>
            <button className='bg-blue-100 hover:cursor-pointer hover:text-blue-500 hover:bg-blue-200 text-base font-normal py-1 w-full px-8 sm:w-fit border border-gray-200 text-black rounded-full '>
                <h5>See More</h5>
            </button>
            <div className='flex flex-col gap-4 items-center p-6 bg-white rounded-2xl'>
                <h4 className='text-2xl font-semibold'>Share Your Story</h4>
                <p className='text-lg text-[#696969] max-w-xl'>Have you donated blood or received a transfusion? We'd love to hear your experience and share it with others to inspire more donations.</p>
                <button className='text-white hover:cursor-pointer flex gap-2 items-center justify-center px-4 w-fit h-8 bg-red-600 hover:bg-red-700 rounded-full '
                    onClick={() => {
                        setIsSharing(!isSharing)
                    }}
                >
                    {!isSharing ? <i className="ri-add-line"></i> : <i className="ri-close-line"></i>} {!isSharing ? <h5>Share Your Story</h5> : <h5>Cancel</h5>}
                </button>
                {isSharing && <SharingStory setSharingStory={setSharingStory} sharingStory={sharingStory} tags={tags} />}
            </div>
        </div>
    )
}

const SharingStory = ({ tags, setSharingStory, sharingStory }) => {

    return (
        <div className='p-3 flex flex-col items-center  '>
            <textarea placeholder="Write your story here..."
                className='border-2 border-red-800 w-full h-30 p-2  bg-white resize-none' />
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 my-3'>
                {tags.map((tag, i) => <div
                    key={i}
                    className={`p-1 text-sm font-medium border text-center border-black rounded-xl ${sharingStory.tag === tag ? "bg-red-600 text-white" : "bg-white text-black"}`}
                    onClick={() => { setSharingStory((...prev) => ({ ...prev, tag: tag })) }}
                >
                    {tag}
                </div>)}
            </div>
            <button className='text-white hover:cursor-pointer px-2 w-full max-w-[200px] h-8 bg-gradient-to-br from-red-500 to-red-700 dark:from-red-700 dark:to-red-900 rounded-lg '>
                Submit
            </button>
        </div>
    )
}

export default Stories