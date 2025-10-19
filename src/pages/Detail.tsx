import Nav from "../components/Nav.tsx";

function Detail() {
    return (
        <>
            <Nav />
            <div
                className="min-vh-100 py-5"
                style={{
                    background: "linear-gradient(135deg, #9dacd7 0%, #ffffff 100%)",
                }}
            >
                <div className="container">
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol
                            className="breadcrumb p-3 rounded-3 shadow-sm"
                            style={{
                                background: "rgba(255, 255, 255, 0.85)",
                                backdropFilter: "blur(6px)",
                                border: "1px solid rgba(157, 172, 215, 0.3)",
                            }}
                        >
                            <li className="breadcrumb-item">
                                <a
                                    href="/"
                                    className="text-decoration-none fw-semibold"
                                    style={{
                                        color: "#2b5fae",
                                    }}
                                >
                                    <i className="bi bi-house-door-fill me-1"></i> Home
                                </a>
                            </li>
                            <li
                                className="breadcrumb-item active fw-medium"
                                aria-current="page"
                                style={{ color: "#5b6575" }}
                            >
                                Interstellar
                            </li>
                        </ol>
                    </nav>

                    <div
                        className="text-dark py-5 px-4 rounded-4"
                        style={{
                            backgroundColor: "#e8ecf3",
                            boxShadow: "0 0 12px rgba(0,0,0,0.04)",
                        }}
                    >
                        <div className="row g-5 align-items-start">
                            <div className="col-md-3 text-center">
                                <div className="position-relative">
                                    <img
                                        src="https://picsum.photos/300/450"
                                        alt="Interstellar Poster"
                                        className="img-fluid rounded-4 shadow-sm"
                                        style={{
                                            border: "1px solid rgba(0,0,0,0.1)",
                                        }}
                                    />
                                    <button
                                        className="fw-bold w-100 mt-3 py-2 rounded-3 shadow-sm border-0"
                                        style={{
                                            background: "#3b82f6",
                                            color: "white",
                                        }}
                                    >
                                        <i className="bi bi-play-fill me-1"></i> WATCH MOVIE
                                    </button>
                                </div>

                                <div
                                    className="d-flex justify-content-center mt-3 gap-2 px-2"
                                    style={{
                                        overflowX: "auto",
                                        maxWidth: "100%",
                                        scrollbarWidth: "thin",
                                        paddingBottom: "4px",
                                    }}
                                >
                                    <button
                                        className="btn btn-outline-primary btn-sm rounded-pill px-3 border-2 flex-shrink-0"
                                        style={{ color: "#3b82f6", borderColor: "#3b82f6" }}
                                    >
                                        Trailer
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm fw-bold rounded-pill px-3 border-0 flex-shrink-0"
                                        style={{ background: "#3b82f6" }}
                                    >
                                        Full HD
                                    </button>

                                </div>
                            </div>

                            <div className="col-md-9">
                                <h1
                                    className="fw-bold mb-2"
                                    style={{
                                        fontSize: "2rem",
                                        color: "#2b5fae",
                                    }}
                                >
                                    Interstellar
                                </h1>

                                <h5
                                    className="fst-italic mb-3"
                                    style={{ color: "#5b6575" }}
                                >
                                    Directed by Christopher Nolan | Starring Matthew McConaughey, Anne Hathaway, Jessica Chastain
                                </h5>

                                <p
                                    className="lh-lg mt-3 border-start border-4 ps-3 shadow-sm"
                                    style={{
                                        borderColor: "#3b82f6",
                                        maxWidth: "900px",
                                        borderRadius: "0.5rem",
                                        background: "linear-gradient(180deg, #f2f3f7 0%, #e4e7ee 100%)",
                                        color: "#2f3640",
                                        padding: "1.25rem",
                                        lineHeight: "1.75rem",
                                    }}
                                >
                                    In a future where Earth has become nearly uninhabitable due to
                                    dust storms, famine, and dwindling resources, humanity’s last hope
                                    lies among the stars.{" "}
                                    <span className="fw-semibold text-dark">Cooper</span>, a former NASA pilot,
                                    is recruited for a daring interstellar mission through a newly
                                    discovered wormhole near Saturn. Alongside a team of scientists,
                                    he ventures beyond the solar system to find a new world suitable
                                    for human life. <br/><br/>
                                    As they travel through the unknown, the crew faces extreme time
                                    dilation, emotional turmoil, and the terrifying vastness of space.
                                    Meanwhile, on Earth, Cooper’s daughter{" "}
                                    <span className="fw-semibold text-dark">Murph</span> grows up
                                    believing her father abandoned her, until she uncovers secrets that
                                    could change the fate of all humankind. <br/><br/>
                                    <span className="fst-italic text-secondary">
        “Interstellar” is an epic blend of science and emotion, exploring
        the boundaries of human love, survival, and sacrifice across
        space and time — beautifully scored by Hans Zimmer’s haunting soundtrack.
    </span>
                                </p>

                                <div className="d-flex align-items-center mt-4 text-secondary flex-wrap gap-3">
                                    <span>
                                        <i className="bi bi-star-fill" style={{ color: "#facc15" }}></i>{" "}
                                        91% (9.1/10)
                                    </span>
                                    <span>
                                        <i className="bi bi-calendar-date" style={{ color: "#3b82f6" }}></i> 07/11
                                    </span>
                                    <span>
                                        <i className="bi bi-calendar3" style={{ color: "#3b82f6" }}></i> 2014
                                    </span>
                                    <span>
                                        <i className="bi bi-eye" style={{ color: "#3b82f6" }}></i> 1,243,678 views
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
