import { BaseEntity } from "../shared/BaseModel.ts";
import { MovieGenres } from "./MovieGenres.ts";

export class Genre extends BaseEntity {
    name: string;

    movieGenres?: MovieGenres[];

    constructor(data: any) {
        super(data);
        this.name = data.name;
        this.movieGenres = data.movieGenres?.map((mg: any) => new MovieGenres(mg));
    }
}