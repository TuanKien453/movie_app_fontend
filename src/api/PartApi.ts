import { BaseApi } from "../shared/BaseApi";
import { Part } from "../model/Part.ts";
import type {ODataResponse} from "../shared/ODataResponse.ts";

export class PartApi extends BaseApi<Part> {
    constructor() {
        super("/api/part");
    }
    public async getByMovieId(movieId: number | string, authRequired: boolean = true): Promise<ODataResponse<Part>> {
        // Sử dụng OData $filter để lọc theo movieId
        return this.get(`?$filter=movieId eq ${movieId}`, authRequired);
    }
}

export class partApi {
}