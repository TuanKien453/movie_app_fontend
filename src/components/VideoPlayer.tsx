import Plyr from "plyr-react";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
    src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
    return (
        <Plyr
            source={{
                type: "video",
                sources: [
                    {
                        src,
                        provider: "html5",
                    },
                ],
            }}
            options={{ autoplay: true , settings: ["speed", "quality"],}}
        />
    );
}