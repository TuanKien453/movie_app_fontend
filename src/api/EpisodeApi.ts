import { BaseApi } from "../shared/BaseApi";
import { Episode } from "../model/Episode.ts";

export class EpisodeApi extends BaseApi<Episode> {
    constructor() {
        super("/api/Episode");
    }
}

