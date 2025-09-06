import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";




const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, validate: [validator.isEmail, "Invalid email"] },
  refreshTokens:[String],
  firstName: String,
  lastName: String,
  profilePicture: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  preferences: {
    theme: { type: String, default: "light" },
    language: { type: String, default: "en" },
  },
  isVerified: { type: Boolean, default: false },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});




userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10); //10 is saltRounds.
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();  
  } catch (error) {
    next(error);
  }


}
)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;