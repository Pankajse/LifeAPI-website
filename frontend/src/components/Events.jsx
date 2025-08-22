import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const Events = () => {
    const bloodDriveEvents = [
        {
            title: "Community Center Blood Drive",
            date: "Saturday, December 16, 2023",
            time: "9:00 AM - 4:00 PM",
            venue: "Riverside Community Center",
            address: "123 Community Ave, Riverside, ST 12345",
            organizer: "Riverside Rotary Club",
            goal: "50 donations",
            registered: "32 registered",
            progress: 65,
            status: "Appointments Available"
        },
        {
            title: "Corporate Blood Drive - TechCorp",
            date: "Tuesday, December 19, 2023",
            time: "10:00 AM - 6:00 PM",
            venue: "TechCorp Headquarters",
            address: "456 Innovation Drive, Tech Park, ST 12348",
            organizer: "TechCorp Employee Council",
            goal: "75 donations",
            registered: "34 registered",
            progress: 45,
            status: "Open to Public"
        },
        {
            title: "Corporate Blood Drive - TechCorp",
            date: "Tuesday, December 19, 2023",
            time: "10:00 AM - 6:00 PM",
            venue: "TechCorp Headquarters",
            address: "456 Innovation Drive, Tech Park, ST 12348",
            organizer: "TechCorp Employee Council",
            goal: "75 donations",
            registered: "34 registered",
            progress: 45,
            status: "Open to Public"
        }
    ];
    return (
        <section id="events" className='flex flex-col gap-12 justify-center items-center scroll-mt-20 my-14 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Upcoming Blood Drives</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[850px] text-center '>Join us at community blood drive events happening near you. These special events bring donation opportunities directly to your neighborhood.</h5>
            {/* parent div for filter events and events cards */}
            <div className='w-full flex flex-col lg:flex-row gap-8'>
                {/* Filter enents */}
                <div className=' w-full lg:w-lg bg-gray-50 p-6 rounded-3xl h-fit lg:sticky lg:top-24 self-start '>
                    <h4 className='text-xl font-semibold'>Filter Events</h4>
                    <DropdownFunction mainType="Date Range" options={[
                        {
                            text: "Next 7 days",
                            value: 7
                        },
                        {
                            text: "Next 30 days",
                            value: 30
                        },
                        {
                            text: "Next 3 months",
                            value: 90
                        },
                    ]} />

                    <DropdownFunction mainType="Locations" options={[
                        {
                            text: "All locations",
                            value: 50
                        },
                        {
                            text: "Within 10 kms",
                            value: 10
                        },
                        {
                            text: "Within 20 kms",
                            value: 20
                        },
                        {
                            text: "Within 30 kms",
                            value: 30
                        },
                    ]} />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="community"
                                    defaultChecked
                                    className="border-2 border-blue-500 rounded data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                                />
                                <label
                                    htmlFor="community"
                                    className="text-sm text-gray-700 cursor-pointer"
                                >
                                    Community Drives
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="corporate"
                                    defaultChecked
                                    className="border-2 border-blue-500 rounded data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                                />
                                <label
                                    htmlFor="corporate"
                                    className="text-sm text-gray-700 cursor-pointer"
                                >
                                    Corporate Events
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="school"
                                    defaultChecked
                                    className="border-2 border-blue-500 rounded data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                                />
                                <label
                                    htmlFor="school"
                                    className="text-sm text-gray-700 cursor-pointer"
                                >
                                    School Drives
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Events detail */}
                <div className='w-full flex flex-col gap-3 items-center  '>
                    {bloodDriveEvents.map((event, i) => <EventsCard key={i} event={event} />)}
                    <button className='bg-gray-200 hover:cursor-pointer hover:text-blue-500 hover:bg-blue-50 text-base font-normal py-1 w-full px-8 sm:w-fit border border-gray-200 text-black rounded-full '>
                        <h5>Load More Events</h5>
                    </button>
                </div>
            </div>
        </section>
    )
}


const EventsCard = ({ event }) => {
    return <div className='mb-10 p-6 rounded-3xl w-full shadow-xl border border-gray-200'>
        <h4 className='text-xl font-semibold '>{event.title}</h4>
        <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex items-center gap-2 text-sm text-[#696969]'>
                <i className="ri-calendar-line"></i>
                <h6>{event.date}</h6>
                <h6>• {event.time}</h6>
            </div>
            <div className={`py-1 px-2 rounded-2xl flex gap-1 items-center w-fit ${event.status === "Appointments Available" ? "bg-green-100 " : "bg-red-100"}`}>
                <div className={`h-3 w-3 rounded-full ${event.status === "Appointments Available" ? "bg-green-500 text-green-500 " : "bg-red-500 text-red-500"}`} ></div>
                <h6 className={`${event.status === "Appointments Available" ? "text-green-700 " : "text-red-700"}`}>{event.status}</h6>
            </div>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between w-full my-5'>
            <div>
                <div className='flex items-center gap-2 '>
                    <i className="ri-map-pin-line text-[#696969] text-lg"></i>
                    <h5 className='text-lg font-medium'>{event.venue}</h5>
                </div>
                <h6 className='mb-2'>{event.address}</h6>
                <div className='flex items-center gap-2 text-[#696969]'>
                    <i className="ri-group-line"></i>
                    <h6>Hosted by</h6>
                    <h5 className='font-medium'>{event.organizer}</h5>
                </div>
            </div>
            <div className='w-full md:max-w-sm'>
                <div className='flex gap-2'>
                    <h5 className='font-medium'>Goal:</h5>
                    <h6 className='text-[#696969]'>{event.goal}</h6>
                </div>
                {/* line  */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-red-600 transition-all duration-300 ease-out"
                        style={{ width: `${event.progress}%` }}
                    />
                </div>
                <h6 className='text-[#696969]'>{event.registered} / {event.goal}</h6>
            </div>
        </div>
        {/* buttons */}
        <div className='flex justify-start flex-col sm:flex-row gap-3'>
            <button className='text-white hover:cursor-pointer flex gap-2 items-center justify-center px-2 w-full sm:w-fit h-8 bg-red-600 hover:bg-red-700 rounded-lg '>
                <i className="ri-add-line"></i> <h5>Register for event</h5>
            </button>
            <button className='flex items-center justify-center hover:cursor-pointer hover:text-blue-500 hover:bg-blue-50 text-base font-normal py-1 w-full px-8 sm:w-fit border border-gray-200 text-black rounded-full '>
                <i className="ri-information-line"></i>   <h5>Event Details</h5>
            </button>
            <button className='flex items-center justify-center hover:cursor-pointer hover:text-blue-500 hover:bg-blue-50 text-base font-normal py-1 w-full px-8 sm:w-fit border border-gray-200 text-black rounded-full '>
                <i className="ri-share-2-line"></i>   <h5>Share</h5>
            </button>
        </div>
    </div>
}

const DropdownFunction = ({ mainType, options }) => {
    const [selected, setSelected] = useState(options[options.length - 1].value)

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {mainType}
            </label>

            <Select value={selected} onValueChange={setSelected}>
                <SelectTrigger
                    className="
            w-full rounded-2xl
            focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus:border-blue-500
          "
                >
                    <SelectValue placeholder="Select option" />
                </SelectTrigger>

                <SelectContent className="bg-white border-0 w-full rounded-2xl">
                    {options.map((x, i) => (
                        <SelectItem
                            key={i}
                            value={x.value}
                            className="
                w-full font-normal
                hover:bg-blue-50 hover:text-blue-600
                data-[state=checked]:bg-blue-100
                focus:bg-blue-100
              "
                        >
                            {x.text}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default Events