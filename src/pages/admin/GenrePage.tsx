import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Spinner, Alert, Table } from 'react-bootstrap';
import { Genre } from '../../model/Genre'; // Sửa lại đường dẫn nếu cần
import { GenreApi } from '../../api/GenreApi'; // Sửa lại đường dẫn nếu cần
import GenreFormModal from './Modal/GenreFormModal.tsx'; // Import modal mới

const genreApi = new GenreApi();

const GenrePage: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State cho modal
    const [showModal, setShowModal] = useState<boolean>(false);
    const [genreToEdit, setGenreToEdit] = useState<Genre | null>(null);

    // Dùng useCallback để hàm fetchGenres không bị tạo lại
    const fetchGenres = useCallback(async () => {
        setLoading(true);
        setError(null); // Xóa lỗi cũ trước khi fetch
        try {
            const response = await genreApi.get();
            if (response && response.value) {
                // Giữ logic cũ của bạn nếu class Genre có constructor đặc biệt
                const genreInstances = response.value.map(data => new Genre(data));
                setGenres(genreInstances);
            } else {
                setGenres([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra.');
        } finally {
            setLoading(false);
        }
    }, []); // Mảng rỗng đảm bảo hàm này chỉ được tạo 1 lần

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]); // Giờ đây fetchGenres là một dependency ổn định

    // ---- Các hàm xử lý CRUD ----

    const handleOpenAddModal = () => {
        setGenreToEdit(null);
        setShowModal(true);
    };

    const handleOpenEditModal = (genre: Genre) => {
        setGenreToEdit(genre);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveGenre = async (genre: Genre) => {
        try {
            if (genre.id) {
                // Update
                await genreApi.update(genre);
            } else {
                // Create
                await genreApi.create(genre);
            }
            handleCloseModal();
            await fetchGenres(); // Tải lại danh sách sau khi lưu
        } catch (err) {
            console.error('Failed to save genre:', err);
            setError('Could not save the genre.');
        }
    };

    const handleDeleteGenre = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this genre?')) {

            // Xóa lỗi cũ trước khi thực hiện hành động mới
            setError(null);

            try {
                await genreApi.delete(id);
                // Nếu thành công, tải lại danh sách
                await fetchGenres();
            } catch (err: unknown) {
                // In lỗi ra console để debug
                console.error('Failed to delete genre:', err);

                // Xử lý lỗi từ API (như trong ảnh của bạn)
                if (typeof err === 'object' && err !== null && 'message' in err) {
                    // Ép kiểu `err` về object có chứa message
                    const apiError = err as { message: string };

                    // Hiển thị thông báo lỗi từ backend
                    setError(apiError.message);

                } else if (err instanceof Error) {
                    // Xử lý các lỗi mạng hoặc lỗi chung khác
                    setError(err.message);

                } else {
                    // Lỗi không xác định
                    setError('Could not delete the genre. An unknown error occurred.');
                }
            }
        }
    };

    // ---- Render UI ----

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <Spinner animation="border" variant="light" />
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white">Genre Management</h2>
                <Button variant="primary" onClick={handleOpenAddModal}>
                    <i className="bi bi-plus-circle me-2"></i> Add New Genre
                </Button>
            </div>

            {/* Hiển thị lỗi nếu có */}
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

            <Card className="text-white bg-secondary">
                <Card.Body>
                    {/* * THAY ĐỔI Ở ĐÂY:
                      * Sửa `table-hover` thành prop `hover`
                      * Sửa `table-dark` thành prop `variant="dark"`
                      * Điều này làm cho nó khớp với style của MoviePage
                    */}
                    <Table responsive hover variant="dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Created At</th>
                            <th scope="col" style={{ width: '150px' }}>Actions</th> {/* Thêm cột Actions */}
                        </tr>
                        </thead>
                        <tbody>
                        {genres.map((genre) => (
                            <tr key={genre.id}>
                                <th scope="row">{genre.id}</th>
                                <td>{genre.name}</td>
                                <td>{new Date(genre.createdAt!).toLocaleDateString()}</td>
                                <td>
                                    {/* Thêm nút Edit và Delete */}
                                    <Button
                                        variant="outline-light"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleOpenEditModal(genre)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDeleteGenre(String(genre.id))}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    {/* Hiển thị khi không có dữ liệu */}
                    {!loading && genres.length === 0 && (
                        <p className="text-center text-muted">No genres found. Try adding one!</p>
                    )}
                </Card.Body>
            </Card>

            {/* Render Modal */}
            <GenreFormModal
                show={showModal}
                onHide={handleCloseModal}
                onSave={handleSaveGenre}
                genreToEdit={genreToEdit}
            />
        </div>
    );
};

export default GenrePage;