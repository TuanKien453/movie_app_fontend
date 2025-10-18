// src/pages/GenreTestPage.tsx

import React, { useState, useEffect } from 'react';
import { GenreApi } from '../api/GenreApi'; // Đảm bảo path này đúng
import type { Genre } from '../model/Genre'; // Đảm bảo path này đúng

// Khởi tạo một instance của Api
const genreApi = new GenreApi();

const GenreTestPage: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoading(true);
                setError(null);

                // === THAY ĐỔI CHÍNH ===
                // 1. Dùng lại hàm get() gốc của BaseApi
                //    Bạn có thể truyền các tùy chọn OData ở đây nếu muốn
                const response = await genreApi.get({
                    // Ví dụ:
                    // count: true,
                    // order: "name desc"
                });

                // 2. Dữ liệu nằm trong thuộc tính 'value' theo cấu trúc OData
                if (response && response.value) {
                    setGenres(response.value);
                } else {
                    setGenres([]);
                }
                // === KẾT THÚC THAY ĐỔI ===

            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Đã xảy ra lỗi không xác định');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy 1 lần

    // Render trạng thái loading
    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    // Render trạng thái lỗi
    if (error) {
        return <div style={{ color: 'red' }}>Lỗi: {error}</div>;
    }

    // Render kết quả
    // ...
    return (
        <div>
            <h1>Danh sách Thể loại (Test OData)</h1>
            {genres.length > 0 ? (
                <ul>
                    {genres.map((genre) => (
                        // Sửa 'genre.id' -> 'genre.Id'
                        // và 'genre.name' -> 'genre.Name'
                        <li key={genre.id}>
                            <strong>ID:</strong> {genre.id} - <strong>Tên:</strong> {genre.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không tìm thấy thể loại nào.</p>
            )}
        </div>
    );
// ...
};

export default GenreTestPage;