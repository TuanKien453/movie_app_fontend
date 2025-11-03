import { BaseApi } from "../shared/BaseApi";
import { Episode } from "../model/Episode.ts";
import type {ODataResponse} from "../shared/ODataResponse.ts";

export class EpisodeApi extends BaseApi<Episode> {
    constructor() {
        super("/api/Episode");
    }
    public async getByPartId(partId: number | string, authRequired: boolean = true): Promise<ODataResponse<Episode>> {
        // Sử dụng OData $filter để lọc theo partId
        return this.get(`?$filter=partId eq ${partId}`, authRequired);
    }

}

