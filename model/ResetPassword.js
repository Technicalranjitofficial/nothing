const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserPasswordResetSchema = new Schema({
  userId:String,
  uniqueString:String,
  createdAt:Date,
  expiredAt:Date,
});
 mongoose.models = {};
 export default mongoose.model("UserPasswordReset",UserPasswordResetSchema);
// = UserVerification;