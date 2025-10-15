import React, {useEffect} from 'react';
import InfoWidget from '../../components/dashboard/InfoWidget';
import TrafficChart from '../../components/dashboard/TrafficChart.tsx';
import SocialStats from '../../components/dashboard/SocialStats';
import UserTable from '../../components/dashboard/UserTable';
import {useLogin} from "../../context/LoginContext.tsx";
import InfoWidget from '../../components/dashboard/InfoWidget.tsx';
import TrafficChart from "../../components/TrafficChart.tsx";
import SocialStats from "../../components/dashboard/SocialStats.tsx";
import UserTable from "../../components/dashboard/UserTable.tsx";
import {useLogin} from "../../context/LoginContext.tsx";


const Dashboard: React.FC = () => {

    const {isLoggedIn} = useLogin();

    useEffect(() => {
        if (isLoggedIn==false) {
            window.location.href = '/login';
        }
    }, [isLoggedIn]);


    return (
        <>
            <div className="row g-4 mb-4">
                <div className="col-sm-6 col-lg-3">
                    <InfoWidget title="New Clients" value="9.123" />
                </div>
                <div className="col-sm-6 col-lg-3">
                    <InfoWidget title="Recurring Clients" value="22.643" />
                </div>
                <div className="col-sm-6 col-lg-3">
                    <InfoWidget title="Pageviews" value="78.623" />
                </div>
                <div className="col-sm-6 col-lg-3">
                    <InfoWidget title="Organic" value="49.123" />
                </div>
            </div>

            <div className="card text-white mb-4">
                <div className="card-body">
                    <h5 className="card-title">Traffic & Sales</h5>
                    <TrafficChart />
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    {/* Component này có thể tạo riêng, nhưng để đơn giản ta đặt ở đây */}
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between">
                                    <span>Male</span>
                                    <span>43%</span>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-warning" role="progressbar" style={{width: '43%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between">
                                    <span>Female</span>
                                    <span>37%</span>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-warning" role="progressbar" style={{width: '37%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card h-100">
                        <div className="card-body">
                            <SocialStats />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card text-white">
                <div className="card-body">
                    <UserTable />
                </div>
            </div>
        </>
    );
};

export default Dashboard;