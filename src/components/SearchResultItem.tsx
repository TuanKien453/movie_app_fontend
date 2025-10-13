interface SearchResultItemProps {
    imageUrl: string;
    title: string;
}

interface SearchResultItemProps {
    imageUrl: string;
    title: string;
    onClick?: () => void;
}

export function SearchResultItem({ imageUrl, title, onClick }: SearchResultItemProps) {
    return (
        <div
            className="d-flex align-items-center"
            onClick={onClick}
            style={{
                cursor: "pointer",
                transition: "background-color 0.2s",
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = "white")}
        >
            <img
                src={imageUrl}
                alt={title}
                className="me-2 rounded"
                style={{ width: 50, height: 50, objectFit: "cover" }}
            />
            <span className="text-truncate">{title}</span>
        </div>
    );
}