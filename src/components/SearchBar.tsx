import React, { useState } from "react";

interface SearchBarProps<T> {
    handleChange: (searchTerm: string) => void;
    results?: T[];
    renderResult?: (item: T) => React.ReactNode;
}

function SearchBar<T>({ handleChange, results, renderResult }: SearchBarProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isActive, setIsActive] = useState(false);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        handleChange(e.target.value);
    };

    return (
        <div style={{ position: "relative", width: 400 }}>
            <input
                type="text"
                value={searchTerm}
                onChange={onInputChange}
                placeholder="Search..."
                className="form-control form-control-sm rounded-pill"
                onFocus={() => setIsActive(true)}
                onBlur={() => setTimeout(() => setIsActive(false), 150)}
            />
            {isActive && results?.length && renderResult && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        marginTop: 4,
                        border: "1px solid #ddd",
                        borderRadius: 6,
                        backgroundColor: "#fff",
                        maxHeight: 300,
                        overflowY: "auto",
                        zIndex: 1000,
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }}
                >
                    {results.map((item, index) => (
                        <div key={index} className="p-1 border-bottom">
                            {renderResult(item)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
