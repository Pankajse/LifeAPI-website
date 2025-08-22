const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/user.validation");
const { userAuth } = require("../middlewares/userAuth.middleware");


router.post("/signup",validate.userRegisterValidationRules,userController.registerUser)

router.post("/signin",validate.userLoginValidationRules,userController.signinUser)

router.use(userAuth);

router.post("/story", userController.createStory);
router.get("/yourstory", userController.yourStory);
router.get("/stories", userController.getAllStories);
router.delete("/story/:storyId", userController.deleteStory);
router.put("/story/:storyId", userController.updateStory);

router.post('/donate-blood-form/:eventId',userController.donateBloodform);
router.get('/donate-blood-form/:eventId',userController.getDonateBloodFormEvent);
router.get('/donate-blood-forms',userController.getDonateBloodForms);
router.delete('/donate-blood-form',userController.deleteDonateBloodForm);

router.get("/me",userController.getUserProfile);

router.put("/updateProfile",validate.userUpdateValidationRules,userController.updateUserProfile);

router.put("/updatePassword",validate.updatePasswordValidation,userController.updatePassword);

router.delete("/deleteProfile",userController.deleteUserProfile);

router.post("/logout",userController.signoutUser);


module.exports = router