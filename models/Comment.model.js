const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    name: {type: String, required: true, default: "Anonymous"},
    comment: {type: String, required: true},
    stockID: {type: [Array]}
  },
  {
    timestamps: true,
  }
);
const Comment = model("Comment", commentSchema);

module.exports = Comment;
