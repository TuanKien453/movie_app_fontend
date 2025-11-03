import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Spinner, Alert, Table } from "react-bootstrap";
import { Movie } from "../../model/Movie"; // Sửa lại đường dẫn nếu cần
import { MovieApi } from "../../api/MovieApi"; // Sửa lại đường dẫn nếu cần
import {MovieFormModal} from "../../pages/admin/Modal/MovieFormModal.tsx";
import {Link} from "react-router-dom"; // Modal form riêng cho Movie

const movieApi = new MovieApi();

const MoviePage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State cho modal
    const [showModal, setShowModal] = useState<boolean>(false);
    const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

    // Lấy danh sách phim
    const fetchMovies = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await movieApi.get();
            if (response && response.value) {
                const movieInstances = response.value.map((data: any) => new Movie(data));
                setMovies(movieInstances);
            } else {
                setMovies([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra khi tải danh sách phim.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    // ---- CRUD ----

    const handleOpenAddModal = () => {
        setMovieToEdit(null);
        setShowModal(true);
    };

    const handleOpenEditModal = async (movie: Movie) => {
        try {
            // 1. Gọi API GetById (Giống như bạn test)
            const rawMovieData = await movieApi.getById(String(movie.id));

            if (rawMovieData) {
                // 2. Tạo một instance MỚI với dữ liệu ĐẦY ĐỦ
                const fullMovieInstance = new Movie(rawMovieData);

                // 3. Nạp instance mới này vào state
                setMovieToEdit(fullMovieInstance);

                // 4. Mở modal
                setShowModal(true);
            } else {
                setError("Không thể tải dữ liệu chi tiết của phim.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu edit.");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Trong file: MoviePage.tsx

    // Chữ ký hàm MỚI phải nhận 3 tham số
    const handleSaveMovie = async (
        movie: Movie,
        posterFile: File | null,
        selectedGenreIds: number[] // <<< 1. THÊM THAM SỐ NÀY
    ) => {
        try {
            // --- 2. TẠO PAYLOAD CHUNG ---
            // Gắn mảng IDs vào payload
            // Backend sẽ dùng mảng 'genreIds' này để xử lý
            const payload: any = {
                ...movie,
                genreIds: selectedGenreIds
            };

            if (movie.id) {
                // --- CHẾ ĐỘ EDIT ---

                // 3. Gửi payload (đã chứa genreIds) đi
                await movieApi.update(payload); // Gửi payload thay vì 'movie'

                // (Logic poster của bạn giữ nguyên)
                if (posterFile) {
                    await movieApi.addPoster(movie.id, posterFile);
                }
            } else {
                // --- CHẾ ĐỘ ADD ---

                // 4. Xóa các trường không cần thiết từ payload
                delete payload.id;
                delete payload.createdAt;
                delete payload.updatedAt;

                // 5. Gửi 'payload' (đã sạch và có genreIds) đi
                await movieApi.create(payload);
            }

            handleCloseModal();
            await fetchMovies();
        } catch (err) {
            console.error("Failed to save movie:", err);
            setError(err instanceof Error ? err.message : "Không thể lưu phim.");
        }
    };
    const handleDeleteMovie = async (id: string) => {
        if (window.confirm("Bạn có chắc muốn xóa phim này không?")) {
            setError(null);
            try {
                await movieApi.delete(id);
                await fetchMovies();
            } catch (err: unknown) {
                console.error("Failed to delete movie:", err);
                if (typeof err === "object" && err !== null && "message" in err) {
                    const apiError = err as { message: string };
                    setError(apiError.message);
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Không thể xóa phim. Đã xảy ra lỗi không xác định.");
                }
            }
        }
    };

    // ---- RENDER ----

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <Spinner animation="border" variant="light" />
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white">Movie Management</h2>
                <Button variant="primary" onClick={handleOpenAddModal}>
                    <i className="bi bi-plus-circle me-2"></i> Add New Movie
                </Button>
            </div>

            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}

            <Card className="text-white bg-secondary">
                <Card.Body>
                    <Table responsive hover variant="dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Release Date</th>
                            <th>Duration</th>
                            <th>Country</th>
                            <th>Created At</th>
                            <th style={{ width: "150px" }}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>{movie.title}</td>
                                <td>
                                    {movie.releaseDate
                                        ? new Date(movie.releaseDate).toLocaleDateString()
                                        : "—"}
                                </td>
                                <td>{movie.duration} min</td>
                                <td>{movie.country || "—"}</td>
                                <td>{new Date(movie.createdAt!).toLocaleDateString()}</td>
                                <td>
                                    <Button
                                        variant="outline-light"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleOpenEditModal(movie)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDeleteMovie(String(movie.id))}
                                    >
                                        Delete
                                    </Button>
                                    <Link to={`/movie/${movie.id}/content`}>
                                        <Button variant="outline-info" size="sm" className="me-2">
                                            Content
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    {!loading && movies.length === 0 && (
                        <p className="text-center text-muted">No movies found. Try adding one!</p>
                    )}
                </Card.Body>
            </Card>

            {/* Modal Form */}
            <MovieFormModal
                show={showModal}
                onHide={handleCloseModal}
                onSave={handleSaveMovie}
                movieToEdit={movieToEdit}
            />
        </div>
    );
};

export default MoviePage;
