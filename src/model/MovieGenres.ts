import { BaseEntity } from "../shared/BaseModel.ts";

export class MovieGenres extends BaseEntity {
    movieId: number;
    genreId: number;

    constructor(data: any = {}) {
        super(data);
        this.movieId = data.movieId;
        this.genreId = data.genreId;
    }
}