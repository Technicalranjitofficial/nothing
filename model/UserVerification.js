const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserVerificationSchema = new Schema({
  userId:String,
  uniqueString:String,
  createdAt:Date,
  expiredAt:Date,
});
 mongoose.models = {};
 export default mongoose.model("UserVerification",UserVerificationSchema);
// = UserVerification;