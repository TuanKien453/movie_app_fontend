import styles from "../style/FilmItem.module.css";
import play_button from "../resource/play-button-svgrepo-com.svg";
import {useNavigate} from "react-router-dom";

interface FilmItemProps {
    id: number;
    title: string;
    imageUrl: string;
}

export default function FilmItem({ id, title, imageUrl }: FilmItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detail/${id}`);
    };

    return (
        <div className={styles.wrapper} onClick={handleClick} style={{ cursor: "pointer" }}>
            <div
                className={styles.poster}
                style={{
                    backgroundImage: `url("${imageUrl}")`,
                }}
            >
                <div className={styles.playOverlay}>
                    <img src={play_button} alt="Play" className={styles.playIcon} />
                </div>
                <div className={styles.overlay}>
                    <h3 className={styles.title}>{title}</h3>
                </div>
            </div>
        </div>
    );
}