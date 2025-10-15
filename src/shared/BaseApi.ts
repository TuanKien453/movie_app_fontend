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
        authRequired: boolean = false,
        count: boolean = false,
        filter?: string,
        select?: string,
        expand?: string
    ): Promise<ODataResponse<T>> {

        const params: string[] = []

        if (count) params.push(`$count=true`)
        if (filter) params.push(`$filter=${encodeURIComponent(filter)}`)
        if (select) params.push(`$select=${encodeURIComponent(select)}`)
        if (expand) params.push(`$expand=${encodeURIComponent(expand)}`)

        const query = params.length > 0 ? `?${params.join("&")}` : ""
        const url = `${this.apiUrl}${query}`

        const data = await apiCall(url, 'GET', null, authRequired)

        if (!data || !Array.isArray(data.value))
            throw new Error("Invalid OData response")

        return data as ODataResponse<T>
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
            await apiCall(`${this.apiUrl}/${entity.id}/update`, 'PUT', entity, authRequired)
            return true
        } catch {
            return false
        }
    }

    async delete(id: string, authRequired: boolean = false): Promise<boolean> {
        try {
            await apiCall(`${this.apiUrl}/${id}/remove`, 'DELETE', null, authRequired)
            return true
        } catch {
            return false
        }
    }
}
