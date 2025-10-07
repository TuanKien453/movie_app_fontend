import { BaseEntity } from "../shared/BaseModel.ts";

export class Genre extends BaseEntity {
    name: string;

    constructor(data: any) {
        super(data);
        this.name = data.name;
    }
}
