import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  name: String,
  time: Number,
  year: Number,
  image: {
    public_id: String,
    image_url: String,
  },
  introduce: String,
});

const movieModel = mongoose.model("movie", movieSchema);
export default movieModel;
