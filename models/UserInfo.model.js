const { Schema, model } = require("mongoose");

const userInfoSchema = new Schema(
  {
    firstname: { type: String, default: ""},
    lastname: { type: String, default: ""},
    age: {type: Number, default: ""},
    aboutme: {type:String, default: "", maxLength: 400},
    favoritestocks: {type:String, default: ""},
    user: { type:String, default: "" },
    imageUrl: {type: String, default:"/images/default-profile-img.jpg"},
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserInfo = model("UserInfo", userInfoSchema);

module.exports = UserInfo;