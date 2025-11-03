import React, { useState, useEffect, useCallback } from 'react';
// 1. Import thêm các component cần thiết
import { Button, Spinner, Alert } from 'react-bootstrap';
import { HumanApi } from '../../api/HumanApi.ts'; // ✅ Giả định bạn đã tạo file này
import type { Human } from '../../model/Human.ts'; // ✅ Giả định bạn đã tạo model này
import HumanFormModal from '../../pages/admin/Modal/HumanFormModal.tsx'; // ✅ Giả định bạn đã tạo modal này

// 2. Khởi tạo API
const humanApi = new HumanApi();

const HumanPage: React.FC = () => {
    // 3. Thêm State giống như MoviePage
    const [humans, setHumans] = useState<Human[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [humanToEdit, setHumanToEdit] = useState<Human | null>(null);

    // 4. Hàm tải dữ liệu từ API
    const fetchHumans = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const response = await humanApi.get(); // Dùng HumanApi
            setHumans(response.value);
        } catch (err: any) {
            console.error('Fetch error:', err);
            setError(err.message || 'Failed to fetch humans.');
        } finally {
            setLoading(false);
        }
    }, []);

    // 5. Gọi API khi component render
    useEffect(() => {
        fetchHumans();
    }, [fetchHumans]);

    // 6. Các hàm xử lý Modal
    const handleOpenAddModal = () => {
        setHumanToEdit(null);
        setShowModal(true);
    };

    const handleOpenEditModal = (human: Human) => {
        setHumanToEdit(human);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // 7. Các hàm xử lý CRUD (Save, Delete)
    const handleSaveHuman = async (human: Human) => {
        setError(null);
        setSuccessMessage(null);
        try {
            if (human.id) {
                await humanApi.update(human);
                setSuccessMessage("Human updated successfully!");
            } else {
                await humanApi.create(human);
                setSuccessMessage("Human created successfully!");
            }
            handleCloseModal();
            fetchHumans(); // Tải lại danh sách
        } catch (err: any) {
            console.error('Failed to save human:', err);
            setError(err.message || 'Could not save the human.');
        }
    };

    const handleDeleteHuman = async (id: string) => { // Giả sử ID là string
        if (window.confirm('Are you sure you want to delete this person?')) {
            setError(null);
            setSuccessMessage(null);
            try {
                await humanApi.delete(id);
                setSuccessMessage("Human deleted successfully!");
                fetchHumans(); // Tải lại danh sách
            } catch (err: unknown) {
                console.error('Failed to delete human:', err);
                if (typeof err === 'object' && err !== null && 'message' in err) {
                    const apiError = err as { message: string };
                    setError(apiError.message);
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Could not delete the human.');
                }
            }
        }
    };

    // 8. Render UI (Loading, Nút bấm, Bảng)
    if (loading) {
        return <div className="text-center"><Spinner animation="border" variant="light" /></div>;
    }

    return (
        <div>
            {/* Nút Add New */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white">Human Management</h2>
                <Button variant="primary" onClick={handleOpenAddModal}>
                    <i className="bi bi-plus-circle me-2"></i> Add New Human
                </Button>
            </div>

            {/* Thông báo Thành công và Lỗi */}
            {successMessage && (
                <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
                    {successMessage}
                </Alert>
            )}
            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}

            {/* Bảng dữ liệu */}
            <div className="card text-white bg-secondary">
                <div className="card-body">
                    <table className="table table-hover table-dark"> {/* Dùng table-dark cho đẹp hơn */}
                        <thead>
                        <tr>
                            <th scope="col">Full Name</th>
                            <th scope="col">Birth Date</th>
                            <th scope="col">Nationality</th>
                            <th scope="col" style={{ width: '150px' }}>Actions</th> {/* Thêm cột Actions */}
                        </tr>
                        </thead>
                        <tbody>
                        {/* Dùng state 'humans' thay vì 'mockHumans' */}
                        {humans.map((human) => (
                            <tr key={human.id}>
                                <td>{human.fullName}</td>
                                <td>{human.birthDate ? new Date(human.birthDate).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                <td>{human.nationality}</td>
                                <td>
                                    {/* Thêm nút Edit/Delete */}
                                    <Button variant="outline-light" size="sm" className="me-2" onClick={() => handleOpenEditModal(human)}>
                                        <i className="bi bi-pencil-fill"></i>
                                        Edit
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteHuman(String(human.id))}>
                                        <i className="bi bi-trash-fill"></i>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 9. Render Modal */}
            <HumanFormModal
                show={showModal}
                onHide={handleCloseModal}
                onSave={handleSaveHuman}
                humanToEdit={humanToEdit}
            />
        </div>
    );
};

export default HumanPage;