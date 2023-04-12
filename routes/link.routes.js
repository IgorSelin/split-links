const { Router } = require("express");
const Link = require("../models/Link");
const config = require("config");
const router = Router();
const auth = require("./../middlewares/auth.middleware");

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;
    const exiting = await Link.findOne({ from });
    if (exiting) {
      return res.json({ link: exiting });
    }

    let nanoidGenerator = await import("nanoid");
    const code = nanoidGenerator.nanoid();
    const to = baseUrl + "/t/" + code;
    const link = new Link({ code, to, from, owner: req.user.userId });
    await link.save();
    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "Something went wront, please try again" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    console.log(e, "errors");
    res.status(500).json({ message: "Something went wront, please try again" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const links =  await Link.findById(req.params.id);
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "Something went wront, please try again" });
  }
});

module.exports = router;
