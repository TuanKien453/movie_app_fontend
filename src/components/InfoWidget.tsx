import React from 'react';

interface InfoWidgetProps {
    title: string;
    value: string;
    style?: React.CSSProperties;
}

const InfoWidget: React.FC<InfoWidgetProps> = ({ title, value, style }) => {
    return (
        <div className="card text-white h-100" style={style}>
            <div className="card-body">
                <div className="text-muted text-uppercase small">{title}</div>
                <div className="fs-4 fw-bold mt-1">{value}</div>
            </div>
        </div>
    );
};

export default InfoWidget;