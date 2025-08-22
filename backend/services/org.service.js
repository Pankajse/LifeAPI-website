const EventModel = require("../models/event.model");
const OrgModel = require("../models/org.model");
const { getAddressCoordinates, getAutoSuggestions} = require("./location.service");

module.exports.createOrg = async (orgName, email, password, orgType, registrationNumber) => {
    if (!orgName || !email || !password || !orgType) {
        throw new Error("All fields are required");
    }
    const hashPassword = await OrgModel.hashPassword(password);
    const orgData = { orgName, email, password: hashPassword, orgType };
    if (registrationNumber) {
        orgData.registrationNumber = registrationNumber;
    }
    const org = await OrgModel.create(orgData);
    const orgObj = org.toObject();
    delete orgObj.password;
    return org;
}

module.exports.updateOrg = async (orgId, orgData) => {
    if (!orgId || !orgData) {
        throw new Error("Organization ID and data are required");
    }
    const updatedOrg = await OrgModel.findByIdAndUpdate(orgId, orgData, { new: true });
    if (!updatedOrg) {
        throw new Error("Organization not found");
    }
    const orgObj = updatedOrg.toObject();
    delete orgObj.password;
    return orgObj;
}

module.exports.createEvent = async (orgId, title, type, description, date, time, venue, address, goal) => {
    if (!orgId || !title || !type || !description || !date || !time || !venue || !address) {
        throw new Error("All fields are required");
    }
    const autoComplete = await getAutoSuggestions(venue+address);

    const location = await getAddressCoordinates(autoComplete[0].display_name);
    const eventData = {
        organizerId : orgId,
        title,
        type,
        description,
        date,
        time,
        venue,
        address,
        goal,
        location: {
            type: "Point",
            address: address,
            coordinates: [location.lng, location.lat]
        }
    };
    const event = await EventModel.create(eventData);
    return event;
}