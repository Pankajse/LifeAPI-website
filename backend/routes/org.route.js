const express = require("express");
const router = express.Router();
const orgController = require("../controllers/org.controller");
const validate = require("../middlewares/user.validation");
const { orgAuth } = require("../middlewares/orgAuth.middleware");

router.post("/signup", validate.orgRegistrationValidationRules, orgController.signup);
router.post("/signin", validate.orgSigninValidationRules, orgController.signin);

router.use(orgAuth)
router.put("/updateOrg",  orgController.updateOrg);
router.put("/cancelRecievingBlood", orgController.cancelRecievingBlood);
router.put("/enableRecievingBlood", orgController.enableRecievingBlood);
router.post("/event", orgController.createEvent);
router.put("/event",  orgController.updateEvent);
router.get("/events",orgController.getEvents);
router.get("/donate-blood-forms/:eventId", orgController.getDonateBloodForms);
router.put("/updateDonateBloodFormStatus", orgController.updateDonateBloodFormStatus);
// router.get("/me", orgController.getProfile);
// router.post("/logout",  orgController.signout);
// router.delete("/delete", orgController.deleteOrg);
// router.get("/blood-stock",orgController.bloodStock)
// router.put("/blood-stock",orgController.bloodStockUpdate)
// router.post("/donate-blood",orgController.updateDonateBloodOrg)
// router.get("/donate-blood",orgController.orgDonateBloodStock)


module.exports = router;