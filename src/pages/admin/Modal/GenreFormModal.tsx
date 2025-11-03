import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { Genre } from '../../../model/Genre.ts'; // Đảm bảo đường dẫn đúng

interface GenreFormModalProps {
    show: boolean;
    onHide: () => void;
    onSave: (genre: Genre) => void;
    genreToEdit: Genre | null;
}

const GenreFormModal: React.FC<GenreFormModalProps> = ({ show, onHide, onSave, genreToEdit }) => {
    // State chỉ cần quản lý 'name'
    const [name, setName] = useState('');

    // Load dữ liệu vào form khi `genreToEdit` thay đổi (chế độ Edit)
    useEffect(() => {
        if (genreToEdit) {
            setName(genreToEdit.name || '');
        } else {
            // Reset form khi là chế độ "Add new"
            setName('');
        }
    }, [genreToEdit, show]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Tạo object genre mới hoặc cập nhật
        // Giữ lại 'id' và các trường khác nếu đang edit
        const genreData: Partial<Genre> = {
            ...genreToEdit,
            name: name
        };

        onSave(genreData as Genre);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{genreToEdit ? 'Edit Genre' : 'Add New Genre'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGenreName">
                        <Form.Label>Genre Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoFocus // Tự động focus vào trường này khi modal mở
                        />
                    </Form.Group>

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

export default GenreFormModal;