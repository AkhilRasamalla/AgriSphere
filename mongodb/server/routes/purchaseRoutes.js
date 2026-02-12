const express = require("express");
const Purchase = require("../models/Purchase");

const router = express.Router();

/* =========================
   CREATE PURCHASE
   ========================= */
router.post("/create", async (req, res) => {
  try {
    const { seedId, buyerId, buyerEmail, sellerEmail, requestId } = req.body;

    const newPurchase = new Purchase({
      seedId,
      buyerId,
      buyerEmail,
      sellerEmail,
      requestId,
      status: "completed",
    });

    await newPurchase.save();

    res.status(201).json(newPurchase);
  } catch (error) {
    console.error("Purchase creation error:", error);
    res.status(500).json({ message: "Failed to create purchase" });
  }
});

/* =========================
   GET PURCHASES BY BUYER
   ========================= */
router.get("/buyer/:email", async (req, res) => {
  try {
    const purchases = await Purchase.find({
      buyerEmail: req.params.email,
    }).populate("seedId");

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Fetch purchase error:", error);
    res.status(500).json({ message: "Failed to fetch purchases" });
  }
});

module.exports = router;
