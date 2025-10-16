import Nav from "../components/Nav.tsx";
import FilmItem from "../components/FilmItem.tsx";
import PaginationComponent from "../components/PaginationComponent.tsx";
import TusUpload from "../components/TusUpload.tsx";

function Home() {
    const films = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
    ];

    const PageChange = (page: number) => {
        console.log("change to page: " + page);
    };

    return (
        <>
            <Nav />
            <TusUpload forEpisodeId={"6"}></TusUpload>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div></div>
                    <div className="d-flex gap-2 align-items-center">
                        <select className="form-select w-auto">
                            <option value="">Thể loại</option>
                            <option value="action">Hành động</option>
                            <option value="comedy">Hài</option>
                            <option value="drama">Tâm lý</option>
                        </select>
                        <select className="form-select w-auto">
                            <option value="">Năm</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                        <button className="btn btn-primary">Filter</button>
                    </div>
                </div>

                <div className="d-flex flex-wrap">
                    {films.map((film) => (
                        <div className="col-md-3 mb-4 p-1" key={film.id}>
                            <FilmItem
                                id={film.id}
                                title={`Title ${film.id}`}
                                imageUrl={`https://picsum.photos/200/300?random=${film.id}`}
                            />
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <PaginationComponent
                        currentPage={1}
                        maxPage={10}
                        onPageChange={PageChange}
                    />
                </div>
            </div>
        </>
    );
}

export default Home;