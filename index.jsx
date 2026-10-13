import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
const sfx_light_on = new Audio('ASSETS/SFX/office/light/BallastHumMedium2.wav'); //load audio outside of function to prevent issues with overlapping audio
sfx_light_on.loop = true;
function GameMenu() {
    //SAVE FILE
    const save = JSON.parse(localStorage.getItem("save")) || {
        night: 1,
        difficulty: "normal",
        volume: 100
    };
    //PROPERTIES
    const [switches, setSwitches] = useState([false, false, false, false]);
    const [night, setNight] = useState(save.night);
    const [time, setTime] = useState(0);
    const [hr, setHr] = useState(12);
    const sfx_click = new Audio('ASSETS/SFX/MENU/sfx_menu_confirm.mp3'); //preloads audio for menu selection
    const sfx_door_close = new Audio('ASSETS/SFX/office/door/SFXBible_12478.wav');
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
        for (let i = 0; i < switches.length; i++) {
            if (switches[i] == true) {
                if (i < 2) {
                    drainRate += 0.25; //drain rate for light
                } else {
                    drainRate += 0.5; //drain rate for door
                }
            }
        }
        if(drainRate > 0) {
            document.getElementById('battery-color').setAttribute("class", "text-bg-danger");
        } else {
            document.getElementById('battery-color').setAttribute("class", "text-bg-success");
        }
        setBattery(batteryPer => Math.max(0, batteryPer - drainRate)); //Applies battery drain rate and ensures it doesn't go below 0
    }

    /*    CHANGES IMG TO REFLECT CLICKS         */
    function toggleSwitch(index) {
        const updated = [...switches];
        updated[index] = !updated[index]; //toggles boolean value
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
        if(switches[SWITCH_CONTROL.LEFT_DOOR] != updated[SWITCH_CONTROL.LEFT_DOOR] || switches[SWITCH_CONTROL.RIGHT_DOOR] != updated[SWITCH_CONTROL.RIGHT_DOOR]) {
            sfx_door_close.play();
        }
        setSwitches(updated);
    }


    function light_sfx(){
        if (switches[SWITCH_CONTROL.LEFT_LIGHT] || switches[SWITCH_CONTROL.RIGHT_LIGHT]) {
            if (sfx_light_on.paused) {
                sfx_light_on.play();
            }
        } else {
            sfx_light_on.pause();
            sfx_light_on.currentTime = 0;
        }
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

   /*          Adds hours after 90 seconds              */
    useEffect(() => {
        if (time % 2 == 0 && time != 0) {
            setHr(prev => (prev + 1) % 12);
            if (hr == 6) {
                setNight(prev => prev + 1);
            }
        }
    }, [time]);



    useEffect(() => {
        //auto save after night is over
        save.night = night;
        localStorage.setItem("save", JSON.stringify(save));
        setTime(0);
        setHr(12);
        //trigger ending night cutscene
    }, [night]);

    

    // Checks for Updates on Switch toggles and Plays Light SFX 
    useEffect(() => {
        const interval = setInterval(() => {
            useBattery();
        }, 100);
        light_sfx();
        return () => clearInterval(interval);
    }, [switches]);



    
    // Checks for Updatses on Battery lvl
       useEffect(() => {
        if (battery == 0) {
            //TRIGGER DEATH ENDING HERE!
        }
    }, [battery]);










    /*////////////////////////////////////////END OF USE EFFECTS///////////////////////////////////*/






    /*                            MAIN MENU FUNCTIONS                                    */

    function newGame() {
        sfx_click.play();
        //placeholder for action to start a new game
    }
    function continueGame() {
        sfx_click.play();
        //placeholder for action to continue a saved game
    }
    function optionsMenu() {
        sfx_click.play();
        //placeholder for action to open the options menu
    }


    /*////////////////////////////END OF MAIN MENU FUNCTIONS////////////////////////////////*/











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
            <div className='nightText'>NIGHT: {night}
                <div className='timeText'>{hr} AM</div>
            </div>
            <div className="position-fixed m-4 battery-bar">
                <div className="text-white text-center mb-1">Power Left: {Math.round(battery)}%</div>                       {/*BATTERY/POWER USAGE BAR*/}
                <div className="progress bg-transparent border border-white rounded-3">
                    <div id="battery-color" className="text-bg-success" style={{ width: `${battery}%` }}></div>
                    </div>
            </div>
            <img src="/ASSETS/TEXTURES/OFFICE/switches/switch_left_door&light_off.png" id="left_switch" className="left-switch user-select-none" onClick={switchClick}/>
            <img src="/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_off.png" id="right_switch" className="right-switch user-select-none" onClick={switchClick}/>
        </div>
        </>
    );
}

const root = createRoot(
    document.getElementById('root')
);

root.render(<GameMenu />); //renders main menu