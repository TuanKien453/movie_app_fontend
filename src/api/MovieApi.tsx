import {BaseApi} from "../shared/BaseApi.ts";
import type {Movie} from "../model/Movie.ts";

export class MovieApi extends BaseApi<Movie>{

    constructor() {
        super("/api/movie");
    }
}