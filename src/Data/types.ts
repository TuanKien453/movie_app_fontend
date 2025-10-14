export interface Movie {
    id: number;
    poster: string;
    name: string;
    category: string;
    releaseYear: number;
    featured: boolean;
    visible: boolean;
    urlType: 'EMBED' | 'URL' | 'YOUTUBE';
    views: number;
}
