import { BaseApi } from "../shared/BaseApi";
import { Human } from "../model/Human";

export class HumanApi extends BaseApi<Human> {
    constructor() {
        super("/api/human");
    }
}