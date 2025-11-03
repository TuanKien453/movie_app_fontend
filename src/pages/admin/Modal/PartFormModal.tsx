import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { Part } from "../../../model/Part.ts";

interface PartFormModalProps {
    show: boolean;
    onHide: () => void;
    onSave: (part: Part) => Promise<void>;
    partToEdit: Part | null;
}

export const PartFormModal: React.FC<PartFormModalProps> = ({
                                                                show, onHide, onSave, partToEdit
                                                            }) => {
    // Khởi tạo rỗng (sẽ được gán trong useEffect)
    const [formData, setFormData] = useState<Part>(new Part({ partName: "", partNumber: 1 }));
    const [validated, setValidated] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (partToEdit) {
            setFormData(new Part(partToEdit));
        } else {
            // Dữ liệu mặc định cho Part mới
            setFormData(new Part({ partName: "", partNumber: 1, movieId: 0 }));
        }
        setValidated(false);
    }, [partToEdit, show]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "partNumber" ? parseInt(value || "1", 10) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        if (!form.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        try {
            setSaving(true);
            await onSave(formData);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dark">
                        {partToEdit ? "Edit Part" : "Add New Part"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Col} md="12" controlId="partName" className="mb-3">
                        <Form.Label>Part Name (e.g., "Season 1")</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="partName"
                            placeholder="Enter part name"
                            value={formData.partName || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="partNumber">
                        <Form.Label>Part Number</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            name="partNumber"
                            min={1}
                            value={formData.partNumber || 1}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={saving}>Cancel</Button>
                    <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

