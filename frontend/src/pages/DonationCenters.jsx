import React from 'react'

const DonationCenters = () => {
    const centers = [
        {
            name: "Downtown Medical Center",
            distance: "3.4",
            address: "123 Main Street, Downtown City, ST 12345",
            mobile: "444-505-989",
            timings: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM"
        },
        {
            name: "Downtown Medical Center",
            distance: "3.4",
            address: "123 Main Street, Downtown City, ST 12345",
            mobile: "444-505-989",
            timings: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM"
        },
        {
            name: "Downtown Medical Center",
            distance: "3.4",
            address: "123 Main Street, Downtown City, ST 12345",
            mobile: "444-505-989",
            timings: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM"
        }
    ]
    return (
        <div id='centers' className='flex flex-col gap-12 justify-center items-center scroll-m-15 bg-gray-50 my-14 lg:py-16 md:py-12 py-10 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Donation Centers</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1'>Find a convenient location near you to make your life-saving donation.</h5>
            <div className='max-w-2xl w-full flex flex-col sm:flex-row gap-2 items-center p-7 bg-white rounded-3xl'>
                <input type="text" placeholder='Enter your zip code or city' className='text-base outline-blue-400 bg-gray-50 outline-0 focus:outline-2 w-full rounded-full py-1 px-2' />
                <button className='bg-red-600 hover:bg-red-700 text-lg text-white font-medium w-full max-w-[180px] py-1 rounded-full'><i className="ri-search-line"></i> Find Centers</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {centers.map((center, i) => <div key={i} className='flex flex-col gap-3 bg-white p-7 w-full rounded-2xl'>
                    <h4 className='text-xl font-semibold'>{center.name}</h4>
                    <h6 className='text-base text-[#696969]'><i className="ri-map-pin-line mr-2">{center.distance} kms away</i></h6>
                    <h6 className='text-base text-[#696969]'><i className="ri-map-pin-line mr-2"></i>{center.address}</h6>
                    <h6 className='text-base text-[#696969]'><i className="ri-phone-line mr-2">{center.mobile}</i></h6>
                    <h6 className='text-base text-[#696969]'><i className="ri-time-line mr-2"></i>{center.timings}</h6>
                    <div className='flex flex-row gap-3 items-center '>
                        <button className='text-white text-lg font-medium hover:cursor-pointer py-1 px-2 w-full max-w-sm bg-red-600 hover:bg-red-700 transition-all duration-200 rounded-full '>
                            Book Now
                        </button>
                        <button className=' hover:cursor-pointer hover:text-blue-500 hover:bg-blue-50 text-lg font-medium py-1 w-full px-8 max-w-sm border border-gray-200 text-black rounded-full '>
                            Directions
                        </button>
                    </div>
                </div>)}
            </div>

        </div>
    )
}

export default DonationCenters