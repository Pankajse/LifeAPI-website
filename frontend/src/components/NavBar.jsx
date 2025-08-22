import whitelogo from '../assets/lifeapi_logo_white.png';
import redlogo from '../assets/lifeapi_logo_red.png';
import { useEffect, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

const NavBar = () => {
    const isDesktop = useMediaQuery("(min-width : 768px)")
    useEffect(() => {
      if(isDesktop){
        setOpenHeader(true);
      }else{
        setOpenHeader(false)
      }
    
    }, [isDesktop]);
    
    const [openHeader, setOpenHeader] = useState(false);
    const headerOptions = [
        {
            name: "Home",
            herf: "#home"
        },
        {
            name: "About",
            herf: "#about"
        },
        {
            name: "Eligibility",
            herf: "#eligibility"
        },
        {
            name: "Events",
            herf: "#events"
        },
        {
            name: "FAQs",
            herf: "#faqs"
        }
    ];
    const headerElements = headerOptions.map((element, i) => <a
        className='text-medium transition-all duration-1000 text-[#808080] font-normal hover:text-red-500 hover:cursor-pointer w-full md:w-auto ' 
        href={element.herf}
        key = {i} >
        {element.name}
    </a>)
    return (
        <div className='flex flex-col md:flex-row md:items-center gap-1  justify-between fixed top-0 bg-white shadow-lg w-full mb-2 py-2 md:px-18 z-50 '>
            <div className='px-3 md:px-0 shadow-lg md:shadow-none flex justify-between items-center '>
                <img src={redlogo} alt="logo" className='w-40' />
                <i className="ri-menu-line md:hidden hover:cursor-pointer hover:text-red-500 " onClick={() => { setOpenHeader(!openHeader) }}></i>
            </div>
            {openHeader && <div className='flex flex-col items-center md:flex-row px-3 md:px-0 gap-5'>

                {headerElements}

                <a href='#centers' className='text-white hover:cursor-pointer px-2 py-1 w-full  h-8 bg-red-600 hover:bg-red-700 rounded-lg '>
                    Donate Now
                </a>
            </div>}
        </div>
    )
}

export default NavBar