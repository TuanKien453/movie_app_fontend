import { useState } from "react";
import { apiCall } from "../utils/ApiUtil.ts";

interface AddPosterProps {
    forMovieId: number;
}
const API_DOMAIN = import.meta.env.VITE_BASE_API_ENDPOINT;

function AddPoster({  forMovieId }: AddPosterProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
        setError("");
        setSuccess("");
    };

    const handleSubmit = () => {
        if (!file) {
            setError("Please select a file.");
            return;
        }

        if (!forMovieId || forMovieId <= 0) {
            setError("Invalid movie ID.");
            return;
        }

        setError("");
        setSuccess("");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("forMovieId", forMovieId.toString());

        apiCall(`${API_DOMAIN}/api/Movie/AddPoster`, "POST", formData, true, () => {},true)
            .then((res) => {
                console.log("Uploaded:", res);
                setSuccess(`Upload successful`);
            })
            .catch((err) => {
                console.error(err);
                setError("Upload failed: " + (err instanceof Error ? err.message : String(err)));
            });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 600 }}>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h4 className="card-title mb-4 text-center text-primary">
                        Upload Poster
                    </h4>

                    <div className="d-flex gap-2">
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={handleChange}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Upload
                        </button>
                    </div>

                    {error && <p className="text-danger mt-3">{error}</p>}
                    {success && <p className="text-success mt-3">{success}</p>}
                </div>
            </div>
        </div>
    );
}

export default AddPoster;
