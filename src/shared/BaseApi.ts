import {BaseEntity} from "../shared/BaseModel";
import {apiCall} from "../utils/ApiUtil"
import type {ODataResponse} from "./ODataResponse.ts";

const API_DOMAIN = import.meta.env.VITE_BASE_API_ENDPOINT;
export abstract class BaseApi<T extends BaseEntity> {
    protected readonly apiUrl: string;


    protected constructor(endpoint: string) {
        this.apiUrl = `${API_DOMAIN}${endpoint}`;
    }


    async get(
        query: string = "",
        authRequired: boolean = false
    ): Promise<ODataResponse<T>> {
        const url = `${this.apiUrl}${query.startsWith("?") ? query : "?" + query}`;
        const data = await apiCall(url, "GET", null, authRequired);

        if (!data || !Array.isArray(data.value))
            throw new Error("Invalid OData response");

        return data as ODataResponse<T>;
    }

    async getById(id: string, authRequired: boolean = false): Promise<T | null> {

        const data = await apiCall(`${this.apiUrl}/${id}`, 'GET', null, authRequired);

        return data as T;
    }

    async create(entity: T, authRequired: boolean = false): Promise<boolean> {
        try {
            await apiCall(this.apiUrl, 'POST', entity, authRequired)
            return true
        } catch {
            return false
        }
    }

    async update(entity: T, authRequired: boolean = false): Promise<boolean> {
        try {
            await apiCall(`${this.apiUrl}/${entity.id}`, 'PUT', entity, authRequired)
            return true
        } catch {
            return false
        }
    }

    async delete(id: string, authRequired: boolean = false): Promise<boolean> {
        try {
            await apiCall(`${this.apiUrl}/${id}`, 'DELETE', null, authRequired)
            return true
        } catch {
            return false
        }
    }
}
