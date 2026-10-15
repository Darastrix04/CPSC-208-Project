import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

//PUT ALL SFX HERE SO THEY CAN BE AFFECTED BY VOLUME CONTROL
const SFX = {
    light: new Audio('./ASSETS/SFX/office/light/BallastHumMedium2.wav'),
    click: new Audio('./ASSETS/SFX/MENU/sfx_menu_confirm.mp3'),
    door_close: new Audio('./ASSETS/SFX/office/door/SFXBible_12478.wav')
};

SFX.light.loop = true;
function GameMenu() {
    //SAVE FILE
    const save = JSON.parse(localStorage.getItem("save")) || {
        night: 1,
        difficulty: "normal",
        volume: 100
    };
    //PROPERTIES
    const SECONDS = 2; //how many seconds equal 1 hr
    const DOOR_DRAIN_RATE = 0.5;
    const LIGHT_DRAIN_RATE = 0.25;
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
            if (event.currentTarget.id == "right_switch") {
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
                    drainRate += DOOR_DRAIN_RATE;
                } else {
                    drainRate += LIGHT_DRAIN_RATE;
                }
            }
        }
        if(drainRate > 0) {
            document.getElementById('battery-color').setAttribute("class", "text-bg-danger");
        } else {
            document.getElementById('battery-color').setAttribute("class", "text-bg-success");
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
                document.getElementById("left_switch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_left_door&light_on.png";
            } else if (updated[SWITCH_CONTROL.LEFT_DOOR]) {
                document.getElementById("left_switch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_left_door_on.png";
            } else if (updated[SWITCH_CONTROL.LEFT_LIGHT]) {
                document.getElementById("left_switch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_left_light_on.png";
            } else {
                document.getElementById("left_switch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_left_door&light_off.png";
            }
        //RIGHT SIDE SWITCHES
        } else {
            if (updated[SWITCH_CONTROL.RIGHT_DOOR] && updated[SWITCH_CONTROL.RIGHT_LIGHT]) {
                document.getElementById("right_switch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_on.png";
            } else if (updated[SWITCH_CONTROL.RIGHT_DOOR]) {
                document.getElementById("right_switch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_right_door_on.png";
            } else if (updated[SWITCH_CONTROL.RIGHT_LIGHT]) {
                document.getElementById("right_switch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_right_light_on.png";
            } else {
                document.getElementById("right_switch").src = "/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_off.png";
            }
        }
        //VIEWS FROM LIGHT
        if (updated[SWITCH_CONTROL.LEFT_LIGHT]) {
            document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_left_empty.png";
        } else if (updated[SWITCH_CONTROL.RIGHT_LIGHT]) {
            document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_right_empty.png";
        } else {
            document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_top_layer.png";
        }
        //PLAYS DOOR CLOSING SOUND
        if (isSwitchOn[SWITCH_CONTROL.LEFT_DOOR] != updated[SWITCH_CONTROL.LEFT_DOOR] || isSwitchOn[SWITCH_CONTROL.RIGHT_DOOR] != updated[SWITCH_CONTROL.RIGHT_DOOR]) {
            playSFX(SFX.door_close);
        }
    setSwitch(updated);
}


    //UPON RELEASE OF LIGHT SWITCH REVERT BACK TO OFF
    function releaseSwitch(event) {
        if (event.currentTarget.id == "right_switch") {
            toggleSwitch(SWITCH_CONTROL.RIGHT_LIGHT, false);
            stopSFX(SFX.light);
        } else {
            toggleSwitch(SWITCH_CONTROL.LEFT_LIGHT, false);
            stopSFX(SFX.light);
        }
    }


    function playSFX(audio) {
        if(!(audio instanceof Audio)) {return;}
        audio.currentTime = 0;
        audio.play();
    }

    function stopSFX(audio) {
        if(!(audio instanceof Audio)) {return;}
        audio.currentTime = 0;
        audio.pause();
    }

    /*////////////////////////////END OF SWITCHES/BATTERY BAR//////////////////////////////////////////////////*/








    /*                                USE EFFECTS / UPDATE TRACKERS                               */



   /*           Tracks seconds        */
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }
)

   /*          Adds hour after 90 seconds              */
    useEffect(() => {
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
        //trigger ending night cutscene
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
            playSFX(SFX.light);
        }
        if (battery == 0) {
            //TRIGGER DEATH ENDING HERE!
        }
    }, [battery]);


    //updates difficulty based on changes in options menu
    useEffect(() => {
    localStorage.setItem("save", JSON.stringify({
        night: night,
        difficulty: difficulty,
        volume: volume
    }));
}, [night, difficulty, volume]);


    //updates volume based on changes in options menu
    useEffect(() => {
        Object.values(SFX).forEach(sfx => {
            sfx.volume = volume / 100;
        });
        save.volume = volume;
    }, [volume])



    //look around in REACT
    useEffect(() => {
    if (display != "game") return;

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
                currentX = currentX / prevPan * maxPan;
            }
        }
        scene.style.transform = `translateX(${currentX}px)`;
    }
    updateBounds();
    viewport.addEventListener("mousemove", mouseMovment);
    document.getElementById("topLayer").addEventListener("load", updateBounds);
    window.addEventListener("resize", updateBounds);
    animate();
}, [display]);










    /*////////////////////////////////////////END OF USE EFFECTS///////////////////////////////////*/






    /*                            MAIN MENU FUNCTIONS                                    */

    function newGame() {
        playSFX(SFX.click);
        setDisplay("game");
    }
    function continueGame() {
        playSFX(SFX.click);
        //placeholder for action to continue a saved game
    }
    function optionsMenu() {
        playSFX(SFX.click);
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
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" onClick={continueGame}>CONTINUE</button>           {/*CONTINUE GAME BUTTON*/}
            </div>
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" onClick={optionsMenu}>OPTIONS</button>             {/*OPTIONS BUTTON*/}
            </div>
        </div>
        </>
    );
    case "options":
        return (
        <>
        <video className="background-video" autoPlay loop playsInline muted>
            <source src="ASSETS/VIDEOS/main_menu_background.mp4" type="video/mp4" />                                       {/* BACKGROUND VIDEO */}  
        </video>
        <div className="main-menu">
            <div id="title" className="h1 title text-white"><button className='flat-button' onClick={() => {playSFX(SFX.click); setDisplay("main");}}>{'<'}</button>Options</div>
            <div className="settingsText">CURRENT NIGHT: {night}</div>
            <div className='settingsText'>
                <div>Difficulty: {difficulty}
                    <button className='flat-button mx-3' onClick={() => {setDifficulty('easy'); playSFX(SFX.click);}}>easy</button>
                    <button className='flat-button mx-3' onClick={() => {setDifficulty('normal'); playSFX(SFX.click);}}>normal</button>          
                    <button className='flat-button mx-3' onClick={() => {setDifficulty('hard'); playSFX(SFX.click);}}>hard</button>
                </div>
            </div>
            <div className='settingsText'>
                <div>Volume:
                    <button className='flat-button mx-5' onClick={() => {setVolume(Math.max(volume - 5, 0)); playSFX(SFX.click);}}>{'<'}</button>
                    <span>{volume}</span>
                    <button className='flat-button mx-5' onClick={() => {setVolume(Math.min(volume + 5, 100)); playSFX(SFX.click);}}>{'>'}</button>
                </div>
            </div>
            <div className='settingsText'>
                <button className='delete-button' onClick={() => {
                    if (window.confirm("Are you sure you want to delete your save?")) {
                        localStorage.removeItem("save");
                        setNight(1);
                        setDifficulty("normal");
                        setVolume(100);
                        playSFX(SFX.click);
                        }
                    }
                    }>DELETE SAVE DATA</button>
            </div>
        </div>
        </>
    );
    case "game":
    return (
        <>
        <div id="viewport">
            <div id="scene">
                <img
                    className="scene-office"
                    id='topLayer'
                    src="/ASSETS/TEXTURES/OFFICE/office_top_layer.png"                                          /* OFFICE PNG */
                    alt="Game Screen"
                    draggable={false}
                />
                <img
                    src="/ASSETS/TEXTURES/OFFICE/switches/switch_left_door&light_off.png"
                    id="left_switch"
                    className="left-switch user-select-none"
                    onPointerDown={switchClick}                                                               /*LEFT SIDE SWITCHES*/
                    onPointerUp={releaseSwitch}
                    draggable={false}
                />
                <img
                    src="/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_off.png"
                    id="right_switch"
                    className="right-switch user-select-none"
                    onPointerDown={switchClick}                                                                /*RIGHT SIDE SWITCHES */
                    onPointerUp={releaseSwitch}
                    draggable={false}
                />
            </div>
        </div>
        <div className="position-fixed m-4 battery-bar">
            <div className="text-white text-center mb-1">Power Left: {Math.round(battery)}%</div>                       {/*BATTERY/POWER USAGE BAR*/}
            <div className="progress bg-transparent border border-white rounded-3">
                <div id="battery-color" className="text-bg-success" style={{ width: `${battery}%` }}></div>
            </div>
        </div>
        <div className='nightText'>NIGHT: {night}
            <div className='timeText'>{hr} AM</div>                                                                      {/*NIGHT/TIME COUNTER*/}
        </div>
        </>
    );
}
}





const root = createRoot(
    document.getElementById('root')
);

root.render(<GameMenu />); //renders main menu