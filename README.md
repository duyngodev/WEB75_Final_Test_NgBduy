# WEB75_Final_Test_NgBduy
### Front-end deploy:  ~~~ [Front-end](https://web75-front-end-ngbduy-1.onrender.com)
### Back-end deploy:  ~~~ [Back-end](https://web75-final-test-ngbduy.onrender.com)

| Method | Route | Description | Body |
| :---: | :-----:|---|---|
 GET | /movies/ | Get all movies from the database | |
 | | movies//?search=[name] | query search in the url, fuzzy search supports in finding keyword nearly matching the movie's name | |
| | movies/sort | sorting movies, default is ascending [name]. | |
| | movies/sort?[query1]=[value1]&[query2]=...| query search in the url, queries are [year],[name],[time]. sorting options from 1 to 3 pairs (priority [year] > [time] > [name]) |  |
POST | movies/ | a/ post many movies.<br /> b/ post a movie. | a/ { "movies" : [{movie1}, {movie2},...] <br/> b/ { "name", "year","time", "introduce", "image"}
| PUT| movies/:id | update all filed with body.req and upload image to cloudinary for storage and add to database| a/ File <br/> b/{"name","year","time","introduce"|
| DELETE | /movies/ | delete all the movies with delete the image on cloudinary| |
| | /movies/:id | delete specific movie with delete its image on cloudinary| |
|-|-|-|-|
|POST| /users/login | login and create Token| {"username","password"}|
| | /users/register | sign up, hash password and save user to database| {"username","password","repeatPassword}|
|DELETE| /users/logout | logout and blacklist Token | |
