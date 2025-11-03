import React, { useState, useRef } from "react";
import * as tus from "tus-js-client";
import { AuthHelper } from "../utils/AuthHelper.ts";

const API_DOMAIN = import.meta.env.VITE_BASE_API_ENDPOINT;

interface TusUploadProps {
    forEpisodeId: string;
    onUploadSuccess?: (url: string) => void;
}

const TusUpload: React.FC<TusUploadProps> = ({ forEpisodeId,onUploadSuccess }) => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setUploading] = useState(false);
    const [filename, setFilename] = useState<string | null>(null);
    const [lastUploaded, setLastUploaded] = useState<string | null>(null);
    const uploadRef = useRef<tus.Upload | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function startUpload(file: File) {
        if (uploadRef.current) {
            uploadRef.current.abort();
            uploadRef.current = null;
        }

        setFilename(file.name);
        setUploading(true);
        setProgress(0);

        const token = AuthHelper.getToken();

        const upload = new tus.Upload(file, {
            endpoint: `${API_DOMAIN}/files`,
            metadata: {
                filename: file.name,
                filetype: file.type,
                ForEpisodeId: forEpisodeId,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
            onError(error) {
                console.error("Upload failed:", error);
                alert("Upload failed: " + error);
                setUploading(false);
                uploadRef.current = null;

                if (inputRef.current) inputRef.current.value = "";
            },
            onProgress(bytesUploaded, bytesTotal) {
                const percent = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                setProgress(parseFloat(percent));
            },
            onSuccess() {
                // --- CHỈNH SỬA PHẦN NÀY ---
                console.log("Upload thành công! URL:", upload.url);

                // 1. Gọi callback về cho cha (EpisodeFormModal)
                if (onUploadSuccess && upload.url) {
                    onUploadSuccess(upload.url);
                }

                // 2. Giữ logic cũ của bạn
                alert("✅ Upload complete!");
                setLastUploaded(file.name);
                setUploading(false);
                setFilename(null);
                uploadRef.current = null;
                if (inputRef.current) inputRef.current.value = "";
                // --- KẾT THÚC CHỈNH SỬA ---
            },
        });

        uploadRef.current = upload;
        upload.start();
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) startUpload(file);
    }

    function handleCancel() {
        if (uploadRef.current) {
            uploadRef.current.abort();
            uploadRef.current = null;
            setUploading(false);
            setProgress(0);
            setFilename(null);
            alert("⛔ Upload canceled");

            if (inputRef.current) inputRef.current.value = "";
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: 600 }}>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h4 className="card-title mb-4 text-center text-primary">
                        Upload File
                    </h4>

                    <div className="mb-3 d-flex gap-2">
                        <input
                            type="file"
                            ref={inputRef}
                            className="form-control"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                        {isUploading && (
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                    {isUploading && filename && (
                        <div className="mt-3">
                            <div className="d-flex justify-content-between mb-1">
                                <span>{filename}</span>
                                <span>{progress.toFixed(1)}%</span>
                            </div>
                            <div className="progress" style={{ height: "1.2rem" }}>
                                <div
                                    className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                                    role="progressbar"
                                    style={{ width: `${progress}%` }}
                                    aria-valuenow={progress}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                        </div>
                    )}

                    {!isUploading && lastUploaded && (
                        <div className="alert alert-success mt-3" role="alert">
                            ✅ Last uploaded: <strong>{lastUploaded}</strong>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TusUpload;
