import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import audioHandler from './src/SFX';
import Animatronic from './src/Animatronic';
import Bonnie from './src/Bonnie';
import camFeed from './src/Camera';


const animatronics = [];

function GameMenu() {
    //SAVE FILE
    const save = JSON.parse(localStorage.getItem("save")) || {
        night: 1,
        difficulty: "normal",
        volume: 100
    };
    //PROPERTIES
    const SECONDS = 90; //how many seconds equal 1 hr
    const isAtDoor = false;
    const timeAtDoor = 0;
    const [isSwitchOn, setSwitch] = useState([false, false, false, false]); //switch on or off states
    const [display, setDisplay] = useState("main"); // displays certain scenes
    const [night, setNight] = useState(save.night); // night counter
    const [difficulty, setDifficulty] = useState(save.difficulty); //difficulty variable
    const [volume, setVolume] = useState(save.volume); //volume variable
    const [time, setTime] = useState(0); //seconds counter
    const [hr, setHr] = useState(12); //hr counter
    const [battery, setBattery] = useState(100); //Sets Battery Energy To 100%
    //ENUM FOR SWITCHES
    const SWITCH_CONTROL = {
        LEFT_DOOR: 0,
        LEFT_LIGHT: 1,
        RIGHT_DOOR: 2,
        RIGHT_LIGHT: 3
    };




    /*                   ALL FUNCTIONS TO DO WITH THE SWITCHES AND BATTERY BAR                  */



    /*                   CHECKS POS OF CLICKS WITHIN IMG and SENDS INFO TO TOGGLESWITCH FUNCTION           */
    function switchClick(event) {
        const button = event.currentTarget.getBoundingClientRect(); //gets img position and dimensions
        const X = event.clientX - button.left; //gets relative x cord position starting from left of img 
        const Y = event.clientY - button.top; //gets relative y cord position starting from top of img
        if (X >= button.width * 0.20 && X <= button.width * 0.86 && Y >= button.height * 0.16 && Y <= button.height * 0.86) {
            if (event.currentTarget.id == "rightSwitch") {
                toggleSwitch(Y < button.height / 2 ? SWITCH_CONTROL.RIGHT_DOOR : SWITCH_CONTROL.RIGHT_LIGHT);
            } else {
                toggleSwitch(Y < button.height / 2 ? SWITCH_CONTROL.LEFT_DOOR : SWITCH_CONTROL.LEFT_LIGHT);
        }
    }
}


    /*      FUNCTION TO DECREMENT BATTERY        */
    function useBattery() {
        let drainRate = 0;
        for (let i = 0; i < isSwitchOn.length; i++) {
            if (isSwitchOn[i] == true) {
                if (i == SWITCH_CONTROL.LEFT_DOOR || i == SWITCH_CONTROL.RIGHT_DOOR) {
                    drainRate += 0.08;
                } else {
                    drainRate += 0.05;
                }
            }
        }
        if(drainRate > 0) {
            document.getElementById('batteryColor').setAttribute("class", "text-bg-danger");
        } else {
            document.getElementById('batteryColor').setAttribute("class", "text-bg-success");
        }
        setBattery(prev => Math.max(0, prev - drainRate)); //Applies battery drain rate and ensures it doesn't go below 0
    }


    /*    CHANGES IMG TO REFLECT CLICKS ON SWITCHES         */
    function toggleSwitch(index, pressed = null) {
        const updated = [...isSwitchOn];
        updated[index] = pressed == null ? !updated[index] : pressed;
        //LEFT SIDE SWITCHES
        if (index == SWITCH_CONTROL.LEFT_DOOR || index == SWITCH_CONTROL.LEFT_LIGHT) {
            if (updated[SWITCH_CONTROL.LEFT_DOOR] && updated[SWITCH_CONTROL.LEFT_LIGHT]) {
                document.getElementById("leftSwitch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_left_door&light_on.png";
            } else if (updated[SWITCH_CONTROL.LEFT_DOOR]) {
                document.getElementById("leftSwitch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_left_door_on.png";
            } else if (updated[SWITCH_CONTROL.LEFT_LIGHT]) {
                document.getElementById("leftSwitch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_left_light_on.png";
            } else {
                document.getElementById("leftSwitch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_left_door&light_off.png";
            }
        //RIGHT SIDE SWITCHES
        } else {
            if (updated[SWITCH_CONTROL.RIGHT_DOOR] && updated[SWITCH_CONTROL.RIGHT_LIGHT]) {
                document.getElementById("rightSwitch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_on.png";
            } else if (updated[SWITCH_CONTROL.RIGHT_DOOR]) {
                document.getElementById("rightSwitch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_right_door_on.png";
            } else if (updated[SWITCH_CONTROL.RIGHT_LIGHT]) {
                document.getElementById("rightSwitch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_right_light_on.png";
            } else {
                document.getElementById("rightSwitch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_off.png";
            }
        }
        //UPDATE VIEWS FROM LIGHT
        if (updated[SWITCH_CONTROL.LEFT_LIGHT]) {
            if(animatronics[0].getPos() == "2B") {
                document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_bonnie.png";
            } else {
                document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_left_empty.png";
            }
        } else if (updated[SWITCH_CONTROL.RIGHT_LIGHT]) {
            document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_right_empty.png";
        } else {
            document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_top_layer.png";
        }

        //UPDATE VISUAL DOOR STATES
        if (index == SWITCH_CONTROL.LEFT_DOOR && updated[index] !== isSwitchOn[index]) {
            toggleDoor("left", updated[index]);
        }
        if (index == SWITCH_CONTROL.RIGHT_DOOR && updated[index] !== isSwitchOn[index]) {
            toggleDoor("right", updated[index]);
            setTimeout(()=> {

            }, 3000);
        }
        
        //PLAYS DOOR CLOSING SOUND
        if (isSwitchOn[SWITCH_CONTROL.LEFT_DOOR] != updated[SWITCH_CONTROL.LEFT_DOOR] || isSwitchOn[SWITCH_CONTROL.RIGHT_DOOR] != updated[SWITCH_CONTROL.RIGHT_DOOR]) {
            audioHandler.playSFX(audioHandler.SFX.door_close);
        }
    setSwitch(updated);
}


    //UPON RELEASE OF LIGHT SWITCH REVERT BACK TO OFF
    function releaseSwitch(event) {
        if (event.currentTarget.id == "rightSwitch") {
            toggleSwitch(SWITCH_CONTROL.RIGHT_LIGHT, false);
            audioHandler.stopSFX(audioHandler.SFX.light);
        } else {
            toggleSwitch(SWITCH_CONTROL.LEFT_LIGHT, false);
            audioHandler.stopSFX(audioHandler.SFX.light);
        }
    }

    /*////////////////////////////END OF SWITCHES/BATTERY BAR//////////////////////////////////////////////////*/



    /*             DOOR ANIMATIONS               */
    function toggleDoor(door, closing) {
        const interval = 50;
        const frames = 8;
        let currFrame = closing ? 1 : 8;
        let doorId;
        let doorImgPath;
        if (door == "left") {
            doorId = document.getElementById("leftDoor");
            doorImgPath = "/ASSETS/TEXTURES/OFFICE/doors/door_left_";
        } else {
            doorId = document.getElementById("rightDoor");
            doorImgPath = "/ASSETS/TEXTURES/OFFICE/doors/door_right_";
        }
        function loop() {
            if (currFrame > frames || currFrame < 1) {
                clearInterval(animation);
                doorId.src = `${doorImgPath}${closing ? "closed" : "normal"}.png`;
                return;
            }
            doorId.src = `${doorImgPath}closing_frame_${currFrame}.png`;
            closing ? currFrame++ : currFrame--;
        }
        const animation = setInterval(loop, interval);
        loop();
    }







    /*                                USE EFFECTS / HOOKS                               */



   /*           Tracks seconds        */
    useEffect(() => {
        if (display == "game" || display == "camera") {
            const interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [display]);

   /*          Adds hour after 90 seconds              */
    useEffect(() => {
        // if(isAtDoor) {
        //     timeAtDoor++;
        //     if(timeAtDoor > 5) {

        //     }
        // }


        //Animatronic Movement
        animatronics.forEach(anim => {
            if (time % anim.moveInt == 0 && time != 0) {
                if(anim.canMove()) {
                    anim.move();
                    camFeed.setCameraFeed(camFeed.getLastCam());
                }
                // if(anim.getPos() == "2B") {
                //     isAtDoor = true;
                // } else {
                //     isAtDoor = false;
                //     timeAtDoor = 0;
                // }
            }
        });

        if (time % SECONDS == 0 && time != 0) {
            setHr(prev => (prev + 1) % 12);
            if (hr == 6) {
                setNight(prev => prev + 1);
            }
        }
        
    }, [time]);



    useEffect(() => {
        save.night = night;
        setTime(0);
        setHr(12);
        if(night > 1) {
            //trigger ending night cutscene
        }
    }, [night]);

    

    // Checks for Updates on Switch toggles 
    useEffect(() => {
        const interval = setInterval(() => {
            useBattery();
        }, 100);
        return () => clearInterval(interval);
    }, [isSwitchOn]);



    
    // Checks for Updatses on Battery lvl
       useEffect(() => {
        //PLAYS AUDIO FOR LIGHT SWITCHES WHILE ON
        if (isSwitchOn[SWITCH_CONTROL.LEFT_LIGHT] || isSwitchOn[SWITCH_CONTROL.RIGHT_LIGHT]) {
            audioHandler.playSFX(audioHandler.SFX.light);
        }
        if (battery == 0) {
            //TRIGGER DEATH ENDING HERE!
        }
    }, [battery]);


    //updates difficulty based on changes in options menu and when night Progresses
    useEffect(() => {
    localStorage.setItem("save", JSON.stringify({
        night: night,
        difficulty: difficulty,
        volume: volume
    }));
}, [night, difficulty, volume]);


    //updates volume based on changes in options menu
    useEffect(() => {
        Object.values(audioHandler.SFX).forEach(sfx => {
            sfx.volume = volume / 100;
        });
        save.volume = volume;
    }, [volume])



    //look around
    useEffect(() => {
    if (display != "game") {
        return;
    }

    const viewport = document.getElementById("viewport");
    const scene = document.getElementById("scene");

    let targetX = 0;
    let currentX = 0;
    let maxPan = 0;
    let init = false;

    function mouseMovment(event) {
        const rect = viewport.getBoundingClientRect();
        const mouseX = Math.max(0, Math.min(1,
            (event.clientX - rect.left) / rect.width
        ));
        targetX = -mouseX * maxPan;
    }

    function animate() {
        currentX += (targetX - currentX) * 0.12;
        scene.style.transform = `translateX(${currentX}px)`;
        requestAnimationFrame(animate);
    }

    function updateBounds() {
        let prevPan = maxPan;
        maxPan = Math.max(0, scene.offsetWidth - viewport.clientWidth);
        if (!init) {
            targetX = -maxPan / 2;
            currentX = targetX;
            init = true;
        } else if (prevPan != maxPan) {
            if(prevPan > 0){
                targetX = targetX / prevPan * maxPan;
                currentX = currentX / prevPan * maxPan;inital
            }
        }
        scene.style.transform = `translateX(${currentX}px)`;
    }
    updateBounds();
    viewport.addEventListener("mousemove", mouseMovment);
    document.getElementById("topLayer").addEventListener("load", updateBounds);
    animate();
}, [display]);











    /*////////////////////////////////////////END OF USE EFFECTS///////////////////////////////////*/






    /*                            MAIN MENU FUNCTIONS                                    */

    function newGame() {
        setTime(0);
        setHr(12);
        setNight(1);
        audioHandler.playSFX(audioHandler.SFX.click);
        animatronics[0] = new Bonnie(difficulty, night);
        setDisplay("game");
    }
    function continueGame() {
        audioHandler.playSFX(audioHandler.SFX.click);
        //placeholder for action to continue a saved game
    }
    function optionsMenu() {
        audioHandler.playSFX(audioHandler.SFX.click);
        setDisplay("options");
    }


    /*////////////////////////////END OF MAIN MENU FUNCTIONS////////////////////////////////*/


   /*                         SWITCH STATEMENTS FOR GOING BETWEEN SCENES                    */
    switch(display) {
        case "main":
    return (
        <>
        <video className="background-video" autoPlay loop playsInline muted>
            <source src="ASSETS/VIDEOS/main_menu_background.mp4" type="video/mp4" />                                       {/* BACKGROUND VIDEO */}  
        </video>
        <div className="main-menu">
            <div id="title" className="h1 title ms-4 text-white">
                Five Nights at Freddy's                                                                                    {/*TITLE*/}
            </div>
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" onClick={newGame}>NEW GAME</button>               {/*NEW GAME BUTTON*/}
            </div>
            {/* <div className="align-menu-button"> */}
                {/* <button className="h2 mx-5 my-5 text-white flat-button" onClick={continueGame}>CONTINUE</button>           CONTINUE GAME BUTTON */}
            {/* </div> */}
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" onClick={optionsMenu}>OPTIONS</button>             {/*OPTIONS BUTTON*/}
            </div>
            </div>
            
        </>
    );
    break;
    case "options":
        return (
        <>
        <video className="background-video" autoPlay loop playsInline muted>
            <source src="ASSETS/VIDEOS/main_menu_background.mp4" type="video/mp4" />                                       {/* BACKGROUND VIDEO */}  
        </video>
        <div className="main-menu">
            <div id="title" className="h1 title text-white"><button className='flat-button' onClick={() => {audioHandler.playSFX(audioHandler.SFX.click); setDisplay("main");}}>{'<'}</button>Options</div>
            <div className="settingsText">CURRENT NIGHT: {night}</div>
            <div className='settingsText'>
                <div>Difficulty: {difficulty}
                    <button className='flat-button mx-3' onClick={() => {setDifficulty('easy'); audioHandler.playSFX(audioHandler.SFX.click);}}>easy</button>
                    <button className='flat-button mx-3' onClick={() => {setDifficulty('normal'); audioHandler.playSFX(audioHandler.SFX.click);}}>normal</button>          
                    <button className='flat-button mx-3' onClick={() => {setDifficulty('hard'); audioHandler.playSFX(audioHandler.SFX.click);}}>hard</button>
                </div>
            </div>
            <div className='settingsText'>
                <div>Volume:
                    <button className='flat-button mx-5' onClick={() => {setVolume(Math.max(volume - 5, 0)); audioHandler.playSFX(audioHandler.SFX.click);}}>{'<'}</button>
                    <span>{volume}</span>
                    <button className='flat-button mx-5' onClick={() => {setVolume(Math.min(volume + 5, 100)); audioHandler.playSFX(audioHandler.SFX.click);}}>{'>'}</button>
                </div>
            </div>
            <div className='settingsText'>
                <button className='delete-button' onClick={() => {
                    if (window.confirm("Are you sure you want to delete your save?")) {
                        localStorage.removeItem("save");
                        setNight(1);
                        setDifficulty("normal");
                        setVolume(100);
                        audioHandler.playSFX(audioHandler.SFX.click);
                        }
                    }
                    }>DELETE SAVE DATA</button>
            </div>
        </div>
        </>
    );
    break;
    case "camera":
    case "game":
    return (
        <>
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
                onPointerDown={switchClick}
                onPointerUp={releaseSwitch}
                draggable={false}
                />
                <img
                src="/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_off.png"
                id="rightSwitch"
                className="right-switch user-select-none"
                onPointerDown={switchClick}
                onPointerUp={releaseSwitch}
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
            if (display == "game") {
                camFeed.show();
                setDisplay("camera");
            } else {
                camFeed.close();
                setDisplay("game");
                audioHandler.playSFX(audioHandler.SFX.cam_down);
            }
        }}
        draggable={false}
    />
</div>
        </>
    );
}
}





const root = createRoot(
    document.getElementById('root')
);

root.render(<GameMenu />); //renders main menu