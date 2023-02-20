import styles from './ResponsiveVideo.module.css';

type responsiveVideoProps = {
    videoURL: string;
    height?: string;
}

const ResponsiveVideo: React.FC<responsiveVideoProps> = (props) => {
    return (
        <video
            autoPlay
            muted
            loop
            src={props.videoURL}
            className={styles.responsiveVideo}
            style={{ 
                height: props.height ? props.height : 'auto' 
            }}
        />
    )
}

export default ResponsiveVideo;