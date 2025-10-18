import { BaseApi } from "../shared/BaseApi";
import { MovieCrew } from "../model/MovieCrew.ts";

export class MovieCrewApi extends BaseApi<MovieCrew> {
    constructor() {
        super("/api/movieCrew");
    }
}