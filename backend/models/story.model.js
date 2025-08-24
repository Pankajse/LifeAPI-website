const mongoose = require("mongoose");
const storySchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    tag : {
        type : String,
        required : true,
        enum: ["Regular Donor", "First Time Donor", "Blood Recipient", "Recipient to Donor", "Volunteer"]},
    story : {
        type : String,
        required : true,
        minLength: [5, "Story should be at least 10 characters long"]
    }
},
{
    timestamps: true
});
storySchema.index({ user: 1 }, { unique: true });
const StoryModel = mongoose.model("Story", storySchema);
module.exports = StoryModel;
