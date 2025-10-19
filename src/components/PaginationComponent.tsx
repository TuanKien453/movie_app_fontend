interface PaginationProps {
    currentPage: number;
    maxPage: number;
    onPageChange: ((page: number) => void) | null;
}

function PaginationComponent({ currentPage, maxPage, onPageChange }: PaginationProps) {
    const handlePageChange = (page: number) => {
        if (onPageChange && page !== currentPage && page >= 1 && page <= maxPage) {
            onPageChange(page);
        }
    };

    const renderPages = () => {
        const pages: (number | string)[] = [];

        // Nếu số trang nhỏ, hiển thị hết
        if (maxPage <= 5) {
            for (let i = 1; i <= maxPage; i++) pages.push(i);
        } else {
            const delta = 1;
            const left = Math.max(2, currentPage - delta);
            const right = Math.min(maxPage - 1, currentPage + delta);

            pages.push(1); // luôn có trang đầu

            if (left > 2) pages.push("...");

            for (let i = left; i <= right; i++) {
                pages.push(i);
            }

            if (right < maxPage - 1) pages.push("...");

            pages.push(maxPage); // luôn có trang cuối
        }

        return pages.map((page, idx) =>
            typeof page === "number" ? (
                <li key={idx} className={`page-item ${page === currentPage ? "active" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                </li>
            ) : (
                <li key={idx} className="page-item disabled" style={{ pointerEvents: "none" }}>
                    <span className="page-link">{page}</span>
                </li>
            )
        );
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                transform: "scale(0.7)",
                transformOrigin: "center",
            }}
        >
            <ul className="pagination pagination-lg m-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        &laquo;
                    </button>
                </li>
                {renderPages()}
                <li className={`page-item ${currentPage === maxPage ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default PaginationComponent;
