import React from 'react';
import { mockMovies } from '../../Data/mockData.ts'; // Import mảng phim

const MoviePage: React.FC = () => {
    return (
        <div>
            <h2 className="text-white mb-4">Movie Management</h2>

            <div className="row g-4">
                {mockMovies.map(movie => ( // Duyệt qua mảng mockMovies
                    <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6">
                        <div className="card text-white bg-secondary h-100">
                            <img
                                src={movie.posterUrl}
                                className="card-img-top"
                                alt={movie.title}
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text text-muted small">
                                    {movie.description?.substring(0, 80)}...
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviePage;