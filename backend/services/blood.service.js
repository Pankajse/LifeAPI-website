const DonateBloodModel = require("../models/donateBlood.model");
const EventModel = require("../models/event.model");
const MatchModel = require("../models/match.model");
const RequestBloodModel = require("../models/requestBlood.model");
const { getAddressCoordinates, getUsersInTheRadius, getOrgsInTheRadius, getDistanceTime } = require("./location.service");

const getEvents = async (range, type, daysRange) => {
    const query = {};
    if (type) {
        query.type = type;
    }
    if (daysRange) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + Number(daysRange));
        query.date = {
            $gte: startDate,
            $lte: endDate
        };
    }
    if (range) {
        const { coordinates } = range;
        query.location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [coordinates.lng, coordinates.ltd]
                },
                $maxDistance: range.radius * 1000
            }
        };
    }
    const events = await EventModel.find(query).sort({ date: 1 });
    return events;
}

const getEventById = async (eventId) => {
    const event = await EventModel.findById(eventId);
    if (!event) {
        throw new Error("Event not found");
    }
    return event;
}

const getDonateBloodForms = async (eventId,orgId) => {
    if (!eventId) {
        throw new Error("Event ID is required");
    }
    const event = await EventModel.find({_id : eventId,organizerId : orgId});
    if (!event) {
        throw new Error("Event not found");
    }
    const donateBloodForms = await DonateBloodModel.find({eventId : eventId}).populate("user", "fullname email");
    return donateBloodForms;
}

const donateBloodForm = async ({ user, fullname, bloodType, phone ,eventId,eventModel}) => {
    if (!user || !fullname  || !bloodType || !phone || !eventId) {
        throw new Error("All fields are Required");
    }
    
    const donateBloodResponse = await DonateBloodModel.create({
        user,
        fullname,
        bloodType,
        phone,
        eventId,
        eventModel
    });
    return donateBloodResponse;
}

const deleteDonateBloodForm = async ({ user, formId }) => {
    const response = await DonateBloodModel.deleteOne({ user, _id: formId })
    return response;
}

// const requestBloodForm = async ({ requesterId, bloodType, amount, address, description, urgencyLevel, requiredByDate }) => {
//     if (!requesterId || !bloodType || !amount || !address || !description || !urgencyLevel || requiredByDate) {
//         throw new Error("All Fields are required");
//     }
//     await RequestBloodModel.findOneAndDelete({ user });
//     const location = await getAddressCoordinates(address);

//     const requestBloodResponse = await RequestBloodModel.create({
//         requesterId,
//         bloodType,
//         amount,
//         description,
//         urgencyLevel,
//         requiredByDate,
//         location: {
//             type: "Point",
//             coordinates: [location.lng, location.ltd]
//         }
//     });
//     return requestBloodResponse;
// }

// const findRequestIdByUserId = async (userId,formId) => {
//     const request = await RequestBloodModel.findOne({ requesterId : userId, _id : formId });
//     return request ? request._id : null;
// }

// const updateRequestBloodForm = async (formId,requesterId, updateData) => {
//     if (!formId || !requesterId || !updateData ) {
//         throw new Error("Request ID and update data are required");
//     }
//     const updatedRequest = await RequestBloodModel.findOneAndUpdate({_id : formId, requesterId }, updateData, { new: true, runValidators: true });
//     return updatedRequest;
// }

// const deleteRequestBloodForm = async (userId,formId) => {
//     if(!userId || !formId){
//         throw new Error("All feilds are required");
//     }
//     const response = await RequestBloodModel.deleteOne({ requesterId : userId , _id : formId });
//     return response;
// }

// const nearbyDonorsByBloodType = async (location, bloodType) => {
//     const users = await getUsersInTheRadius(location.coordinates[0], location.coordinates[1], 30);
//     const filteredUsers = users.filter(user => user.bloodType === bloodType);
//     const updatedUsers = await Promise.all(filteredUsers.map(async (user) => {
//         const distanceData = await getDistanceTime(
//             `${location.coordinates[1]},${location.coordinates[0]}`,
//             `${user.location.coordinates[1]},${user.location.coordinates[0]}`
//         );
//         return {
//             ...user.toObject(),
//             distance: distanceData.distance.text,
//             duration: distanceData.duration.text
//         };
//     }));
//     return updatedUsers;
// };

// const nearbyOrgsByBloodType = async (location, bloodType) => {
//     const orgs = await getOrgsInTheRadius(location.coordinates[0], location.coordinates[1], 30);
//     const filteredOrgs = orgs.filter(org =>
//         org.donateBlood &&
//         org.donateBlood.bloodGroups &&
//         org.donateBlood.bloodGroups[bloodType] > 0
//     );
//     const updatedOrgs = await Promise.all(filteredOrgs.map(async (org) => {
//         const distanceData = await getDistanceTime(
//             `${location.coordinates[1]},${location.coordinates[0]}`,
//             `${org.location.coordinates[1]},${org.location.coordinates[0]}`
//         );
//         return {
//             ...org.toObject(),
//             distance: distanceData.distance.text,
//             duration: distanceData.duration.text
//         };
//     }));
//     return updatedOrgs;
// };



module.exports = {
    getEvents,
    getEventById,
    getDonateBloodForms,
    donateBloodForm,
    deleteDonateBloodForm
};