import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Episode } from "../../../model/Episode.ts";
import TusUpload from "../../../components/TusUpload.tsx";



interface EpisodeFormModalProps {
    show: boolean;
    onHide: () => void;
    onSave: (episode: Episode) => Promise<void>;
    episodeToEdit: Episode | null;
}

export const EpisodeFormModal: React.FC<EpisodeFormModalProps> = ({
                                                                      show, onHide, onSave, episodeToEdit
                                                                  }) => {
    const [formData, setFormData] = useState<Episode>(new Episode({ title: "", episodeNumber: 1, duration: 0, partId: 0, videoSource: "" }));
    const [validated, setValidated] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (episodeToEdit) {
            setFormData(new Episode(episodeToEdit));
        } else {
            // Dữ liệu mặc định cho Episode mới
            setFormData(new Episode({ title: "", episodeNumber: 1, duration: 0, partId: 0, videoSource: "" }));
        }
        setValidated(false);
    }, [episodeToEdit, show]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ["episodeNumber", "duration"].includes(name) ? parseInt(value || "0", 10) : value,
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
    const handleUploadComplete = (videoUrl: string) => {
        console.log("Upload xong, cập nhật state với URL:", videoUrl);
        // Cập nhật 'formData' state với URL video mới
        setFormData(prevData => ({
            ...prevData,
            videoSource: videoUrl // Gán URL vào videoSource
        }));
    };
    return (
        <Modal show={show} onHide={onHide} centered size={episodeToEdit ? "lg" : undefined}> {/* Tùy chọn: Tăng kích thước modal khi edit */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dark">
                        {episodeToEdit ? "Edit Episode" : "Add New Episode"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Col} md="12" controlId="title" className="mb-3">
                        <Form.Label>Episode Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="title"
                            placeholder="Enter episode title"
                            value={formData.title || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row>
                        <Form.Group as={Col} md="6" controlId="episodeNumber" className="mb-3">
                            <Form.Label>Episode Number</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="episodeNumber"
                                min={1}
                                value={formData.episodeNumber || 1}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="duration" className="mb-3">
                            <Form.Label>Duration (minutes)</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="duration"
                                min={0}
                                value={formData.duration || 0}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    {episodeToEdit && (
                        <>
                            <hr />
                            <Form.Group as={Col} md="12" controlId="videoUpload" className="mb-3">
                                <Form.Label>Upload Video File</Form.Label>

                                {/* --- 2. THÊM PHẦN NÀY ĐỂ HIỂN THỊ URL HIỆN TẠI --- */}
                                {formData.videoSource ? (
                                    <p className="text-success small fst-italic mb-2">
                                        File hiện tại (URL): <strong>{formData.videoSource}</strong>
                                    </p>
                                ) : (
                                    <p className="text-muted small fst-italic mb-2">
                                        Chưa có video.
                                    </p>
                                )}
                                {/* --- KẾT THÚC PHẦN THÊM MỚI --- */}

                                <p className="text-muted small">
                                    Upload video mới cho tập: {episodeToEdit.title} (ID: {episodeToEdit.id})
                                </p>

                                {/* --- 3. SỬA DÒNG NÀY ĐỂ THÊM onUploadSuccess --- */}
                                <TusUpload
                                    forEpisodeId={String(episodeToEdit.id)}
                                    onUploadSuccess={handleUploadComplete}
                                />
                                {/* --- KẾT THÚC SỬA --- */}

                            </Form.Group>
                        </>
                    )}

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