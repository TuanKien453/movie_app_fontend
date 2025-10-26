import { Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Error() {
    const navigate = useNavigate();
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="text-center p-5 shadow-lg border-0" style={{ maxWidth: 500 }}>
                <h1 className="display-3 text-danger mb-3">404</h1>
                <h4 className="mb-3">Oops! Page Not Found</h4>
                <p className="text-muted mb-4">

                </p>
                <Button variant="primary" size="lg" onClick={() => navigate("/")}>
                    Return Home
                </Button>
            </Card>
        </Container>
    );
}
