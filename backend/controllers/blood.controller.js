
const { default: mongoose } = require("mongoose");
const bloodServices = require("../services/blood.service");

module.exports.getEvents = async (req, res) => {
    try {
        const {range , type, daysRange} = req.body;
        const events = await bloodServices.getEvents( range, type, daysRange);
        if (!events) {
            return res.status(404).json({ msg: "No events found" });
        }
        res.status(200).json({ msg: "Events fetched successfully", events });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

module.exports.getEventById = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ msg: "Invalid event ID" });
        }
        const event = await bloodServices.getEventById(eventId);
        if (!event) {
            return res.status(404).json({ msg: "Event not found" });
        }
        res.status(200).json({ msg: "Event fetched successfully", event });
    }
    catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message
        });
    }
};

// module.exports.requestBloodform = async (req, res) => {
//     try {
//         const actor = req.user || req.org;
//         const requesterModel = req.type;
//         const { bloodType, amount, address, description, urgencyLevel, requiredByDate } = req.body;
//         const requestForm = await bloodServices.requestBloodForm({ requesterId: actor._id, requesterModel, bloodType, amount, address, description, urgencyLevel, requiredByDate });
//         if (!requestForm) {
//             return res.status(400).json({ message: "Request blood form not submited" })
//         }

//         return res.status(200).json({ message: "Request blood form Submitted", requestForm })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Internal Server Error", error });
//     }
// }


// module.exports.nearbydonorsOrgsByBloodType = async (req, res) => {
//     const actor = req.user || req.org;
//     try {
//         const requestBloodForm = await RequestBloodModel.findOne({ requesterId: actor._id });
//         const bloodType = requestBloodForm.bloodType;
//         const location = requestBloodForm.location;
//         if (!requestBloodForm) {
//             return res.status(400).json({ message: "Request blood form not found" });
//         }
//         const [nearbyDonors, nearbyOrgs] = await Promise.all([
//             bloodServices.nearbyDonorsByBloodType(location, bloodType),
//             bloodServices.nearbyOrgsByBloodType(location, bloodType)
//         ]);

//         // Transform donors data
//         const transformedDonors = nearbyDonors.map(donor => ({
//             _id: donor.user._id,
//             name: donor.user.fullname,
//             type: 'user',
//             distance: donor.distance,
//             duration: donor.duration,
//             bloodGroup: donor.bloodType,
//             units: null, // Empty for users
//             contact: donor.contact,
//             availability: donor.availability.date,
//             weight: donor.weight,
//             age: donor.age,
//             location: donor.location,
//             email: donor.user.email
//         })).filter(donor => String(donor._id) !== String(user._id));

//         // Transform organizations data
//         const transformedOrgs = nearbyOrgs.map(org => ({
//             _id: org._id,
//             name: org.orgName,
//             type: org.orgType,
//             distance: org.distance,
//             duration: org.duration,
//             bloodGroup: null, // Empty for organizations (since they have multiple)
//             units: org.donateBlood.totalUnits,
//             contact: org.contactNumber,
//             availability: null, // Empty for organizations
//             weight: null, // Empty for organizations
//             age: null, // Empty for organizations
//             location: org.location,
//             email: org.email,
//             bloodStock: org.donateBlood.bloodGroups // Include full blood stock details
//         })).filter(orgdonor => String(orgdonor._id) != org._id);

//         // Combine results
//         const results = [...transformedDonors, ...transformedOrgs];

//         return res.status(200).json({
//             message: "Nearby donors and organizations found",
//             results
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error", error });
//     }
// };

// module.exports.requestBloodFormUpdate = async (req, res) => {
//     try {
//         const user = req.user;
//         const formId = req.params.formId;
//         if (!mongoose.Types.ObjectId.isValid(formId)) {
//             return res.status(400).json({ message: "Invalid Form Id" });
//         }
//         const { ...updateData } = req.body;
//         //Only below feilds are allowed to update
//         const allowedFields = ['bloodType', 'amount', 'urgency', 'location', 'requiredByDate', 'description', 'status'];
//         const filtered = {};
//         for (let key of allowedFields) {
//             if (key in data) {
//                 filtered[key] = data[key];
//             }
//         }

//         const updatedRequestForm = await bloodServices.updateRequestBloodForm(formId, user._id, filtered);
//         if (!updatedRequestForm) {
//             return res.status(400).json({ message: "Request blood form not updated" });
//         }
//         return res.status(200).json({ message: "Request blood form updated", updatedRequestForm });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// module.exports.deleteRequestBloodForm = async (req, res) => {
//     try {
//         const user = req.user;
//         const formId = req.params.formId;
//         if (!mongoose.Types.ObjectId.isValid(formId)) {
//             return res.status(400).json({ message: "Invalid Form Id" });
//         }
//         const response = await bloodServices.deleteRequestBloodForm(user._id, formId);
//         if (!response) {
//             return res.status(404).json({ message: "Request not found" });
//         }
//         return res.status(200).json({ message: "Request blood form deleted successfully" });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// module.exports.alreadyRequestedToDonors = async (req, res) => {
//     try {
//         const recipientId = req.user._id || req.org._id;

//         const requests = await MatchModel.find({recipientId})

//         return res.status(200).json({
//             msg: "Request created successfully",
//             requests
//         });

//     } catch (error) {
//         return res.status(500).json({ msg: "Internal server error", error: error.message });
//     }
// };

// module.exports.alreadyRequestedToRecipients = async (req, res) => {
//     try {
//         const donorId = req.user._id || req.org._id;

//         const requests = await MatchModel.find({donorId});

//         return res.status(200).json({
//             msg: "Request created successfully",
//             requests
//         });

//     } catch (error) {
//         return res.status(500).json({ msg: "Internal server error", error: error.message });
//     }
// };

// module.exports.createRequestToDonor = async(req,res)=>{
//     try {
//         const recipientType = req.type;
//         const recipientId = req.user._id || req.org._id;
//         const formId = req.body.formId;
//         const donorId = req.body.donorId;
//         const donorType = req.body.donorType;
//         if (!mongoose.Types.ObjectId.isValid(formId) || !mongoose.Types.ObjectId.isValid(donorId)) {
//             return res.status(400).json({ message: "Invalid Id" });
//         }
//         const response = await bloodServices.createRequestToDonor(donorId, donorType, recipientId,recipientType,formId);
//         if (!response) {
//             return res.status(400).json({ message: "Request not created" });
//         }
//         return res.status(200).json({ message: "Request created successfully", status : response.status });
//     } catch (error) {
//         return res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }

// module.exports.createRequestToRecipient = async(req,res)=>{
//     try {
//         const donorId = req.user._id || req.org._id;
//         const donorType = req.type;
//         const recipientId = req.body.recipientId;
//         const recipientType = req.body.recipientType;
//         const formId = req.body.formId;
//         if (!mongoose.Types.ObjectId.isValid(formId) || !mongoose.Types.ObjectId.isValid(recipientId)) {
//             return res.status(400).json({ message: "Invalid Id" });
//         }
//         const response = await bloodServices.createRequestToRecipient(donorId, donorType, recipientId,recipientType,formId);
//         if (!response) {
//             return res.status(400).json({ message: "Request not created" });
//         }
//         return res.status(200).json({ message: "Request created successfully", status : response.status });
//     } catch (error) {
//         return res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }
