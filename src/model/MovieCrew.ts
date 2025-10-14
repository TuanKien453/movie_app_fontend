import { BaseEntity } from "../shared/BaseModel.ts";
import { Human } from "./Human.ts";
import { Movie } from "./Movie.ts";

export class MovieCrew extends BaseEntity {
    movieId: number;
    personId: number; // Đổi tên từ personId để nhất quán với sơ đồ (FK tới Humans)
    roleName: string;
    characterName?: string;

    movie?: Movie;
    human?: Human;

    constructor(data: any) {
        super(data);
        this.movieId = data.movieId;
        this.personId = data.personId;
        this.roleName = data.roleName;
        this.characterName = data.characterName;

        this.movie = data.movie ? new Movie(data.movie) : undefined;
        this.human = data.human ? new Human(data.human) : undefined;
    }
}