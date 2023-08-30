var express = require("express"),
  router = express.Router(),
  user = require("../controller/user");

router.post("/doLogin", user.doLogin);
module.exports = router;
