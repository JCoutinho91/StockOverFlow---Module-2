const { Schema, model } = require("mongoose");

const userInfoSchema = new Schema(
  {
    firstname: { type: String},
    lastname: { type: String},
    age: {type: Number},
    aboutme: {type:String},
    favoritestocks: [{type:String}],
    user: { type:String },
    imageUrl: {type: String}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserInfo = model("UserInfo", userInfoSchema);

module.exports = UserInfo;