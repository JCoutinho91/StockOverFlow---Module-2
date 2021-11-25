const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    name: { type: String, required: true, default: "Anonymous" },
    comment: { type: String, required: true, maxLength: 200},
    ticker: { type: String},
    creator : { type: Schema.Types.ObjectId, ref: "User", required:true }
  },
  {
    timestamps: true,
  }
);
const Comment = model("Comment", commentSchema);

module.exports = Comment;
