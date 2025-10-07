export class BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
        this.isDeleted = data.isDeleted;
    }
}