import React from 'react';

const userData = [
    { name: 'Yiorgos Avraamu', registered: 'Jan 1, 2023', country: 'us', usage: 50, paymentMethod: 'mastercard', activity: '10 sec ago' },
    { name: 'Avram Tarasios', registered: 'Jan 1, 2023', country: 'br', usage: 10, paymentMethod: 'visa', activity: '5 mins ago' },
    // Thêm dữ liệu khác nếu cần
];

const UserTable: React.FC = () => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">User</th>
                <th scope="col">Country</th>
                <th scope="col">Usage</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Activity</th>
            </tr>
            </thead>
            <tbody>
            {userData.map((user, index) => (
                <tr key={index}>
                    <td>
                        <div className="d-flex align-items-center">
                            <img src={`https://i.pravatar.cc/40?u=${user.name}`} className="rounded-circle me-3" alt={user.name}/>
                            <div>
                                <div>{user.name}</div>
                                <div className="small text-muted">New | Registered: {user.registered}</div>
                            </div>
                        </div>
                    </td>
                    <td>{user.country.toUpperCase()}</td>
                    <td>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold me-2">{user.usage}%</span>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" style={{width: `${user.usage}%`}}></div>
                        </div>
                    </td>
                    <td>{user.paymentMethod}</td>
                    <td>
                        <div className="small text-muted">Last login</div>
                        <strong>{user.activity}</strong>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UserTable;