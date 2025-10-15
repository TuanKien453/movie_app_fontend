
interface LoadingProps {
    size?: number;
    text?: string;
}

function Loading({ size = 40, text = "Loading..." }: LoadingProps) {
    const spinnerStyle: React.CSSProperties = {
        width: size,
        height: size,
        border: `${size / 8}px solid #f3f3f3`,
        borderTop: `${size / 8}px solid #3498db`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100px" }}>
            <div style={spinnerStyle}></div>
            <div style={{ marginTop: 10 }}>{text}</div>
        </div>
    );
}

export default Loading;
