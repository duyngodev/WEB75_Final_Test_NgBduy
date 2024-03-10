import movieModel from "../model/movie.model.js";
import Fuse from "fuse.js";
import { cloudinary } from "../server.js";

/*    
|   Method: GET
|   Desc:   get all movies from DB, 
|           get movies by query [name]
|   Route:  /movies/?search=[name]
|   Public
*/
const getAllMovies = async (req, res) => {
  try {
    const { search } = req.query;
    const movies = await movieModel.find({});
    if (movies.length === 0) throw new Error("No movies were found");
    if (search) {
      const keyword = search.replace(/[^a-z0-9]/gi, "").replace(/  /g, " ");
      console.log(keyword);
      const fuseOptions = {
        keys: ["name"],
        location: 0,
        threshold: 0.5,
        distance: 500,
      };
      const fuse = new Fuse(movies, fuseOptions);
      const result = fuse.search(keyword);
      res.status(200).send({ total: result.length, result });
    } else {
      res.status(200).send({ total: movies.length, movies });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || error);
  }
};

/*    
|   Method: GET
|   Desc:   get sorted movies from DB
|   Route:  /movies/sort ? name=1 & year=-1 ...
|   Public
*/
const getSortMovies = async (req, res) => {
  try {
    const { name, time, year } = req.query;
    // client sorting
    const sortBy = {};
    if (year == 1 || year == -1) sortBy.year = parseInt(year);
    if (time == 1 || time == -1) sortBy.time = parseInt(time);
    if (name == 1 || name == -1) sortBy.name = parseInt(name);
    if (sortBy.year || sortBy.name || sortBy.time) {
      const movies = await movieModel.find({}).sort(sortBy);
      if (movies.length === 0) throw new Error("No movies were found");
      res.status(200).send({ total: movies.length, movies });
    }
    //default sorting name:1
    else {
      const movies = await movieModel.find({}).sort({ name: 1 });
      if (movies.length === 0) throw new Error("No movies were found");
      res.status(200).send({ total: movies.length, movies });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || error);
  }
};

/*    
|   Method: POST
|   Desc:   post a movie  with key-value pairs in the body
|           post many movies with object {movies:[movie1, movie2,...]}
|   Route:  /movies/
|   Public
*/
const postMovies = async (req, res) => {
  try {
    const { movies } = req.body;
    const existMovie = [];
    const listResult = [];
    // post many movies with object {movies:[movie1, movie2,...]}
    if (movies.length > 0) {
      for (const movie of movies) {
        const { name, time, year, image, introduce } = movie;
        const exist = await movieModel.findOne({ name });
        if (exist) {
          existMovie.push(movie);
        } else {
          const result = await movieModel.create({
            name,
            time,
            image: { image_url: image },
            year,
            introduce,
          });
          console.log(image);
          console.log(result);
          listResult.push(result);
        }
      }
    } else {
      // post a movie  with key-value pairs in the body
      const { name, time, year, image, introduce } = req.body;
      const exist = await movieModel.findOne({ name });
      if (exist) existMovie.push({ name, time, year, image, introduce });
      await movieModel.create({
        name,
        time,
        year,
        image: { image_url: image },
        introduce,
      });
    }
    if (existMovie.length > 0)
      throw {
        message: `${existMovie.length} movies already existed`,
        data: existMovie,
      };
    res.status(200).send({
      message: `${listResult.length} movies added successfully`,
      listResult,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

/*    
|   Method: PUT
|   Desc:   update name, year, time, introduce 
|           upload image with cloudinary
|   Route:  /movies/:id
|   Private
*/
const updateMovie = async (req, res) => {
  try {
    const file = req.file;
    if (!req.params.id) throw new Error(`Invalid id`);
    const movie = await movieModel.findOne({ _id: req.params.id });
    if (!movie) throw new Error("Movie not found");

    const { name, time, year, introduce } = req.body;

    if (file) {
      const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;
      const fileName = `${Date.now()}-${file.originalname.split(".")[0]}`;

      await cloudinary.uploader.upload(
        dataUrl,
        {
          public_id: fileName,
          resource_type: "auto",
          field_folder: "web75_final_test",
        },
        (error, result) => {
          if (error) console.log(error);
          movie.image.public_id = fileName;
          movie.image.image_url = result.secure_url;
        }
      );
    }

    await movieModel.updateOne(
      { _id: movie.id },
      { name, time, year, image: movie.image, introduce }
    );

    res.status(200).send({ message: "movie updated successfully", movie });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

/*    
|   Method: DELETE
|   Desc:   delete all movies + delete all image on cloudinary server
|           delete a movie by ID + delete image on cloudinary server
|   Route:  /movies/
|           /movies/:id/
|   Private
*/
const deleteMovie = async (req, res) => {
  const movies = await movieModel.find({});
  if (!movies) throw new Error("Database is empty");

  const id = req.params.id;
  if (id) {
    const movie = await movieModel.findOneAndDelete({ _id: id });
    if (!movie) throw new Error("Movie not found");
    if (movie.image.public_id)
      cloudinary.uploader.destroy(movie.image.public_id, (error, result) => {
        if (error) throw error;
        console.log("delete on cloudinary successfully", result);
      });
    res.status(200).send(`Movie ${movie.name} deleted successfully`);
  } else {
    for (const movie of movies) {
      if (movie.image.public_id)
        cloudinary.uploader.destroy(movie.image.public_id, (error, result) => {
          if (error) throw error;
          console.log("delete on cloudinary successfully", result);
        });
    }
    await movieModel.deleteMany({});
    res.status(200).send(`All movies deleted successfully`);
  }
};

export { getAllMovies, getSortMovies, postMovies, updateMovie, deleteMovie };
