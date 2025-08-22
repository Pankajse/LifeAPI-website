const { validationResult } = require("express-validator");
const OrgModel = require("../models/org.model");
const { BlacklistTokenModel } = require("../models/blacklist.model");
const orgService = require("../services/org.service");
const BloodStockModel = require("../models/bloodStock.model");
const BloodDonationOrgModel = require("../models/donateBloodOrg.model");
const bloodServices = require("../services/blood.service");
const { getAutoSuggestions, getAddressCoordinates } = require("../services/location.service");
const EventModel = require("../models/event.model");
const { default: mongoose } = require("mongoose");
const DonateBloodModel = require("../models/donateBlood.model");

module.exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "error in input",
            errors: errors.array()
        });
    }
    const existingOrg = await OrgModel.findOne({ email: req.body.email });
    if (existingOrg) {
        return res.status(400).json({
            msg: "Organization already exists"
        });
    }
    try {
        const { orgName, email, password, registrationNumber, orgType } = req.body;
        const org = await orgService.createOrg(orgName, email, password,orgType, registrationNumber);
        if (!org) {
            return res.status(400).json({
                msg: "Organization not created"
            });
        }
        const bloodStock = await BloodStockModel.create({
            organization: org._id,
        });
        const donation = await BloodDonationOrgModel.create({
            organization: org._id
        });
        await OrgModel.findByIdAndUpdate(org._id, {
            donateBlood: donation._id,
            bloodStock: bloodStock._id
        });
        const token = await org.generateAuthToken();
        res.cookie("token", token);
        res.status(201).json({
            msg: "Organization created successfully",
            org: org,
            token: token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error",
            error: error
        });
    }
};

module.exports.signin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "error in input",
            errors: errors.array()
        });
    }
    try {
        const { email, password } = req.body;
        const org = await OrgModel.findOne({ email }).select("+password");
        if (!org) {
            return res.status(400).json({
                msg: "Organization not found"
            });
        }
        const isMatch = await org.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid password"
            });
        }
        const token = await org.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({
            msg: "Organization logged in successfully",
            org: org,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error
        });
    }
};

module.exports.updateOrg = async (req, res) => {
    const org = req.org;
    const {  address, timings, contactNumber, recievingBloodTypes, recievingBlood } = req.body;
    if (!address || !timings || !contactNumber) {
        return res.status(400).json({
            msg: "All fields are required"
        });
    }
    try {
        const orgData = { timings, contactNumber, recievingBloodTypes, recievingBlood };
        if (address) {
            const autoComplete = await getAutoSuggestions(address);

            const location = await getAddressCoordinates(autoComplete[0].display_name);
            orgData.location = {
                type: "Point",
                address: address,
                coordinates: [location.lng, location.lat]
            };
        }
        const updatedOrg = await orgService.updateOrg(org._id, orgData);
        res.status(200).json({
            msg: "Organization updated successfully",
            org: updatedOrg
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};

module.exports.cancelRecievingBlood = async (req, res) => {
    const org = req.org;
    try {
        const updatedOrg = await OrgModel.findByIdAndUpdate(org._id, { recievingBlood: false }, { new: true });
        if (!updatedOrg) {
            return res.status(404).json({
                msg: "Organization not found"
            });
        }
        res.status(200).json({
            msg: "Successfully cancelled recieving blood",
            org: updatedOrg
        });
    } catch (error) {
        console.error("Error cancelling recieving blood:", error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};


module.exports.enableRecievingBlood = async (req, res) => {
    const org = req.org;
    try {
        const updatedOrg = await OrgModel.findByIdAndUpdate(org._id, { recievingBlood: true }, { new: true });
        if (!updatedOrg) {
            return res.status(404).json({
                msg: "Organization not found"
            });
        }
        res.status(200).json({
            msg: "Successfully enable recieving blood",
            org: updatedOrg
        });
    } catch (error) {
        console.error("Error cancelling recieving blood:", error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};

module.exports.createEvent = async (req, res) => {
    const org = req.org;
    const { title, description,type, date, time,venue,goal, address } = req.body;
    if (!title || !description || !date || !time || !address || !type || !venue || !goal) {
        return res.status(400).json({
            msg: "All fields are required"
        });
    }
    try {
        const event = await orgService.createEvent(org._id, title,type, description, date, time,venue ,address, goal);
        if (!event) {
            return res.status(400).json({
                msg: "Event not created"
            });
        }
        res.status(201).json({
            msg: "Event created successfully",
            event: event
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};

module.exports.updateEvent = async (req, res) => {
    const org = req.org;
    const { eventId, ...updates } = req.body;

    if (!eventId) {
        return res.status(400).json({
            msg: "Event ID is required"
        });
    }

    try {
        // Remove empty/undefined fields from updates
        Object.keys(updates).forEach(key => {
            if (updates[key] === undefined || updates[key] === null || updates[key] === "") {
                delete updates[key];
            }
        });
        if(updates.address){
            const autoComplete = await getAutoSuggestions(updates.address);
            const location = await getAddressCoordinates(autoComplete[0].display_name);
            updates.location = {
                type: "Point",
                address: updates.address,
                coordinates: [location.lng, location.lat]
            };
        }

        const event = await EventModel.findOneAndUpdate(
            { _id: eventId, organizerId: org._id }, // <-- your schema uses "organizerId", not "org"
            updates,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({
                msg: "Event not found or you do not have permission to update it"
            });
        }

        res.status(200).json({
            msg: "Event updated successfully",
            event: event
        });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};


module.exports.getEvents = async (req, res) => {
    const org = req.org;
    try {
        const events = await EventModel.find({ organizerId: org._id })
            .sort({ date: 1 })
            .populate('organizerId', 'orgName email')
            .select('-__v -created_at'); // Exclude unnecessary fields
        if (!events || events.length === 0) {
            return res.status(404).json({
                msg: "No events found for this organization"
            });
        }
        res.status(200).json({
            msg: "Events retrieved successfully",
            events: events
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};


module.exports.getDonateBloodForms = async (req, res) => {
    const org = req.org;
    const { eventId } = req.params;
    if (!eventId) {
        return res.status(400).json({
            msg: "Event ID is required"
        });
    }
    try {
        if(!mongoose.Types.ObjectId.isValid(eventId)){
            return res.status(400).json({
                msg: "Invalid Event ID"
            });
        };
        const forms = await bloodServices.getDonateBloodForms(eventId, org._id);
        if (!forms || forms.length === 0) {
            return res.status(404).json({
                msg: "No donate blood forms found for this event"
            });
        }
        res.status(200).json({
            msg: "Donate blood forms retrieved successfully",
            forms: forms
        });

    } catch (error) {
        console.error("Error fetching donate blood forms:", error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};

module.exports.updateDonateBloodFormStatus = async (req, res) => {
    const org = req.org;
    const { formId, status } = req.body;
    if (!formId || !status) {
        return res.status(400).json({
            msg: "Form ID and status are required"
        });
    }
    if (!['pending', 'approved', 'rejected','completed'].includes(status)) {
        return res.status(400).json({
            msg: "Invalid status value"
        });
    }
    try {
        if(!mongoose.Types.ObjectId.isValid(formId)){
            return res.status(400).json({
                msg: "Invalid Form ID"
            });
        };
        const form = await DonateBloodModel.findById(formId).populate('eventId');
        if (!form) {
            return res.status(404).json({
                msg: "Donate blood form not found"
            });
        }
        if (form.eventId.organizerId.toString() !== org._id.toString()) {
            return res.status(403).json({
                msg: "You do not have permission to update this form"
            });
        }
        form.status = status;
        await form.save();
        res.status(200).json({
            msg: "Donate blood form status updated successfully",
            form: form
        });
    } catch (error) {
        console.error("Error updating donate blood form status:", error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        }); 
    }
};

module.exports.getProfile = async (req, res) => {
    try {
        const org = req.org;

        const stock = await BloodStockModel.findOne({ organization: org._id });

        if (!stock) {
            return res.status(404).json({ msg: "Blood stock not found for this organization" });
        }

        // Calculate total units across all blood groups
        const totalUnits = Object.entries(stock.toObject())
            .filter(([key]) => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(key))
            .reduce((sum, [_, value]) => sum + value, 0);

        res.status(200).json({
            msg: "Organization profile",
            org,
            totalUnits
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error fetching profile", error: error.message });
    }
};


module.exports.signout = async (req, res) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized access"
        });
    }
    try {
        const blacklistToken = await BlacklistTokenModel.create({ token });
        res.clearCookie("token");
        res.status(200).json({
            msg: "Organization logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};

module.exports.deleteOrg = async (req, res) => {
    const org = req.org;
    try {
        const deletedOrg = await OrgModel.findByIdAndDelete(org._id);
        if (!deletedOrg) {
            return res.status(404).json({
                msg: "Organization not found",
            });
        }
        res.clearCookie("token");
        res.status(200).json({
            msg: "Organization deleted successfully",
            org: deletedOrg
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};

module.exports.bloodStock = async (req, res) => {
    const org = req.org;
    try {
        const bloodStock = await BloodStockModel.findOne({
            organization: org._id
        })
        if (!bloodStock) {
            return res.status(400).json({ msg: "Blood Stock not found" });
        }
        const bloodStoc = {
            "A+": bloodStock["A+"],
            "B+": bloodStock["B+"],
            "AB+": bloodStock["AB+"],
            "O+": bloodStock["O+"],
            "A-": bloodStock["A-"],
            "B-": bloodStock["B-"],
            "AB-": bloodStock["AB-"],
            "O-": bloodStock["O-"],
        }
        return res.status(200).json({ msg: "Blood Stock ", bloodStock: bloodStoc });
    } catch (error) {
        return res.status(400).json({ msg: "Error fetching Blood Stock", error });
    }
}

module.exports.bloodStockUpdate = async (req, res) => {
    const org = req.org;

    try {
        const { bloodType, units, action } = req.body;

        // Update blood stock
        const updateBloodStock = await BloodStockModel.updateStock(org._id, bloodType, units, action);
        if (!updateBloodStock) {
            return res.status(400).json({ msg: "Blood Stock not updated" });
        }
        const stockObj = updateBloodStock.toObject();
        // Get the donation stock for this organization
        const donationStock = await BloodDonationOrgModel.findOne({ organization: org._id });

        if (donationStock && donationStock.bloodGroups[bloodType] > updateBloodStock[bloodType]) {
            // Update only that blood group to match updated stock
            await BloodDonationOrgModel.findOneAndUpdate(
                { organization: org._id },
                { $set: { [`bloodGroups.${bloodType}`]: updateBloodStock[bloodType] } }
            );
        }
        const bloodGroups = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

        const updatedStock = Object.fromEntries(
            Object.entries(stockObj).filter(([key, value]) => bloodGroups.includes(key))
        );

        return res.status(200).json({ msg: "Blood Stock updated", updatedStock });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Error updating Blood Stock", error: error.message });
    }
};

//update the blood donation data of oeg submit for donation
module.exports.updateDonateBloodOrg = async (req, res) => {
    const org = req.org;
    try {
        const { bloodGroups } = req.body;

        // Calculate total units
        const totalUnits = Object.values(bloodGroups).reduce((sum, units) => sum + units, 0);

        // Create or update the donation record
        const response = await BloodDonationOrgModel.findOneAndUpdate(
            { organization: org._id },
            {
                bloodGroups: {
                    'A+': bloodGroups['A+'] || 0,
                    'A-': bloodGroups['A-'] || 0,
                    'B+': bloodGroups['B+'] || 0,
                    'B-': bloodGroups['B-'] || 0,
                    'AB+': bloodGroups['AB+'] || 0,
                    'AB-': bloodGroups['AB-'] || 0,
                    'O+': bloodGroups['O+'] || 0,
                    'O-': bloodGroups['O-'] || 0
                },
                totalUnits
            },
            {
                new: true,
                upsert: true, // Create a new document if one doesn't exist
                runValidators: true // Ensure validations are run
            }
        );

        return res.status(200).json({
            msg: "Submitted Successfully",
            donation: response
        });
    } catch (error) {
        console.error("Donation error:", error);
        return res.status(400).json({
            msg: "Failed to submit donation",
            error: error
        });
    }
};

//get the blood data submit for donation
module.exports.orgDonateBloodStock = async (req, res) => {
    const org = req.org;
    try {
        const donation = await BloodDonationOrgModel.findOne({ organization: org._id });

        // Return empty object if no donation exists (instead of error)
        if (!donation) {
            return res.status(200).json({
                msg: "No donation record found",
                donation: {
                    bloodGroups: {
                        'A+': 0,
                        'A-': 0,
                        'B+': 0,
                        'B-': 0,
                        'AB+': 0,
                        'AB-': 0,
                        'O+': 0,
                        'O-': 0
                    },
                    totalUnits: 0
                }
            });
        }

        return res.status(200).json({
            msg: "Donation data retrieved successfully",
            donation
        });
    } catch (error) {
        console.error("Error getting donation stock:", error);
        return res.status(400).json({
            msg: "Failed to get donation stock",
            error: error.message
        });
    }
}

// module.exports.requestBloodformOrg = async (req, res) => {
//     try {
//         const org = req.org;
//         const { bloodType, amount } = req.body;
//         const requestForm = await bloodServices.requestBloodFormOrg({ org: org._id, bloodType, amount, });
//         if (!requestForm) {
//             return res.status(400).json({ message: "Request blood form not submited" })
//         }

//         return res.status(200).json({ message: "Request blood form Submitted", requestForm })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Internal Server Error", error });
//     }
// }
