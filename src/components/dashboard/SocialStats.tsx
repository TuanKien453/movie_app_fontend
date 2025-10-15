import React from 'react';
import { Google, Facebook, Twitter, Linkedin } from 'react-bootstrap-icons';

const socialData = [
    { name: 'Organic Search', value: 191235, percentage: 56, icon: <Google size={24} className="me-3" />, color: "success" },
    { name: 'Facebook', value: 51223, percentage: 15, icon: <Facebook size={24} className="me-3" />, color: "primary" },
    { name: 'Twitter', value: 37564, percentage: 11, icon: <Twitter size={24} className="me-3" />, color: "info" },
    { name: 'LinkedIn', value: 27319, percentage: 8, icon: <Linkedin size={24} className="me-3" />, color: "primary" },
]

const SocialStats: React.FC = () => {
    return (
        <div>
            {socialData.map(item => (
                <div key={item.name} className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                        {item.icon}
                        <div className="flex-grow-1">
                            <div>{item.name}</div>
                        </div>
                        <div className="text-end">
                            <strong>{item.value.toLocaleString()}</strong>
                            <span className="text-muted ms-2">({item.percentage}%)</span>
                        </div>
                    </div>
                    <div className="progress">
                        <div
                            className={`progress-bar bg-${item.color}`}
                            role="progressbar"
                            style={{ width: `${item.percentage}%` }}
                            aria-valuenow={item.percentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SocialStats;