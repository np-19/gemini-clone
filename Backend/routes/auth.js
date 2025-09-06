import { Router } from "express";
import User from "../models/users.js";
import {
  generateRefreshToken,
  generateToken,
  verifyToken,
} from "../utils/jwt.js";
import cookieParser from "cookie-parser";
import { protect } from "../middlewares/auth.js";
import { getResponse } from "../utils/gemini.js";
const router = Router();
router.use(cookieParser());

router.route("/register").post(async (req, res) => {
  try {
    const newUser = req.body.User;
    const user = new User(newUser);
    await user.save();
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshTokens.push(refreshToken);
    await user.save();
    const {password, refreshTokens, ...userWithoutPassword} = user._doc;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    res.json({ accessToken, user:userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { login, password } = req.body.User;
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });
    if (!user) return res.status(400).json({ error: "Username is wrong" });
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ error: "Password is wrong" });
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    if (!user.refreshTokens.includes(refreshToken)) {
      user.refreshTokens.push(refreshToken);
    }

    await user.save();
    const {password:pass, refreshTokens, ...userWithoutPassword} = user._doc;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    res.json({ accessToken, user:userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.route("/token").post(async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: "No refresh token" });

    const payload = verifyToken(token, true);

    const user = await User.findById(payload.id);
    if (!user || !user.refreshTokens.includes(token)) {
      return res.status(401).json({ error: "Invalid user or refresh token" });
    }
    //optional rotate refresh token
    const newRefreshToken = generateRefreshToken(user);
    user.refreshTokens = user.refreshTokens.filter((rt) => rt !== token);
    user.refreshTokens.push(newRefreshToken);
    await user.save();
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    const accessToken = generateToken(user);
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: "Refresh token is invalid or expired" });
  }
});

router.route("/logout").post(async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const user = await User.findOne({ refreshTokens: token });
      if (user) {
        user.refreshTokens = user.refreshTokens.filter((rt) => rt !== token);
        await user.save();
      }
    }
    res.clearCookie("refreshToken");
    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.route("/user").get(protect, async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
