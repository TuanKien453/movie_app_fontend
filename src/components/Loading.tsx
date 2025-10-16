
interface LoadingProps {
    size?: "sm" | "md" | "lg";
    text?: string;
}

function Loading({ size = "md", text = "Loading..." }: LoadingProps) {
    let spinnerClass = "spinner-border";
    if (size === "sm") spinnerClass += " spinner-border-sm";
    if (size === "lg") spinnerClass += " spinner-border-lg";

    const spinnerStyle: React.CSSProperties = size === "lg" ? { width: "4rem", height: "4rem" } : {};

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100px" }}>
            <div className={spinnerClass} role="status" style={spinnerStyle}>
                <span className="visually-hidden">{text}</span>
            </div>
            <div className="mt-2">{text}</div>
        </div>
    );
}

export default Loading;