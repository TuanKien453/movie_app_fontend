import React, {useEffect, useState, useRef} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap";
import {Movie} from "../../../model/Movie"; // Sửa lại đường dẫn nếu cần
import { Genre } from "../../../model/Genre"; // <<< Giả sử bạn có model này
import { GenreApi } from "../../../api/GenreApi"; // <<< Giả sử bạn có API này
import Select from 'react-select';
import type {MovieGenres} from "../../../model/MovieGenres.ts";

const genreApi = new GenreApi();

// Định dạng option cho react-select
interface GenreOption {
    value: number; // Sẽ là Genre.Id
    label: string; // Sẽ là Genre.Name
}
interface MovieFormModalProps {
    show: boolean;
    onHide: () => void;
    // Cập nhật onSave: giờ nó sẽ nhận cả 'movie' và 'posterFile'
    onSave: (movie: Movie, posterFile: File | null, selectedGenreIds: number[]) => Promise<void>;
    movieToEdit: Movie | null;
}

export const MovieFormModal: React.FC<MovieFormModalProps> = ({
                                                                  show,
                                                                  onHide,
                                                                  onSave,
                                                                  movieToEdit,
                                                              }) => {
    const [formData, setFormData] = useState<Movie>(
        new Movie({
            title: "",
            description: "",
            releaseDate: null,
            duration: 0,
            country: "",
            posterSource: "",
            trailerSource: "",
        })
    );

    const [validated, setValidated] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [posterFile, setPosterFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [allGenres, setAllGenres] = useState<GenreOption[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<GenreOption[]>([]);
    const [loadingGenres, setLoadingGenres] = useState(false);
    // Gán dữ liệu khi sửa
    // Gán dữ liệu khi sửa (Kết hợp Poster và Genre)
    useEffect(() => {
        if (show) {
            // 1. Nạp formData (logic của bạn - đã đúng)
            if (movieToEdit) {
                setFormData(new Movie(movieToEdit));
            } else {
                setFormData(
                    new Movie({
                        title: "",
                        description: "",
                        releaseDate: null,
                        duration: 0,
                        country: "",
                        posterSource: "",
                        trailerSource: "",
                    })
                );
            }

            // 2. Reset poster (logic của bạn - đã đúng)
            setValidated(false);
            setPosterFile(null); // Reset file state
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            // 3. Tải và nạp Genres (logic mới)
            const fetchAllGenres = async () => {
                setLoadingGenres(true);
                try {
                    const genres = await genreApi.getAll();
                    const options: GenreOption[] = genres.map((g: Genre) => ({
                        value: g.id,
                        label: g.name
                    }));
                    setAllGenres(options);

                    // --- SỬA LỖI Ở ĐÂY ---

                    // Nếu là EDIT, nạp các genre hiện tại của phim
                    // 1. Dùng 'movieGenres' (từ Model)
                    if (movieToEdit && movieToEdit.movieGenres) {

                        // 2. Map qua 'movieGenres' và lấy 'mg.genre'
                        const currentOptions = movieToEdit.movieGenres
                            .filter(mg => mg.genre) // Lọc ra những mg có 'genre' (để an toàn)
                            .map((mg: MovieGenres) => ({
                                value: mg.genre!.id, // Lấy id từ 'genre' lồng bên trong
                                label: mg.genre!.name // Lấy name từ 'genre' lồng bên trong
                            }));

                        setSelectedGenres(currentOptions);
                    } else {
                        setSelectedGenres([]); // Reset khi thêm mới
                    }

                    // --- KẾT THÚC SỬA LỖI ---

                } catch (err) {
                    console.error("Failed to load genres", err);
                } finally {
                    setLoadingGenres(false);
                }
            };

            fetchAllGenres();
        }
    }, [movieToEdit, show]);


    // ---- Xử lý nhập liệu ----
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "duration"
                    ? parseInt(value || "0", 10)
                    : name === "releaseDate"
                        ? (value ? new Date(value) : null)
                        : value,
        }));
    };

    // ---- Xử lý lưu ----
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Hàm handleSubmit ĐÃ ĐƯỢC GỌI!");
        const form = e.currentTarget as HTMLFormElement;

        if (!form.checkValidity()) {
            console.log("Form không hợp lệ (invalid), đang dừng lại."); // Thêm log này
            e.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            setSaving(true);

            const selectedGenreIds = selectedGenres.map(option => option.value);

            // --- LOG 1: KIỂM TRA DỮ LIỆU SẮP GỬI ĐI ---
            console.log("Saving... Dữ liệu gửi từ Modal:", {
                formData: formData,
                posterFile: posterFile,
                selectedGenreIds: selectedGenreIds
            });
            // --- KẾT THÚC LOG ---

            await onSave(formData, posterFile, selectedGenreIds);
        } finally {
            setSaving(false);
        }
    };

// ---- Thêm hàm xử lý chọn file ----
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (movieToEdit) {
                // CHẾ ĐỘ EDIT: Lưu File object để upload
                setPosterFile(file);
            } else {
                // CHẾ ĐỘ ADD: Lưu tên file (string) vào formData
                setFormData(prev => ({
                    ...prev,
                    posterSource: file.name
                }));
                setPosterFile(null); // Đảm bảo không có file nào được gửi đi
            }
        } else {
            // Người dùng hủy chọn file
            setPosterFile(null);
            if (!movieToEdit) {
                // Xóa tên file nếu ở chế độ Add
                setFormData(prev => ({...prev, posterSource: ""}));
            }
        }
    };
    // --- 4. THÊM HÀM XỬ LÝ CHỌN GENRE ---
    const handleGenreChange = (selectedOptions: any) => {
        setSelectedGenres(selectedOptions || []);
    };
    // ---- Render ----
    return (
        <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dark">
                        {movieToEdit ? "Edit Movie" : "Add New Movie"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="movieTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="title"
                                placeholder="Enter movie title"
                                value={formData.title || ""}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Title is required.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="releaseDate">
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="releaseDate"
                                value={
                                    formData.releaseDate
                                        ? new Date(formData.releaseDate)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="duration">
                            <Form.Label>Duration (minutes)</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="duration"
                                min={1}
                                value={formData.duration || ""}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Duration must be greater than 0.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                placeholder="Enter country"
                                value={formData.country || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="8" controlId="posterFile">

                            <Form.Label>
                                Poster Image
                                {/* Chỉ hiển thị tên file CŨ khi ở chế độ EDIT */}
                                {movieToEdit && movieToEdit.posterSource && !posterFile && (
                                    <small className="ms-2 text-muted fst-italic">
                                        (File hiện tại: {movieToEdit.posterSource})
                                    </small>
                                )}
                            </Form.Label>

                            <Form.Control
                                type="file"
                                name="posterFile"
                                ref={fileInputRef} // Gán ref
                                onChange={handleFileChange} // Gán hàm xử lý mới
                                accept="image/png, image/jpeg, image/gif"
                            />

                            {/* Hiển thị thông báo tùy theo chế độ */}
                            {movieToEdit && posterFile && (
                                <small className="text-success mt-1 d-block">
                                    Đã chọn (sẽ upload): {posterFile.name}
                                </small>
                            )}
                            {!movieToEdit && formData.posterSource && (
                                <small className="text-success mt-1 d-block">
                                    Sẽ lưu tên file: {formData.posterSource}
                                </small>
                            )}
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="trailerSource">
                        <Form.Label>Trailer Source</Form.Label>
                        <Form.Control
                            type="url"
                            name="trailerSource"
                            placeholder="Enter trailer video URL"
                            value={formData.trailerSource || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            rows={4}
                            placeholder="Enter movie description"
                            value={formData.description || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="genres" className="mb-3">
                        <Form.Label>Genres (Thể loại)</Form.Label>
                        <Select
                            isMulti // Cho phép chọn nhiều
                            name="genres"
                            options={allGenres}
                            value={selectedGenres}
                            isLoading={loadingGenres}
                            onChange={handleGenreChange}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Chọn thể loại..."
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={saving}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};


