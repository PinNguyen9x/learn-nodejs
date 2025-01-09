"use strict";

class AccessController {
  async login(req, res) {
    // login logic
  }

  async signup(req, res, next) {
    try {
      console.log("request body", req.body);
      return res.status(200).json({
        code: "20001",
        metadata: { userId: 1 },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AccessController();
