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
        const pages = [];
        const delta = 1;
        const start = Math.max(1, currentPage - delta);
        const end = Math.min(maxPage, currentPage + delta);

        if (start > 1) pages.push(1);
        if (start > 2) pages.push('...');

        for (let i = start; i <= end; i++) pages.push(i);

        if (end < maxPage - 1) pages.push('...');
        if (end < maxPage) pages.push(maxPage);

        return pages.map((page, idx) =>
            typeof page === 'number' ? (
                <li key={idx} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                </li>
            ) : (
                <li key={idx} className="page-item disabled">
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
