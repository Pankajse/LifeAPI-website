const { validationResult } = require("express-validator");
const UserModel = require("../models/user.model");
const { BlacklistTokenModel } = require("../models/blacklist.model");
const userService = require("../services/user.service");
const bloodServices = require("../services/blood.service");
const DonateBloodModel = require("../models/donateBlood.model");
const { default: mongoose } = require("mongoose");
const StoryModel = require("../models/story.model");


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.array()[0].msg || "Error in input",
            errors: errors.array()
        });
    }
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({
            msg: "User already exists"
        });
    }
    try {
        const { fullname, email, password} = req.body;
        const user = await userService.createUser(fullname, email, password);
        const token = await user.generateAuthToken();
        if (!user) {
            return res.status(400).json({
                msg: "User not created"
            })
        }
        const userObj = user.toObject();
        delete userObj.password;
        res.cookie("token", token);
        res.status(201).json({
            msg: "User created successfully",
            user: userObj,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error
        });
    }
}

module.exports.signinUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.array()[0].msg || "Error in input",
            errors: errors.array()
        });
    }
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                msg: "User not found"
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                msg: "Wrong password"
            });
        }
        const token = await user.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({
            msg: "User logged in successfully",
            user: user,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error
        });
    }
}

module.exports.createStory = async (req, res) => {
    try {
        const userId = req.user._id;
        const { tag,story } = req.body;
        const existingStory = await StoryModel.findOne({ user: userId });
        if (existingStory) {
            return res.status(400).json({ msg: "Story already exists for this user" });
        }
        const storyResponse = await StoryModel.create({ user: userId, tag , story });
        res.status(201).json({ msg: "Story created successfully", story : storyResponse });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

module.exports.yourStory = async (req, res) => {
    try {
        const userId = req.user._id;
        const story = await StoryModel.findOne({ user: userId }).populate("user", "fullname email");
        if (!story) {
            return res.status(404).json({ msg: "Story not found for this user" });
        }
        res.status(200).json({ msg: "Story fetched successfully", story });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

module.exports.getAllStories = async (req, res) => {
    try {
        const stories = await StoryModel.find().populate("user", "fullname email");
        res.status(200).json({ msg: "Stories fetched successfully", stories });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

module.exports.deleteStory = async (req, res) => {
    try {
        const userId = req.user._id;
        const { storyId } = req.params;
        const story = await StoryModel.findOneAndDelete({ _id: storyId, user: userId });
        if (!story) {
            return res.status(404).json({ msg: "Story not found or not authorized" });
        }
        res.status(200).json({ msg: "Story deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

module.exports.updateStory = async (req, res) => {
    try {
        const userId = req.user._id;
        const { storyId } = req.params;
        const { tag , story } = req.body;
        const storyResponse = await StoryModel.findOneAndUpdate(
            { _id: storyId, user: userId },
            { tag , story },
            { new: true, runValidators: true }
        );
        if (!storyResponse) {
            return res.status(404).json({ msg: "Story not found or not authorized" });
        }
        res.status(200).json({ msg: "Story updated successfully", story : storyResponse });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

module.exports.getDonateBloodForms = async (req, res) => {
    try {
        const user = req.user;
        const donateBloodForms = await DonateBloodModel.find({ user: user._id })
            .populate('user', 'fullname email phone')
            .populate('eventId', 'name date location')
            .sort({ createdAt: -1 });
        if (!donateBloodForms || donateBloodForms.length === 0) {
            return res.status(404).json({ message: "No donate blood forms found for this user" });
        }
        return res.status(200).json({ message: "Donate blood forms retrieved successfully", donateBloodForms });
    } catch (error) {
        console.error("Error retrieving donate blood forms:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.donateBloodform = async (req, res) => {
    try {
        const user = req.user;
        const eventId = req.params.eventId;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: "Invalid Event Id" });
        }
        const { fullname, bloodType , phone,lastDonationDate,eventModel } = req.body;
        const donateForm = await bloodServices.donateBloodForm({ user: user._id,fullname, bloodType, phone,lastDonationDate, eventId,eventModel });
        if (!donateForm) {
            return res.status(400).json({ message: "Form not Submitted" });
        }
        return res.status(200).json({ message: "Form Successfully Submitted", donateForm });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.deleteDonateBloodForm = async (req, res) => {
    try {
        const user = req.user;
        const formId = req.body.formId;
        if(!mongoose.Types.ObjectId.isValid(formId)){
            return res.status(400).json({message : "Enter valid Form Id"})
        }
        const response = await bloodServices.deleteDonateBloodForm({user : user._id,formId});
        if (!response) {
            return res.status(404).json({ message: "Request not found" });
        }
        return res.status(200).json({ message: "Donation Blood form deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.getDonateBloodFormEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: "Invalid Event Id" });
        }
        const event = await bloodServices.getEventById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        const donateBloodForm = await DonateBloodModel.find({ eventId: eventId , user: req.user._id })
            .populate('user', 'fullname email phone')
            .sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Donate blood forms for the event retrieved successfully",
            event,
            donateBloodForm
        });
    } catch (error) {
        console.error("Error retrieving donate blood forms for event:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getUserProfile = async (req, res) => {
    const user = req.user;
    res.status(200).json({
        msg: "User profile",
        user: user
    });
}


module.exports.updateUserProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "Error in input",
            errors: errors.array(),
        });
    }

    const user = req.user;

    try {
        const allowedFields = ["fullname", "email",];
        const updateData = {};

        Object.keys(req.body).forEach((key) => {
            if (allowedFields.includes(key)) {
                updateData[key] = req.body[key];
            }
        });

        // ✅ Ensure at least one field is updated
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                msg: "No valid fields provided for update",
            });
        }

        // ✅ Update user with validation
        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                msg: "User not found",
            });
        }

        res.status(200).json({
            msg: "User updated successfully",
            updatedFields: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message,
        });
    }
};

module.exports.updatePassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "Error in input",
            errors: errors.array(),
        });
    }
    try {
        const user = await UserModel.findById(req.user._id).select("+password");
        const { password, newPassword } = req.body;
        const matchPassword = await user.comparePassword(password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Current Password is wrong" });
        }
        const hash = await UserModel.hashPassword(newPassword);
        await UserModel.findByIdAndUpdate(req.user._id, { password: hash })
        return res.status(200).json({ message: "Password successfully updated" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server error" });
    }
}

module.exports.deleteUserProfile = async (req, res) => {
    const user = req.user;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(user._id);
        if (!deletedUser) {
            return res.status(404).json({
                msg: "User not found",
            });
        }
        res.clearCookie("token");
        res.status(200).json({
            msg: "User deleted successfully",
            user: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
}

module.exports.signoutUser = async (req, res) => {
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
            msg: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
}


