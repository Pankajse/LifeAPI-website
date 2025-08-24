import axios from 'axios';
import { Heading3 } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const DonationCenters = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState("");
    const [maxDistance, setMaxDistance] = useState("");
    const [centers, setCenters] = useState([{
        orgId : "",
        name: "",
        distance: null,
        address: "",
        mobile: "",
        timings: ""
    }]);

    const onClickFindCenterHandler = async () => {
        const centersResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/bloodServices/allOrgs`, {
            location: location,
            maxDistance: maxDistance
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const centersData = centersResponse.data?.orgs.map((x) => ({
            name: x.orgName,
            distance: x.distance,
            address: x.location.address,
            mobile: x.contactNumber,
            timings: x.timings
        }));
        setCenters(centersData);
    }

    useEffect(() => {
        const getCenters = async () => {
            const centersResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/bloodServices/allOrgs`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const centersData = centersResponse.data?.orgs.map((x) => ({
                orgId : x._id,
                name: x.orgName,
                distance: null,
                address: x.location.address,
                mobile: x.contactNumber,
                timings: x.timings
            }));
            setCenters(centersData.slice(0, 3));
        };

        getCenters();
    }, []);

    if (!centers) {
        return <div>Loading...</div>
    }

    return (
        <div id='centers' className='flex flex-col gap-12 justify-center items-center scroll-m-15 bg-gray-50 my-14 lg:py-16 md:py-12 py-10 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Donation Centers</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1'>Find a convenient location near you to make your life-saving donation.</h5>
            <div className='max-w-3xl w-full flex flex-col sm:flex-row gap-2 items-center p-7 bg-white rounded-3xl'>
                <input type="text" value={location}
                    placeholder='Enter your zip code or city, country'
                    className='text-base outline-blue-400 bg-gray-50 border outline-0 focus:outline-2 w-full rounded-full py-1 px-2'
                    onChange={(e) => {
                        setLocation(e.target.value)
                    }} />
                <input type="number" value={maxDistance}
                    placeholder='Distance(Kms)'
                    className='text-base outline-blue-400 bg-gray-50 outline-0 focus:outline-2 sm:w-35 w-full border rounded-full py-1 px-2 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                    onChange={(e) => {
                        setMaxDistance(e.target.value);
                    }}
                />
                <button
                    onClick={onClickFindCenterHandler}
                    className='bg-red-600 hover:bg-red-700 text-lg text-white font-medium w-full max-w-[180px] py-1 rounded-full'>
                    <i className="ri-search-line"></i>
                    Find Centers
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {centers.map((center, i) => <div key={i} className='flex flex-col gap-3 bg-white p-7 w-full rounded-2xl'>
                    <h4 className='text-xl font-semibold'>{center.name.toUpperCase()}</h4>
                    {center.distance && <h6 className='text-base text-[#696969]'><i className="ri-map-pin-line mr-2">{center.distance} kms away</i></h6>}
                    <h6 className='text-base text-[#696969]'><i className="ri-map-pin-line mr-2"></i>{center.address}</h6>
                    <h6 className='text-base text-[#696969]'><i className="ri-phone-line mr-2">{center.mobile}</i></h6>
                    <h6 className='text-base text-[#696969]'><i className="ri-time-line mr-2"></i>{center.timings}</h6>
                    <div className='flex justify-center'>
                        <button 
                        onClick={()=>{
                            navigate(`/org/${center.orgId}`)
                        }}
                        className='text-white text-lg font-medium hover:cursor-pointer py-1 px-2 w-2xs bg-red-600 hover:bg-red-700 transition-all duration-200 rounded-full '>
                        Book Now
                    </button>
                    </div>
                </div>)}
            </div>
            {centers.length === 0 ? <h3>No Organization found</h3> : null}

        </div>
    )
}

export default DonationCenters