import { BaseEntity } from "../shared/BaseModel.ts";
import { Episode } from "./Episode.ts";
import { Movie } from "./Movie.ts";

export class Part extends BaseEntity {
    movieId: number;
    partNumber: number;
    partName: string;

    episodes?: Episode[];
    movie?: Movie;

    constructor(data: any) {
        super(data);
        this.movieId = data.movieId;
        this.partNumber = data.partNumber;
        this.partName = data.partName;

        this.episodes = data.episodes?.map((e: any) => new Episode(e));
        // Khởi tạo đối tượng Movie nếu có dữ liệu
        this.movie = data.movie ? new Movie(data.movie) : undefined;
    }
}