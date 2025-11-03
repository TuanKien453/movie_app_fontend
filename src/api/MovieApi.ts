import {apiCall} from "../utils/ApiUtil"
import { BaseApi } from "../shared/BaseApi.ts";
import type { Movie } from "../model/Movie.ts";

export class MovieApi extends BaseApi<Movie>{

    constructor() {
        super("/api/Movie");
    }
    // Thêm hàm này vào trong class MovieApi của bạn (file MovieApi.ts)

    public async addPoster(movieId: string | number, file: File): Promise<any> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("forMovieId", String(movieId));

        try {
            const response = await apiCall(
                `${this.apiUrl}/AddPoster`, // Endpoint (ví dụ: /api/Movie/AddPoster)
                "POST",
                formData,   // Body
                true,       // isFormData = true
                () => {},   // onProgress
                true        // useAuth = true
            );
            return response; // Thường chỉ là Ok()
        } catch (err) {
            console.error("Upload poster failed:", err);
            throw err;
        }
    }

}