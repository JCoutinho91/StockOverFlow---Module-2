const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    name: { type: String, required: true, default: "Anonymous" },
    comment: { type: String, required: true },
    ticker: { type: String, required: true },
    creator : { type: Schema.Types.ObjectId, ref: "User", required:true }
  },
  {
    timestamps: true,
  }
);
const Comment = model("Comment", commentSchema);

module.exports = Comment;
