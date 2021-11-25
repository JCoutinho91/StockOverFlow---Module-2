const { Schema, model } = require("mongoose");

const userInfoSchema = new Schema(
  {
    firstname: { type: String, default: ""},
    lastname: { type: String, default: ""},
    age: {type: Number, default: ""},
    aboutme: {type:String, default: "", maxLength: 400},
    favoritestocks: {type:String, default: ""},
    user: { type:String, default: "" },
    imageUrl: {type: String, default:"https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80", required:false},
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserInfo = model("UserInfo", userInfoSchema);

module.exports = UserInfo;