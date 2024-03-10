import express from "express";
import {
  getAllMovies,
  getSortMovies,
  postMovies,
  updateMovie,
  deleteMovie,
} from "../../controller/movie.controller.js";
import upload from "../../middleware/multer.middleware.js";

export const movieRouter = express.Router();

/*  
| route: "movies/?search=[movieName]"
*/
movieRouter.route("/").get(getAllMovies).post(postMovies).delete(deleteMovie);

/* 
| route: "movies/:id"
*/

movieRouter
  .route("/:id")
  .put(upload.single("file"), updateMovie)
  .delete(deleteMovie);

/*  route: "movies/sort?[query]=[value]"
|   default :    name : 1
|   priority:    year > time > name
 */
movieRouter.route("/sort").get(getSortMovies);

