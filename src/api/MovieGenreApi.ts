import { BaseApi } from "../shared/BaseApi";
import { MovieGenres } from "../model/MovieGenres.ts";

export class MovieGenreApi extends BaseApi<MovieGenres> {
    constructor() {
        super("/api/movieGenre");
    }
}