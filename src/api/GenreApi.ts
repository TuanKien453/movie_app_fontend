import { BaseApi } from "../shared/BaseApi";
import { Genre } from "../model/Genre.ts";

export class GenreApi extends BaseApi<Genre> {
    constructor() {
        super("/api/genre");
    }
}

