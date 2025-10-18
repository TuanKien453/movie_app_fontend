import { BaseApi } from "../shared/BaseApi";
import { Part } from "../model/Part.ts";

export class PartApi extends BaseApi<Part> {
    constructor() {
        super("/api/part");
    }
}