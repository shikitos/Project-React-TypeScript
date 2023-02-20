import { ResponsiveVideo } from "../../components";
import './Home.css';

function Home() {
    return (
        <div className='video-container'>
            <ResponsiveVideo 
                videoURL="/videos/background_sky.mp4"
            />
            <div className="overlay">
                <h1>
                    EXPLORE STARS
                </h1>
                
            </div>
        </div>
    );
}
  
export default Home;
  