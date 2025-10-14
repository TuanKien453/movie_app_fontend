import { BaseEntity } from "../shared/BaseModel.ts";
import { Part } from "./Part.ts";

export class Episode extends BaseEntity {
    partId: number;
    episodeNumber: number;
    title: string;
    duration: number; // in seconds
    videoUrl: string;

    part?: Part;

    constructor(data: any) {
        super(data);
        this.partId = data.partId;
        this.episodeNumber = data.episodeNumber;
        this.title = data.title;
        this.duration = data.duration;
        this.videoUrl = data.videoUrl;

        this.part = data.part ? new Part(data.part) : undefined;
    }
}