// import { useNavigate } from "react-router-dom";
import styles from "../style/FilmItem.module.css";
import play_button from "../resource/play-button-svgrepo-com.svg";

export default function FilmItem() {

    // const navigate = useNavigate();
    // const addToCartHandler = () => {
    //     navigate('/profile');
    // };



    return (
    <>
        <div className={styles.wrapper}>
            <div
                className={styles.poster}
                style={{
                    backgroundImage: `url("https://picsum.photos/id/237/400/600")`
                }}
            >
                <div className={styles.playOverlay}>
                    <img
                        src={play_button}
                        alt="Play"
                        className={styles.playIcon}
                    />
                </div>
                <div className={styles.overlay}>
                    <h3 className={styles.title}>Movie Name</h3>
                </div>
            </div>
        </div>
    </>

    );
}