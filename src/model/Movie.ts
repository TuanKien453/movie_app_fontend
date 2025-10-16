import { BaseEntity } from "../shared/BaseModel.ts";
import { Part } from "./Part.ts";
import { MovieCrew } from "./MovieCrew.ts";
import { MovieGenres } from "./MovieGenres.ts";

export class Movie extends BaseEntity {
    title: string;
    description?: string;
    releaseDate: Date;
    duration: number; // in minutes
    country?: string;
    posterUrl?: string;
    trailerUrl?: string;

    parts?: Part[];
    movieCrews?: MovieCrew[];
    movieGenres?: MovieGenres[];

    constructor(data: any) {
        super(data);
        this.title = data.title;
        this.description = data.description;
        this.releaseDate = new Date(data.releaseDate);
        this.duration = data.duration;
        this.country = data.country;
        this.posterUrl = data.posterUrl;
        this.trailerUrl = data.trailerUrl;

        this.parts = data.parts?.map((p: any) => new Part(p));
        this.movieCrews = data.movieCrews?.map((mc: any) => new MovieCrew(mc));
        this.movieGenres = data.movieGenres?.map((mg: any) => new MovieGenres(mg));
    }
}