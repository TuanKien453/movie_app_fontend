// HumanFormModal.tsx

import React, { useState, useEffect } from 'react';
// Import các component của react-bootstrap
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
// Import model Human (giả định đường dẫn)
import type { Human } from '../../../model/Human.ts';

// Khai báo Props
interface HumanFormModalProps {
    show: boolean;
    onHide: () => void;
    onSave: (human: Human) => void;
    humanToEdit: Human | null;
}

// Component
const HumanFormModal: React.FC<HumanFormModalProps> = ({ show, onHide, onSave, humanToEdit }) => {

    // ✅ SỬA 1: Dùng useState riêng lẻ cho từng trường
    // Giống như 'name' trong GenreFormModal
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState(''); // Vẫn là string 'YYYY-MM-DD'
    const [nationality, setNationality] = useState('');

    // ✅ SỬA 2: useEffect để điền dữ liệu vào các state riêng lẻ
    useEffect(() => {
        if (humanToEdit && show) {
            // Chuyển đổi 'Date' (từ model) sang 'string' (cho input)
            const formattedDate = humanToEdit.birthDate
                ? new Date(humanToEdit.birthDate).toISOString().split('T')[0]
                : '';

            // Set từng state
            setFullName(humanToEdit.fullName || '');
            setBirthDate(formattedDate);
            setNationality(humanToEdit.nationality || '');

        } else if (!humanToEdit && show) {
            // Reset từng state khi "Add New"
            setFullName('');
            setBirthDate('');
            setNationality('');
        }
    }, [humanToEdit, show]); // Phụ thuộc vào 'humanToEdit' và 'show'


    // (Không cần hàm 'handleChange' chung nữa)

    // ✅ SỬA 3: Hàm 'handleSubmit'
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Tạo đối tượng 'Human' từ các state riêng lẻ
        const humanToSave = {
            // Lấy 'id' từ 'humanToEdit' (nếu đang edit)
            id: humanToEdit ? humanToEdit.id : undefined,
            fullName: fullName,
            birthDate: birthDate ? new Date(birthDate) : null, // Chuyển string -> Date
            nationality: nationality,
        };

        // Gửi đối tượng 'Human' hợp lệ ra bên ngoài
        onSave(humanToSave as Human);
    };

    // ✅ SỬA 4: Cập nhật 'value' và 'onChange' trong Form
    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{humanToEdit ? 'Edit Human' : 'Add New Human'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Hàng 1: Full Name */}
                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={fullName} // Dùng state 'fullName'
                            onChange={(e) => setFullName(e.target.value)} // Cập nhật state 'fullName'
                            required
                        />
                    </Form.Group>

                    {/* Hàng 2: Birth Date & Nationality */}
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formBirthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="birthDate"
                                value={birthDate} // Dùng state 'birthDate'
                                onChange={(e) => setBirthDate(e.target.value)} // Cập nhật state 'birthDate'
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formNationality">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control
                                type="text"
                                name="nationality"
                                value={nationality} // Dùng state 'nationality'
                                onChange={(e) => setNationality(e.target.value)} // Cập nhật state 'nationality'
                            />
                        </Form.Group>
                    </Row>

                    {/* Nút bấm */}
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default HumanFormModal;