const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: {type: String, required: true},
    commentID: {type: String, required: true, default: "Anonymous"}
  },
  {
    timestamps: true,
  }
);
const Comment = model("Comment", commentSchema);

module.exports = Comment;
