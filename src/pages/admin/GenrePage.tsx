import React from 'react';
// Import mảng dữ liệu thể loại
import { mockGenres } from '../../Data/mockData.ts';

const GenrePage: React.FC = () => {
    return (
        <div>
            <h2 className="text-white mb-4">Genre Management</h2>

            <div className="card text-white bg-secondary">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mockGenres.map((genre, index) => (
                            <tr key={genre.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{genre.name}</td>
                                <td>{new Date(genre.createdAt!).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GenrePage;