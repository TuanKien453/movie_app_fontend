import { BaseEntity } from "../shared/BaseModel.ts";

export class Movie extends BaseEntity {
    userId: number;
    title: string;
    description?: string;
    releaseDate: Date;
    duration: number;
    language?: string;
    country?: string;
    ageRating?: string;
    posterUrl?: string;
    trailerUrl?: string;

    constructor(data: any) {
        super(data);
        this.userId = data.userId;
        this.title = data.title;
        this.description = data.description;
        this.releaseDate = new Date(data.releaseDate);
        this.duration = data.duration;
        this.language = data.language;
        this.country = data.country;
        this.ageRating = data.ageRating;
        this.posterUrl = data.posterUrl;
        this.trailerUrl = data.trailerUrl;
    }
}
