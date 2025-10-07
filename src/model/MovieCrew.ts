import { BaseEntity } from "../shared/BaseModel.ts";
import { Human } from "./Human.ts";

export class MovieCrew extends BaseEntity {
    movieId: number;
    personId: number;
    roleName: string;
    characterName?: string;
    human?: Human;

    constructor(data: any) {
        super(data);
        this.movieId = data.movieId;
        this.personId = data.personId;
        this.roleName = data.roleName;
        this.characterName = data.characterName;
        this.human = data.human ? new Human(data.human) : undefined;
    }
}
