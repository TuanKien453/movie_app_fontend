import { BaseEntity } from "../shared/BaseModel.ts";
import { MovieCrew } from "./MovieCrew.ts";

export class Human extends BaseEntity {
    fullName: string;
    birthDate: Date;
    nationality?: string;

    movieCrews?: MovieCrew[];

    constructor(data: any) {
        super(data);
        this.fullName = data.fullName;
        this.birthDate = new Date(data.birthDate);
        this.nationality = data.nationality;

        this.movieCrews = data.movieCrews?.map((mc: any) => new MovieCrew(mc));
    }
}