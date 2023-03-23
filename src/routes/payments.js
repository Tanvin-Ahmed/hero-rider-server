const express = require("express");

const router = express.Router();

router.get("/get-users");
router.post("/create-user");
router.put("/update-user");

module.exports = router;
