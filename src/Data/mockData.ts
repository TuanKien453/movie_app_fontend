import { Movie } from "../model/Movie";
import { Human } from "../model/Human";
import { Genre } from "../model/Genre";
import { Part } from "../model/Part";
import { Episode } from "../model/Episode";
import { MovieCrew } from "../model/MovieCrew";
import { MovieGenres } from "../model/MovieGenres";

// Dữ liệu gốc cho các thực thể riêng lẻ
export const mockHumans: Human[] = [
    new Human({
        id: 101,
        fullName: 'Lana Wachowski',
        birthDate: '1965-06-21',
        nationality: 'American',
        createdAt: new Date(),
        updatedAt: new Date(),
    }),
    new Human({
        id: 102,
        fullName: 'Keanu Reeves',
        birthDate: '1964-09-02',
        nationality: 'Canadian',
        createdAt: new Date(),
        updatedAt: new Date(),
    }),
    new Human({
        id: 103,
        fullName: 'Laurence Fishburne',
        birthDate: '1961-07-30',
        nationality: 'American',
        createdAt: new Date(),
        updatedAt: new Date(),
    })
];

export const mockGenres: Genre[] = [
    new Genre({
        id: 1,
        name: 'Science Fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
    }),
    new Genre({
        id: 2,
        name: 'Action',
        createdAt: new Date(),
        updatedAt: new Date(),
    })
];


// Dữ liệu hoàn chỉnh cho một bộ phim, bao gồm các quan hệ
const theMatrixMovie = new Movie({ // Đổi tên biến để tránh trùng lặp khi export mảng
    id: 10,
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    releaseDate: '1999-03-31',
    duration: 136, // 136 minutes
    country: 'USA',
    ageRating: 'R',
    posterUrl: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
    createdAt: new Date('2023-01-10T10:00:00Z'),
    updatedAt: new Date('2023-01-10T10:00:00Z'),

    // --- Dữ liệu quan hệ lồng nhau ---

    // 1. Parts và Episodes (One-to-Many)
    parts: [
        new Part({ // Sử dụng constructor của Part
            id: 201,
            movieId: 10,
            partNumber: 1,
            partName: 'The Matrix Trilogy: Part 1',
            createdAt: new Date('2023-01-10T10:01:00Z'),
            updatedAt: new Date('2023-01-10T10:01:00Z'),
            episodes: [
                new Episode({ // Sử dụng constructor của Episode
                    id: 301,
                    partId: 201,
                    episodeNumber: 1,
                    title: 'The Matrix',
                    duration: 8160, // 136 minutes in seconds
                    videoUrl: '/videos/matrix_part1.mp4',
                    createdAt: new Date('2023-01-10T10:02:00Z'),
                    updatedAt: new Date('2023-01-10T10:02:00Z'),
                })
            ]
        })
    ],

    // 2. MovieGenres (Many-to-Many)
    movieGenres: [
        new MovieGenres({ // Sử dụng constructor của MovieGenres
            id: 401,
            movieId: 10,
            genreId: 1,
            genre: mockGenres.find(g => g.id === 1) // Dữ liệu tham chiếu đến Genre
        }),
        new MovieGenres({
            id: 402,
            movieId: 10,
            genreId: 2,
            genre: mockGenres.find(g => g.id === 2)
        })
    ],

    // 3. MovieCrews (Many-to-Many)
    movieCrews: [
        new MovieCrew({ // Sử dụng constructor của MovieCrew
            id: 501,
            movieId: 10,
            personId: 101, // Lana Wachowski
            roleName: 'Director',
            characterName: null,
            human: mockHumans.find(h => h.id === 101)
        }),
        new MovieCrew({
            id: 502,
            movieId: 10,
            personId: 102, // Keanu Reeves
            roleName: 'Actor',
            characterName: 'Neo',
            human: mockHumans.find(h => h.id === 102)
        }),
        new MovieCrew({
            id: 503,
            movieId: 10,
            personId: 103, // Laurence Fishburne
            roleName: 'Actor',
            characterName: 'Morpheus',
            human: mockHumans.find(h => h.id === 103)
        })
    ]
});

// Thêm một phim khác để có danh sách
const anotherMockMovie = new Movie({
    id: 11,
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology. He creates a world where anything is possible.',
    releaseDate: '2010-07-16',
    duration: 148,
    country: 'USA',
    ageRating: 'PG-13',
    posterUrl: 'https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    createdAt: new Date('2023-02-01T11:00:00Z'),
    updatedAt: new Date('2023-02-01T11:00:00Z'),
    // Bạn có thể thêm parts, movieGenres, movieCrews tương tự như The Matrix
});

// Export một mảng các bộ phim
export const mockMovies: Movie[] = [theMatrixMovie, anotherMockMovie];