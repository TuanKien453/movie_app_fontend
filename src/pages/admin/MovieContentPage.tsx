import React, {useState, useEffect, useCallback} from "react";
import {
    useParams,
    Link
} from "react-router-dom";
import {
    Button,
    Card,
    Spinner,
    Alert,
    Table,
    Accordion,
    Breadcrumb
} from "react-bootstrap";
import {Movie} from "../../model/Movie";
import {Part} from "../../model/Part";
import {Episode} from "../../model/Episode";
import {MovieApi} from "../../api/MovieApi";
import {PartApi} from "../../api/PartApi";
import {EpisodeApi} from "../../api/EpisodeApi";
import {PartFormModal} from "./Modal/PartFormModal";
import {EpisodeFormModal} from "./Modal/EpisodeFormModal";

// Khởi tạo API
const movieApi = new MovieApi();
const partApi = new PartApi();
const episodeApi = new EpisodeApi();

const MovieContentPage: React.FC = () => {
    // Lấy movieId từ URL
    const {movieId} = useParams<{ movieId: string }>();

    // State cho dữ liệu
    const [movie, setMovie] = useState<Movie | null>(null);
    const [parts, setParts] = useState<Part[]>([]);
    // Map để lưu episodes theo partId
    const [episodesByPart, setEpisodesByPart] = useState<Map<string, Episode[]>>(new Map());

    // State cho trạng thái UI
    const [loadingMovie, setLoadingMovie] = useState<boolean>(true);
    const [loadingParts, setLoadingParts] = useState<boolean>(false);
    // Map để lưu trạng thái loading episodes cho từng part
    const [loadingEpisodes, setLoadingEpisodes] = useState<Map<string, boolean>>(new Map());
    const [error, setError] = useState<string | null>(null);

    // State cho Part Modal
    const [showPartModal, setShowPartModal] = useState<boolean>(false);
    const [partToEdit, setPartToEdit] = useState<Part | null>(null);

    // State cho Episode Modal
    const [showEpisodeModal, setShowEpisodeModal] = useState<boolean>(false);
    const [episodeToEdit, setEpisodeToEdit] = useState<Episode | null>(null);
    // Lưu partId khi mở modal thêm episode
    const [currentPartIdForEpisode, setCurrentPartIdForEpisode] = useState<string | null>(null);


    // ---- TẢI DỮ LIỆU ----

    // Tải thông tin phim
    const fetchMovie = useCallback(async (id: string) => {
        setLoadingMovie(true);
        setError(null);
        try {
            // Giả sử bạn có hàm getById trong MovieApi
            // Nếu không, bạn cần điều chỉnh hàm này
            const fetchedMovie = await movieApi.getById(id);
            setMovie(new Movie(fetchedMovie));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Không thể tải thông tin phim.");
        } finally {
            setLoadingMovie(false);
        }
    }, []);

    // Tải danh sách parts của phim
    const fetchParts = useCallback(async (mId: string) => {
        setLoadingParts(true);
        setError(null);
        try {
            const response = await partApi.getByMovieId(mId);
            if (response && response.value) {
                const partInstances = response.value.map((data: any) => new Part(data));
                setParts(partInstances);
                // Reset map episodes khi tải lại parts
                setEpisodesByPart(new Map());
            } else {
                setParts([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Không thể tải danh sách phần (part).");
        } finally {
            setLoadingParts(false);
        }
    }, []);

    // Tải episodes cho một part cụ thể
    const fetchEpisodesForPart = useCallback(async (pId: string) => {
        // Đánh dấu loading cho part này
        setLoadingEpisodes(prev => new Map(prev).set(pId, true));
        try {
            const response = await episodeApi.getByPartId(pId);
            const episodeInstances = (response.value || []).map((data: any) => new Episode(data));
            // Cập nhật map episodes
            setEpisodesByPart(prev => new Map(prev).set(pId, episodeInstances));
        } catch (err) {
            console.error(`Failed to fetch episodes for part ${pId}:`, err);
            setError(`Không thể tải tập (episode) cho phần ${pId}.`);
        } finally {
            // Tắt loading cho part này
            setLoadingEpisodes(prev => new Map(prev).set(pId, false));
        }
    }, []);

    // useEffect chính: Tải phim và parts khi movieId thay đổi
    useEffect(() => {
        if (movieId) {
            fetchMovie(movieId);
            fetchParts(movieId);
        }
    }, [movieId, fetchMovie, fetchParts]);


    // ---- XỬ LÝ MODAL PART ----

    const handleOpenAddPartModal = () => {
        setPartToEdit(null);
        setShowPartModal(true);
    };

    const handleOpenEditPartModal = (part: Part) => {
        setPartToEdit(part);
        setShowPartModal(true);
    };

    const handleClosePartModal = () => {
        setShowPartModal(false);
    };

    const handleSavePart = async (part: Part) => {
        setError(null);
        try {
            if (part.id) {
                // --- CHẾ ĐỘ EDIT ---
                await partApi.update(part);
            } else {
                // --- CHẾ ĐỘ ADD ---
                // 1. Gán movieId
                const payload: any = {...part, movieId: Number(movieId)};

                // 2. Xóa các trường không cần thiết khi tạo mới
                delete payload.id;
                delete payload.createdAt;
                delete payload.updatedAt;

                // 3. Gọi API
                await partApi.create(payload);
            }

            handleClosePartModal();
            await fetchParts(movieId!); // Tải lại danh sách parts
        } catch (err) {
            console.error("Failed to save part:", err);
            setError(err instanceof Error ? err.message : "Không thể lưu phần (part).");
        }
    };

    const handleDeletePart = async (id: string) => {
        if (window.confirm("Bạn có chắc muốn xóa phần này? (Tất cả tập phim bên trong cũng sẽ bị xóa)")) {
            setError(null);
            try {
                await partApi.delete(id);
                await fetchParts(movieId!); // Tải lại danh sách parts
            } catch (err) {
                console.error("Failed to delete part:", err);
                setError(err instanceof Error ? err.message : "Không thể xóa phần (part).");
            }
        }
    };

    // ---- XỬ LÝ MODAL EPISODE ----

    const handleOpenAddEpisodeModal = (partId: string) => {
        setEpisodeToEdit(null);
        setCurrentPartIdForEpisode(partId); // Đặt partId hiện tại
        setShowEpisodeModal(true);
    };

    const handleOpenEditEpisodeModal = (episode: Episode) => {
        setEpisodeToEdit(episode);
        setCurrentPartIdForEpisode(String(episode.partId)); // Đặt partId từ episode
        setShowEpisodeModal(true);
    };

    const handleCloseEpisodeModal = () => {
        setShowEpisodeModal(false);
    };

    const handleSaveEpisode = async (episode: Episode) => {
        setError(null);
        if (!currentPartIdForEpisode) {
            setError("Lỗi: Không tìm thấy Part ID để lưu Episode.");
            return;
        }

        try {
            if (episode.id) {
                // --- CHẾ ĐỘ EDIT ---
                await episodeApi.update(episode);
            } else {
                // --- CHẾ ĐỘ ADD ---
                // 1. Gán partId
                const payload: any = {...episode, partId: Number(currentPartIdForEpisode)};

                // 2. Xóa các trường không cần thiết
                delete payload.id;
                delete payload.createdAt;
                delete payload.updatedAt;

                // 3. Gọi API
                await episodeApi.create(payload);
            }

            handleCloseEpisodeModal();
            // Tải lại episodes CHỈ cho part vừa được cập nhật
            await fetchEpisodesForPart(currentPartIdForEpisode);
        } catch (err) {
            console.error("Failed to save episode:", err);
            setError(err instanceof Error ? err.message : "Không thể lưu tập (episode).");
        }
    };

    const handleDeleteEpisode = async (episode: Episode) => {
        if (window.confirm("Bạn có chắc muốn xóa tập phim này?")) {
            setError(null);
            try {
                await episodeApi.delete(String(episode.id));
                // Tải lại episodes CHỈ cho part vừa được cập nhật
                await fetchEpisodesForPart(String(episode.partId));
            } catch (err) {
                console.error("Failed to delete episode:", err);
                setError(err instanceof Error ? err.message : "Không thể xóa tập (episode).");
            }
        }
    };


    // ---- RENDER ----

    if (loadingMovie) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
                <Spinner animation="border" variant="light"/>
            </div>
        );
    }

    if (!movie) {
        return <Alert variant="danger">Không tìm thấy phim với ID: {movieId}</Alert>;
    }

    return (
        <div>
            <Breadcrumb listProps={{className: "mb-3"}}>
                <Breadcrumb.Item linkAs={Link} linkProps={{to: "/movies"}}>Movie Management</Breadcrumb.Item>
                <Breadcrumb.Item active>{movie.title}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white mb-0">Nội dung: {movie.title}</h2>
                <Button variant="primary" onClick={handleOpenAddPartModal}>
                    <i className="bi bi-plus-circle me-2"></i> Thêm Phần (Part/Season)
                </Button>
            </div>

            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}

            <Card className="text-white bg-secondary">
                <Card.Body>
                    {loadingParts ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="light" size="sm"/> Đang tải...
                        </div>
                    ) : (
                        <Accordion onSelect={(eventKey) => {
                            if (eventKey && !episodesByPart.has(String(eventKey))) {
                                fetchEpisodesForPart(String(eventKey));
                            }
                        }}>
                            {parts.map((part) => (
                                <Accordion.Item eventKey={String(part.id)} key={part.id} className="bg-dark text-white">

                                    {/* 1. XÓA các nút ra khỏi Header */}
                                    <Accordion.Header>
                                        <span className="fw-bold fs-5 me-3">{part.partName}</span>
                                        (Part Number: {part.partNumber})
                                        {/* Div chứa 2 button đã bị xóa khỏi đây */}
                                    </Accordion.Header>

                                    <Accordion.Body className="bg-secondary">

                                        {/* 2. CHUYỂN 2 nút vào đầu Body */}
                                        <div className="mb-3 pb-3 border-bottom">
                                            <span className="me-3 text-white-50">Quản lý Part:</span>
                                            <Button
                                                variant="outline-light"
                                                size="sm"
                                                className="me-2"
                                                style={{color: 'black'}}
                                                onClick={() => {
                                                    handleOpenEditPartModal(part);
                                                }}
                                            >
                                                Edit Part
                                            </Button>

                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                style={{color: 'black'}}
                                                onClick={() => {
                                                    handleDeletePart(String(part.id));
                                                }}
                                            >
                                                Delete Part
                                            </Button>
                                        </div>

                                        <Button
                                            variant="outline-info"
                                            size="sm"
                                            className="mb-3"
                                            onClick={() => handleOpenAddEpisodeModal(String(part.id))}
                                        >
                                            <i className="bi bi-plus-circle me-2"></i> Thêm Tập (Episode)
                                        </Button>

                                        {loadingEpisodes.get(String(part.id)) && (
                                            <div className="text-center p-3">
                                                <Spinner animation="border" variant="light" size="sm"/>
                                            </div>
                                        )}

                                        {!loadingEpisodes.get(String(part.id)) && (
                                            <Table responsive hover variant="dark">
                                                <thead>
                                                <tr>
                                                    <th>Episode #</th>
                                                    <th>Title</th>
                                                    <th>Duration</th>

                                                    <th style={{width: "150px"}}>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {(episodesByPart.get(String(part.id)) || []).map((ep) => (
                                                    <tr key={ep.id}>
                                                        <td>{ep.episodeNumber}</td>
                                                        <td>{ep.title}</td>
                                                        <td>{ep.duration} min</td>
                                                        <td>
                                                            <Button
                                                                variant="outline-light"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() => handleOpenEditEpisodeModal(ep)}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => handleDeleteEpisode(ep)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </Table>
                                        )}

                                        {!loadingEpisodes.get(String(part.id)) &&
                                            (!episodesByPart.get(String(part.id)) || episodesByPart.get(String(part.id))!.length === 0) && (
                                                <p className="text-center text-muted">Chưa có tập nào cho phần này.</p>
                                            )}

                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    )}

                    {!loadingParts && parts.length === 0 && (
                        <p className="text-center text-muted">Phim này chưa có phần (part) nào. Hãy thêm một phần!</p>
                    )}
                </Card.Body>
            </Card>

            {/* Modals */}
            <PartFormModal
                show={showPartModal}
                onHide={handleClosePartModal}
                onSave={handleSavePart}
                partToEdit={partToEdit}
            />

            <EpisodeFormModal
                show={showEpisodeModal}
                onHide={handleCloseEpisodeModal}
                onSave={handleSaveEpisode}
                episodeToEdit={episodeToEdit}
            />
        </div>
    );
};

export default MovieContentPage;

