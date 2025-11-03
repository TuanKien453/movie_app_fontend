import { Modal, Button, Alert } from "react-bootstrap";
import TusUpload from "../../../components/TusUpload.tsx"; // Sửa lại đường dẫn

interface UploadVideoModalProps {
    show: boolean;
    onHide: () => void;
    // 'onSuccess' sẽ được gọi khi TUS upload xong
    onSuccess: (uploadUrl: string) => void;
    episodeId: string | null;
}

export const UploadVideoModal: React.FC<UploadVideoModalProps> = ({
                                                                      show, onHide, episodeId
                                                                  }) => {

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-dark">Upload Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {episodeId ? (
                    <TusUpload
                        forEpisodeId={episodeId}
                    />
                ) : (
                    <Alert variant="warning">Invalid Episode ID. Please try again.</Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

