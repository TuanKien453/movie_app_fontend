import { BaseEntity } from "../shared/BaseModel.ts";

export class Human extends BaseEntity {
    fullName: string;
    birthDate: Date;
    nationality?: string;

    constructor(data: any) {
        super(data);
        this.fullName = data.fullName;
        this.birthDate = new Date(data.birthDate);
        this.nationality = data.nationality;
    }
}
