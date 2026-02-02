const router = require("express").Router();
const c = require("../controllers/priceController");

router.get("/crops", c.getCrops);
router.get("/markets/:crop", c.getMarkets);
router.get("/:crop/:market", c.analyse);

module.exports = router;
