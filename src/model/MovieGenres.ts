import { BaseEntity } from "../shared/BaseModel.ts";
import { Movie } from "./Movie.ts";
import { Genre } from "./Genre.ts";

export class MovieGenres extends BaseEntity {
    movieId: number;
    genreId: number;

    movie?: Movie;
    genre?: Genre;

    constructor(data: any = {}) {
        super(data);
        this.movieId = data.movieId;
        this.genreId = data.genreId;

        this.movie = data.movie ? new Movie(data.movie) : undefined;
        this.genre = data.genre ? new Genre(data.genre) : undefined;
    }
}