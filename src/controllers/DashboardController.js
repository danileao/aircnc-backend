const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;

    const spots = await Spot.find({ user: user_id });

    return res.json(spots);
  },
};
