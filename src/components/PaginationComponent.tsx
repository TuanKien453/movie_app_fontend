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

        if (maxPage <= 5) {
            for (let i = 1; i <= maxPage; i++) pages.push(i);
        } else {
            const delta = 1;
            const left = Math.max(2, currentPage - delta);
            const right = Math.min(maxPage - 1, currentPage + delta);

            pages.push(1);
            if (left > 2) pages.push("...");
            for (let i = left; i <= right; i++) pages.push(i);
            if (right < maxPage - 1) pages.push("...");
            pages.push(maxPage);
        }

        return pages.map((page, idx) =>
            typeof page === "number" ? (
                <li key={idx}>
                    <button
                        onClick={() => handlePageChange(page)}
                        style={{
                            background:
                                page === currentPage
                                    ? "linear-gradient(135deg, #6ec1e4 0%, #4db6ac 100%)"
                                    : "rgba(255, 255, 255, 0.7)",
                            color: page === currentPage ? "white" : "#37474f",
                            border: "none",
                            borderRadius: "12px",
                            margin: "0 6px",
                            padding: "8px 16px",
                            fontWeight: 600,
                            boxShadow:
                                page === currentPage
                                    ? "0 4px 10px rgba(0, 188, 212, 0.3)"
                                    : "0 2px 6px rgba(0,0,0,0.05)",
                            backdropFilter: "blur(8px)",
                            transition: "all 0.2s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLButtonElement).style.transform = "scale(1.08)";
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLButtonElement).style.transform = "scale(1)";
                        }}
                    >
                        {page}
                    </button>
                </li>
            ) : (
                <li key={idx}>
                    <span
                        style={{
                            color: "#90a4ae",
                            fontWeight: 500,
                            margin: "0 8px",
                            userSelect: "none",
                        }}
                    >
                        {page}
                    </span>
                </li>
            )
        );
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
                transform: "scale(0.95)",
            }}
        >
            <ul
                style={{
                    display: "flex",
                    alignItems: "center",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    gap: "4px",
                }}
            >
                <li>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                            background: "rgba(255,255,255,0.7)",
                            border: "none",
                            borderRadius: "12px",
                            padding: "8px 12px",
                            color: "#00796b",
                            fontWeight: 600,
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                            opacity: currentPage === 1 ? 0.4 : 1,
                            transition: "all 0.2s",
                        }}
                    >
                        &laquo;
                    </button>
                </li>

                {renderPages()}

                <li>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === maxPage}
                        style={{
                            background: "rgba(255,255,255,0.7)",
                            border: "none",
                            borderRadius: "12px",
                            padding: "8px 12px",
                            color: "#00796b",
                            fontWeight: 600,
                            cursor: currentPage === maxPage ? "not-allowed" : "pointer",
                            opacity: currentPage === maxPage ? 0.4 : 1,
                            transition: "all 0.2s",
                        }}
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default PaginationComponent;
