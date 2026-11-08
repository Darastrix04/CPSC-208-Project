import { useEffect, useMemo } from "react";
import {usePage } from "./PageContext";
import Animatronic from "./Animatronics/Animatronic";
import { useGlobal } from "./GlobalContext";
import audioHandler from "./SFX";
import camFeed from "./Camera";
import DoorSwitch from "./DoorSwitch";
import { useGame } from "./GameContext";
import Bonnie from "./Animatronics/Bonnie";
import Chicka from "./Animatronics/Chicka";
import Foxy from "./Animatronics/Foxy";


let leftSwitch: DoorSwitch;
let rightSwitch: DoorSwitch;
    
export default function Game() {

    const pause = (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    
    const {setDisplay, display} = usePage();
    const {night, setNight, difficulty, volume} = useGlobal();
    const {setHr, hr,SECONDS,time, setTime,battery,setBattery,isUsingCam,setIsUsingCam, isAtLeftDoor, isAtRightDoor, setAtLeftDoor, setAtRightDoor} = useGame();

    const animatronics = useMemo<Animatronic[]>(() => {
        return [new Bonnie(difficulty, night), new Chicka(difficulty, night), new Foxy(difficulty, night)];
    }, [night]);
    
    
    //Things that start up once and never again
    useEffect(() => {
        audioHandler.stopSFX(audioHandler.SFX.main_menu);
        audioHandler.playBackGround();
        return () => {
            audioHandler.stopBackGround();
        }
    }, []);

    
    
    //game timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time + 1);
        }, 1000);
        return () => clearInterval(interval);
    },);

   /*          Adds hour after 90 seconds              */
    useEffect(() => {
        //Animatronic Movement
        animatronics.forEach(anim => {
            if (time % anim.moveInt! == 0 && time != 0) {
                if(anim.canMove()) {
                    anim.move();
                    camFeed.setCameraFeed(camFeed.getLastCam());
                    if(anim.getPos() === "2B") {
                        setAtLeftDoor(true);
                    } else if(anim.getPos() === "4B") {
                        setAtRightDoor(true);
                    } else if(anim instanceof Bonnie) {
                        setAtLeftDoor(false);
                    } else if(anim instanceof Chicka){
                        setAtRightDoor(false);
                    }
                }
            }
        });

        if (time % SECONDS === 0 && time !== 0) {
            const nextHr = (hr % 12) + 1;
            setHr(nextHr);
                if (nextHr === 6) {
                    victoryCutscene();
                }
            }
        }, [time]);



    useEffect(() => {
        switch(night) {
            case 1: 
            audioHandler.playSFX(audioHandler.SFX.night_1_call);
            break;
            case 2:
            audioHandler.playSFX(audioHandler.SFX.night_2_call);
            break;
            case 3:
            audioHandler.playSFX(audioHandler.SFX.night_3_call);
            break;
            case 4:
            audioHandler.playSFX(audioHandler.SFX.night_4_call);
            break;
            case 5:
            audioHandler.playSFX(audioHandler.SFX.night_5_call);
            break;
        }
        setTime(0);
        setHr(12);
    }, [night]);

    const victoryCutscene = async (): Promise<void> => {
        animatronics.forEach(anim => {
            anim.deactivate();
        });
        audioHandler.stopBackGround();
        document.getElementById("gameView")?.setAttribute("style", "display: none;");
        document.getElementById("cutSceneText")?.setAttribute("style", "display: block;");
        document.getElementById("backgroundCutScene")?.setAttribute("style", "display: block;");
        audioHandler.playSFX(audioHandler.SFX.victory_bell);
        await pause(6000);
        document.getElementById("cutSceneHr")!.textContent = "6 AM"
        await pause(5000);
        document.getElementById("cutSceneText")?.setAttribute("style", "display: none;");
        audioHandler.playSFX(audioHandler.SFX.victory_cheer);
        document.getElementById("cutSceneNightText")!.textContent = `night ${night + 1}`;
        await pause(4000);
        document.getElementById("gameView")?.setAttribute("style", "display: block;");
        document.getElementById("cutSceneText")?.setAttribute("style", "display: none;");
        document.getElementById("backgroundCutScene")?.setAttribute("style", "display: none;");
        audioHandler.stopSFX(audioHandler.SFX.night_1_call);
        setNight(night + 1);
    };











    useEffect(() => {
        //DOOR SWITCHES

        leftSwitch = new DoorSwitch(document.getElementById("leftSwitch") as HTMLImageElement, isAtLeftDoor);
        rightSwitch = new DoorSwitch(document.getElementById("rightSwitch") as HTMLImageElement, isAtRightDoor);
        //DOORS
    
        const viewport = document.getElementById("viewport");
        const scene = document.getElementById("scene");
    
        let targetX = 0;
        let currentX = 0;
        let maxPan = 0;
        let init = false;
    
        function mouseMovment(event: MouseEvent) {
            const rect = viewport!.getBoundingClientRect();
            const mouseX = Math.max(0, Math.min(1,
                (event.clientX - rect.left) / rect.width
            ));
            targetX = -mouseX * maxPan;
        }
    
        function animate() {
            currentX += (targetX - currentX) * 0.12;
            scene!.style.transform = `translateX(${currentX}px)`;
            requestAnimationFrame(animate);
        }
    
        function updateBounds() {
            let prevPan = maxPan;
            maxPan = Math.max(0, scene!.offsetWidth - viewport!.clientWidth);
            if (!init) {
                targetX = -maxPan / 2;
                currentX = targetX;
                init = true;
            } else if (prevPan != maxPan) {
                if(prevPan > 0){
                    targetX = targetX / prevPan * maxPan;
                    currentX = currentX / prevPan * maxPan;
                }
            }
            scene!.style.transform = `translateX(${currentX}px)`;
        }
        updateBounds();
        viewport!.addEventListener("mousemove", mouseMovment);
        document.getElementById("topLayer")!.addEventListener("load", updateBounds);
        animate();
    }, [display]);


    return (
    <>
    <div id="cutSceneText" className="cut-scene-text">
        <div id="cutSceneHr">
            5 AM
        </div>
        <div id="cutSceneNightText">
            night {night}
        </div>
    </div>
    <img id="backgroundCutScene" src="ASSETS/TEXTURES/OFFICE/office_bottom_layer.png"/>
    <div id="gameView">
        <div id="viewport">
            <div id="scene">
                <img
                className="scene-office"
                id='topLayer'
                src="/ASSETS/TEXTURES/OFFICE/office_top_layer.png"
                alt="Game Screen"
                draggable={false}
                />
                <img
                src="/ASSETS/TEXTURES/OFFICE/switches/switch_left_door&light_off.png"
                id="leftSwitch"
                className="left-switch user-select-none"
                onPointerDown={(event) => {leftSwitch.checkClickPostion(event.clientX, event.clientY, false)}}
                onPointerUp={(event) => {leftSwitch.checkClickPostion(event.clientX, event.clientY, true)}}
                draggable={false}
                />
                <img
                src="/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_off.png"
                id="rightSwitch"
                className="right-switch user-select-none"
                onPointerDown={(event) => {rightSwitch.checkClickPostion(event.clientX, event.clientY, false)}}
                onPointerUp={(event) => {rightSwitch.checkClickPostion(event.clientX, event.clientY, true)}}
                draggable={false}
                />
                <img
                src="/ASSETS/TEXTURES/OFFICE/doors/door_left_normal.png"
                id="leftDoor"
                className='office-door'
                draggable={false}
                />
                <img
                src="/ASSETS/TEXTURES/OFFICE/doors/door_right_normal.png"
                id="rightDoor"
                className='office-door'
                draggable={false}
                />
            </div>
        </div>
            <div className="battery-bar-container">
            <div className="text-white battery-text text-center">Power Left: {Math.round(battery)}%</div>                       {/*BATTERY/POWER USAGE BAR*/}
            <div className="progress battery-bar bg-transparent border border-white rounded-3">
                <div id="batteryColor" className="text-bg-success" style={{ width: `${battery}%` }}></div>
                </div>
                </div>
                <div className='nightText'>NIGHT: {night}
                    <div className='timeText'>{hr} AM</div>
                </div>
                <div id="cameraSection">

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
        <div className="battery-bar-container">
            <div className="text-white battery-text text-center">Power Left: {Math.round(battery)}%</div>                       {/*BATTERY/POWER USAGE BAR*/}
            <div className="progress battery-bar bg-transparent border border-white rounded-3">
                <div id="batteryColor" className="text-bg-success" style={{ width: `${battery}%` }}></div>
                </div>
                </div>
                <div className='nightText'>NIGHT: {night}
                    <div className='timeText'>{hr} AM</div>
                </div>
                </div>


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
    </div>
    </>
    );
}


