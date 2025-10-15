import React from 'react';
import { mockHumans } from '../../Data/mockData.ts';

const HumanPage: React.FC = () => {
    return (
        <div>
            <h2 className="text-white mb-4">Human Management</h2>

            <div className="card text-white bg-secondary">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Full Name</th>
                            <th scope="col">Birth Date</th>
                            <th scope="col">Nationality</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mockHumans.map((human) => (
                            <tr key={human.id}>
                                <td>{human.fullName}</td>
                                <td>{new Date(human.birthDate!).toLocaleDateString()}</td>
                                <td>{human.nationality}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HumanPage;