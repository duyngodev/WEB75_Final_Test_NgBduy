# WEB75_Final_Test_NgBduy
### Front-end deploy:  ~~~ [Front-end](https://web75-front-end-ngbduy-1.onrender.com)
### Back-end deploy:  ~~~ [Back-end](https://web75-final-test-ngbduy.onrender.com)

| Method | Route | Description | Body |
| :---: | :-----:|---|---|
 GET | / | Get all movies from the database | |
 | | /?search=[name] | query search in the url, fuzzy search supports in finding keyword nearly matching the movie's name | |
| | /sort | sorting movies, default is ascending [name]. | |
| | /sort?[query1]=[value1]&[query2]=...| query search in the url, queries are [year],[name],[time]. sorting options from 1 to 3 pairs (priority [year] > [time] > [name]) |  |
POST | / | a/ post many movies.<br /> b/ post a movie. | a/ { "movies" : [{movie1}, {movie2},...] <br/> b/ { "name", "year","time", "introduce", "image"}
