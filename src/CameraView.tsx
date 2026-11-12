
import camFeed from "./Camera";
import { useGame } from "./GameContext";
import GameHUD from "./GameHUD";
import { useGlobal } from "./GlobalContext";
import audioHandler from "./SFX";


export default function CameraView() {
    const {isUsingCam, setIsUsingCam} = useGame();

    return (<>
    <div className="camera-button">
            <img
            id="cameraMonitor"
            src="/ASSETS/TEXTURES/OFFICE/camera_button.png"
            onClick={() => {
                if (!isUsingCam) {
                    camFeed.show();
                setIsUsingCam(true);
            } else {
                camFeed.close();
                audioHandler.playSFX(audioHandler.SFX.cam_down);
                setIsUsingCam(false);
            }
        }}
        draggable={false}
    />
    </div>
    <div id="cameraSection">
        <GameHUD />
        <img className='camera-scene' id='cameraScene' src=''></img>
        <div className='camera-map' draggable={false}>
        <img id='selectedMapButton'/>
        <img className='camera-map-outline' draggable={false} src='/ASSETS/TEXTURES/CAMERA/camera_outline.png'></img>
        <img className='cam-1a-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("1A");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_1a_button.png'></img>
        <img className='cam-1b-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("1B");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_1b_button.png'></img>
        <img className='cam-1c-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("1C");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_1c_button.png'></img>
        <img className='cam-2a-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("2A");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_2a_button.png'></img>
        <img className='cam-2b-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("2B");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_2b_button.png'></img>
        <img className='cam-3-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("3");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_3_button.png'></img>
        <img className='cam-4a-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("4A");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_4a_button.png'></img>
        <img className='cam-4b-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("4B");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_4b_button.png'></img>
        <img className='cam-5-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("5");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_5_button.png'></img>
        <img className='cam-6-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("6");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_6_button.png'></img>
        <img className='cam-7-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("7");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_7_button.png'></img>
        <img className='camera-feed-image' draggable={false} id='cameraFeed' src='ASSETS/TEXTURES/CAMERA/camera_map.png'></img>
        </div>
    </div>
    </>);
}