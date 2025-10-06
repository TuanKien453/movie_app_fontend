

export default function Nav() {
    return (
        <nav className="w-100 bg-white shadow-sm px-3 py-2">
            <div className="row align-items-center">
                {/* Left */}
                <div className="col-4 d-flex align-items-center gap-3">
                    <div className="fw-bold fs-4 text-primary">MyLogo</div>
                    <a href="/" className="text-dark text-decoration-none">Home</a>
                    <a href="/about" className="text-dark text-decoration-none">About</a>
                </div>

                {/* Center */}
                <div className="col-4 d-flex justify-content-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="form-control form-control-sm rounded-pill w-75"
                    />
                </div>

                {/* Right */}
                <div className="col-4 d-flex justify-content-end">
                    <a href="/profile" className="text-dark text-decoration-none">Profile</a>
                </div>
            </div>
        </nav>
    );
}

