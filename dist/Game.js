// import { useState } from "react";
// import { usePage } from "./PageContext";
// import Animatronic from "./Animatronics/Animatronic";
// import { night } from "./App";
export {};
// const [time, setTime] = useState(0); //seconds counter
// const [hr, setHr] = useState(12); //hr counter
// const [battery, setBattery] = useState(100); //Sets Battery Energy To 100%
// const SECONDS = 2; //how many seconds equal 1 hr
// const [isSwitchOn, setSwitch] = useState([false, false, false, false]); //switch on or off states
// let animatronics: Animatronic[];
// export default function Game() {
//     const {setCurrentPage} = usePage();
//     return (
//     <>
//         <div id="viewport">
//             <div id="scene">
//                 <img
//                 className="scene-office"
//                 id='topLayer'
//                 src="/ASSETS/TEXTURES/OFFICE/office_top_layer.png"
//                 alt="Game Screen"
//                 draggable={false}
//                 />
//                 <img
//                 src="/ASSETS/TEXTURES/OFFICE/switches/switch_left_door&light_off.png"
//                 id="leftSwitch"
//                 className="left-switch user-select-none"
//                 onPointerDown={switchClick}
//                 onPointerUp={releaseSwitch}
//                 draggable={false}
//                 />
//                 <img
//                 src="/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_off.png"
//                 id="rightSwitch"
//                 className="right-switch user-select-none"
//                 onPointerDown={switchClick}
//                 onPointerUp={releaseSwitch}
//                 draggable={false}
//                 />
//                 <img
//                 src="/ASSETS/TEXTURES/OFFICE/doors/door_left_normal.png"
//                 id="leftDoor"
//                 draggable={false}
//                  />
//             </div>
//         </div>
//             <div className="battery-bar-container">
//             <div className="text-white battery-text text-center">Power Left: {Math.round(battery)}%</div>                       {/*BATTERY/POWER USAGE BAR*/}
//             <div className="progress battery-bar bg-transparent border border-white rounded-3">
//                 <div id="batteryColor" className="text-bg-success" style={{ width: `${battery}%` }}></div>
//                 </div>
//                 </div>
//                 <div className='nightText'>NIGHT: {night}
//                     <div className='timeText'>{hr} AM</div>
//                 </div>
//                 <div id="cameraSection">
//         <img className='camera-scene' id='cameraScene' src=''></img>
//         <div className='camera-map' draggable={false}>
//         <img id='selectedMapButton'/>
//         <img className='camera-map-outline' draggable={false} src='/ASSETS/TEXTURES/CAMERA/camera_outline.png'></img>
//         <img className='cam-1a-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("1A");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_1a_button.png'></img>
//         <img className='cam-1b-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("1B");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_1b_button.png'></img>
//         <img className='cam-1c-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("1C");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_1c_button.png'></img>
//         <img className='cam-2a-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("2A");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_2a_button.png'></img>
//         <img className='cam-2b-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("2B");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_2b_button.png'></img>
//         <img className='cam-3-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("3");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_3_button.png'></img>
//         <img className='cam-4a-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("4A");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_4a_button.png'></img>
//         <img className='cam-4b-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("4B");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_4b_button.png'></img>
//         <img className='cam-5-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("5");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_5_button.png'></img>
//         <img className='cam-6-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("6");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_6_button.png'></img>
//         <img className='cam-7-button' draggable={false} onClick={()=> {camFeed.setCameraFeed("7");}} src='ASSETS/TEXTURES/CAMERA/camera_buttons/camera_7_button.png'></img>
//         <img className='camera-feed-image' draggable={false} id='cameraFeed' src='ASSETS/TEXTURES/CAMERA/camera_map.png'></img>
//         </div>
//         <div className="battery-bar-container">
//             <div className="text-white battery-text text-center">Power Left: {Math.round(battery)}%</div>                       {/*BATTERY/POWER USAGE BAR*/}
//             <div className="progress battery-bar bg-transparent border border-white rounded-3">
//                 <div id="batteryColor" className="text-bg-success" style={{ width: `${battery}%` }}></div>
//                 </div>
//                 </div>
//                 <div className='nightText'>NIGHT: {night}
//                     <div className='timeText'>{hr} AM</div>
//                 </div>
//                 </div>
//                 <div className="camera-button">
//     <img
//         id="cameraMonitor"
//         src="/ASSETS/TEXTURES/OFFICE/camera_button.png"
//         onClick={() => {
//             if (display == "game") {
//                 camFeed.show();
//                 setDisplay("camera");
//             } else {
//                 camFeed.close();
//                 setDisplay("game");
//                 audioHandler.playSFX(audioHandler.SFX.cam_down);
//             }
//         }}
//         draggable={false}
//     />
//     </div>
//     </>
//     );
// }
//# sourceMappingURL=Game.js.map