var express = require("express"),
  router = express.Router(),
  award = require("../controller/award");

router.get("/get_data/:offset/:limit/:sort", award.get_data);
router.get("/get_data_by_id/:id", award.get_data_by_id);
router.get("/get_all_data/:limit/:offset", award.get_all_data);
module.exports = router;
