// Tệp: src/api/GenreApi.ts

import { BaseApi } from "../shared/BaseApi.ts";
import type { Genre } from "../model/Genre.ts";
// import { apiCall } from "../utils/ApiUtil.ts";

export class GenreApi extends BaseApi<Genre>{

    constructor() {
        super("/api/Genre");
    }

    async getAll(authRequired: boolean = false): Promise<Genre[]> {
        try {
            // Gọi hàm get() của BaseApi (mặc định query là rỗng)
            const response = await this.get("", authRequired);

            // Chỉ trả về mảng 'value'
            return response.value || [];
        } catch (err) {
            console.error("Failed to get all genres:", err);
            return [];
        }
    }

}