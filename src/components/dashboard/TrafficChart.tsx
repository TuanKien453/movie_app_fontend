import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TrafficChart: React.FC = () => {
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Traffic',
                data: [1200, 1900, 1500, 2100, 1800, 2200, 1700],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Sales',
                data: [800, 1200, 900, 1500, 1300, 1600, 1100],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                },
                ticks: {
                    color: '#c8c8c8',
                },
            },
            y: {
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                },
                ticks: {
                    color: '#c8c8c8',
                },
            },
        },
    };

    return <div style={{ height: '300px' }}><Bar data={data} options={options} /></div>;
};

export default TrafficChart;