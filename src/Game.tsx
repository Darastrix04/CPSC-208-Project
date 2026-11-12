import { useEffect, useMemo, useRef } from "react";
import {Pages, usePage } from "./PageContext";
import Animatronic from "./Animatronics/Animatronic";
import { useGlobal } from "./GlobalContext";
import audioHandler from "./SFX";
import camFeed from "./Camera";
import DoorSwitch from "./DoorSwitch";
import { useGame } from "./GameContext";
import Bonnie from "./Animatronics/Bonnie";
import Chicka from "./Animatronics/Chicka";
import Foxy from "./Animatronics/Foxy";
import Door from "./Door";
import Freddy from "./Animatronics/Freddy";
import CameraView from "./CameraView";
import GameHUD from "./GameHUD";
    
export default function Game() {
    const isAnimatronicAttacking = useRef(false);
    const foxyDmg = useRef(1);
    const leftSwitch = useRef<DoorSwitch | null>(null);
    const rightSwitch = useRef<DoorSwitch | null>(null);

    
    const {setDisplay, display} = usePage();
    const {night, setNight, difficulty, volume} = useGlobal();
    const {setHr,pause, hr,SECONDS,time, setTime,battery,setBattery,isUsingCam,setIsUsingCam, isAtLeftDoor, isAtRightDoor, setAtLeftDoor, setAtRightDoor} = useGame();

    const animatronics = useMemo<Animatronic[]>(() => {
        return [new Bonnie(difficulty, night), new Chicka(difficulty, night), new Foxy(difficulty,night), new Freddy(difficulty, night)];
    }, [night, display]);
    
    
    //Things that start up once and never again
    useEffect(() => {
        const left = document.getElementById("leftSwitch") as HTMLImageElement | null;
        const right = document.getElementById("rightSwitch") as HTMLImageElement | null;
        if (left && right) {
            leftSwitch.current = new DoorSwitch(left);
            rightSwitch.current = new DoorSwitch(right);
        }

        Object.values(audioHandler.SFX).forEach(sfx => {
            sfx.volume = volume / 100;
        });
        Object.values(audioHandler.BACKGROUND_SFX).forEach(sfx => {
            sfx.volume = volume / 100;
        });

        audioHandler.playSFX(audioHandler.SFX.ballast_humming);
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


    useEffect(() => {
        if(battery === 0 && animatronics[0]!.isActive() == true) {
            outOfPowerSequence();
        }
    }, [battery]);




    async function outOfPowerSequence() {
        isAnimatronicAttacking.current = true;
        if(camFeed.getIsUsingCam()) {
            camFeed.close();
        }
        document.getElementById("topLayer")?.setAttribute("src", "/ASSETS/TEXTURES/OFFICE/office_dark.png");
        document.getElementById("leftSwitch")?.setAttribute("style", "Display: none;");
        document.getElementById("leftDoor")?.setAttribute("style", "Display: none;");
        document.getElementById("rightDoor")?.setAttribute("style", "Display: none;");
        document.getElementById("rightSwitch")?.setAttribute("style", "Display: none;");
        document.getElementById("cameraMonitor")?.setAttribute("style", "Display: none;");
        document.getElementById("batteryBar")?.setAttribute("style", "Display: none;");
        document.getElementById("nightNumbers")?.setAttribute("style", "Display: none;");
        if(leftSwitch.current?.getIsDoorClosed()) {
            leftSwitch.current?.toggleDoor();
        }
        if(rightSwitch.current?.getIsDoorClosed()) {
            rightSwitch.current.toggleDoor();
        }
        await pause(100);
        audioHandler.stopAllSFX();
        audioHandler.stopBackGround();
        audioHandler.playSFX(audioHandler.SFX.power_down);
        await pause(16000);
        audioHandler.playSFX(audioHandler.SFX.freddy_power_down);
        const jumpscare = document.getElementById("topLayer") as HTMLImageElement;
        for (let frame = 0; frame < 82; frame++) {
            jumpscare!.src = frame % 2 === 0 ? "/ASSETS/TEXTURES/OFFICE/office_freddy.png" : "/ASSETS/TEXTURES/OFFICE/office_dark.png";
            await pause(40 + Math.floor(Math.random() * 20));
        }
        await pause(5000);
        audioHandler.stopAllSFX();
        pause(Math.floor(Math.random() * 15));
        animatronics[3]?.attack();
        await pause(1400);
        animateStatic();
        await pause(7000);
        onDeathCleanUp();
        setDisplay(Pages.MainMenu);
    }



    async function foxyAttemptAttack(anim:Foxy, timeWait: number): Promise<void> {
        await pause(timeWait);
        if(!leftSwitch.current?.getIsDoorClosed()) {
            if(camFeed.getIsUsingCam()) {
                camFeed.close();
            }
            anim.attack();
            await pause(900);
            animateStatic();
            await pause(7000);
            onDeathCleanUp();
            setDisplay(Pages.MainMenu);
        } else {
            foxyDmg.current += 5;
            setBattery(Math.max(battery - foxyDmg.current, 0));
            audioHandler.playSFX(audioHandler.SFX.foxy_knocking);
            console.log("foxy attepted an attack");
            anim.setPosition(0);
            camFeed.updateCamEmpty("1C");
            isAnimatronicAttacking.current = false;
        }
    }


    async function freddyAttemptAttack(anim:Freddy, timeWait: number): Promise<void> {
        await pause(timeWait);
        if(!rightSwitch.current?.getIsDoorClosed()) {
            if(camFeed.getIsUsingCam()) {
                camFeed.close();
            }
            anim.attack();
            await pause(1400);
            animateStatic();
            await pause(7000);
            onDeathCleanUp();
            setDisplay(Pages.MainMenu);
        } else {
            anim.toggleAttacking();
            console.log("freddy attepted an attack");
            anim.move();
            isAnimatronicAttacking.current = false;
        }
    }



    async function bonnieOrChicaAttemptAttack(anim:Bonnie | Chicka, timeWait: number): Promise<void> {
        if(!leftSwitch.current?.getIsDoorClosed()) {
            await pause(timeWait);
            if(camFeed.getIsUsingCam()) {
                camFeed.close();
            }
            anim.attack();
            anim instanceof Bonnie ? await pause(880) : await pause(1280);
            animateStatic();
            await pause(7000);
            onDeathCleanUp();
            setDisplay(Pages.MainMenu);
        } else {
            anim.toggleAttacking();
            if(anim instanceof Bonnie) {
                document.getElementById("leftDoor")?.setAttribute("style", "pointer-events: all;");
                anim.forceMove("2B");
                anim.forceMove("2A");
                anim.forceMove("1B");
                console.log("bonnie attempted an attack");
            } else {
                anim.forceMove("4B");
                anim.forceMove("4A");
                console.log("chica attempted an attack");
            }
            isAnimatronicAttacking.current = false;
        }
    }



    function onDeathCleanUp() {
        camFeed.resetAllCams();
        audioHandler.stopAllSFX();
        audioHandler.stopBackGround();
    }


   /*          Adds hour after 90 seconds              */
    useEffect(() => {
        //draining battery rate
        if(leftSwitch.current?.getIsDoorClosed() !== undefined) {
            setBattery(Math.max(battery - ((leftSwitch.current?.getIsDoorClosed() ? (night * 0.10) : 0) + (leftSwitch.current?.getIsLightOn() ? (night * 0.15) : 0) + (rightSwitch.current?.getIsDoorClosed() ? (night * 0.10) : 0) + (rightSwitch.current?.getIsLightOn() ? (night * 0.15) : 0) + (camFeed.getIsUsingCam() ? (night * 0.15) : 0)), 0));
        }
        //Animatronic Movement and Attacking
        animatronics.forEach(anim => {
            if(anim.isActive()) {
                if (anim instanceof Foxy && anim.getPosition() >= 3 && !isAnimatronicAttacking.current) {
                isAnimatronicAttacking.current = true;
                camFeed.setFoxyRun(false);
                foxyAttemptAttack(anim, camFeed.getFoxyRun() === false ? 2400 : 15000);
            }
            if (time % anim.getMoveInt()! === 0 && time != 0) {

                if(((anim instanceof Bonnie && anim.getPos() === "leftDoor") || (anim instanceof Chicka && anim.getPos() === "rightDoor")) && anim.getLastTurnAtDoor() && !isAnimatronicAttacking.current) {
                    anim.toggleAttacking();
                    document.getElementById("leftSwitch")?.setAttribute("style", "pointer-events: none;");
                    isAnimatronicAttacking.current = true;
                    bonnieOrChicaAttemptAttack(anim, camFeed.getIsUsingCam() === true ? 0 : 20000);
                }

                if(anim instanceof Freddy && anim.getPos() === "rightDoor" && anim.getLastTurnAtDoor() && !isAnimatronicAttacking.current) {
                    anim.toggleAttacking();
                    isAnimatronicAttacking.current = true;
                    freddyAttemptAttack(anim, Math.floor(Math.random() * 6));
                }

                if(!anim.isAttacking() && anim.canMove()) {
                    anim.move();
                    camFeed.setCameraFeed(camFeed.getLastCam());
                }
                if(anim.getLastTurnAtDoor() && anim instanceof Bonnie) {
                    setAtLeftDoor(true);
                } else if(anim.getLastTurnAtDoor() && anim instanceof Chicka) {
                    setAtRightDoor(true);
                }
            }
        }
        });


        //hr increment
        if (time % SECONDS === 0 && time !== 0) {
            const nextHr = (hr % 12) + 1;
            setHr(nextHr);
                if (nextHr === 6) {
                    if(leftSwitch.current?.getIsDoorClosed()) {
                        leftSwitch.current?.toggleDoor();
                    }
                    if(leftSwitch.current?.getIsLightOn()) {
                        leftSwitch.current?.toggleLight(isAtLeftDoor);
                    }
                    if(rightSwitch.current?.getIsDoorClosed()) {
                        rightSwitch.current?.toggleDoor();
                    }
                    if(rightSwitch.current?.getIsLightOn()) {
                        rightSwitch.current?.toggleLight(isAtRightDoor);
                    }
                    animatronics.forEach(anim => {
                        anim.deactivate();
                    });
                    victoryCutscene();
                }
            }
        }, [time]);




    useEffect(() => {
        audioHandler.playSFX(audioHandler.SFX.ballast_humming);
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
        camFeed.resetAllCams();
        setBattery(100);
        setTime(0);
        setHr(12);
    }, [night]);

    const victoryCutscene = async (): Promise<void> => {
        audioHandler.stopAllSFX();
        audioHandler.stopBackGround();
        if(camFeed.getIsUsingCam() == true) {
            camFeed.close();
        }
        document.getElementById("gameView")?.setAttribute("style", "display: none;");
        document.getElementById("cutSceneText")?.setAttribute("style", "display: block;");
        document.getElementById("backgroundCutScene")?.setAttribute("style", "display: block;");
        audioHandler.playSFX(audioHandler.SFX.victory_bell);
        await pause(10000);
        document.getElementById("cutSceneHr")!.textContent = "6 AM"
        audioHandler.playSFX(audioHandler.SFX.victory_cheer);
        await pause(3000);
        if(night + 1 == 6) {
            document.getElementById("cutSceneText")?.setAttribute("style", "display: none;");
            document.getElementById("backgroundCutScene")?.setAttribute("src", "ASSETS/TEXTURES/CUTSCENE/good_ending.png");
            document.getElementById("backGroundCutscene")?.classList.toggle("cut-scene-ease-in");
            await pause(10000);
            setDisplay(Pages.MainMenu);
        }
        document.getElementById("cutSceneText")?.classList.toggle("cut-scene-ease-out");
        document.getElementById("cutSceneHr")!.textContent = "12:00 AM"
        document.getElementById("cutSceneNightText")!.textContent = `night ${night + 1}`;
        await pause(5000);
        document.getElementById("cutSceneText")?.setAttribute("style", "display: none;");
        document.getElementById("gameView")?.setAttribute("style", "display: block;");
        document.getElementById("backgroundCutScene")?.setAttribute("style", "display: none;");
        setNight(night + 1);
    };

    function animateStatic() {
        let frame = 1;
        let repeatFrames = 8; 
        audioHandler.playSFX(audioHandler.SFX.death_static);
        const staticAnim = document.getElementById("staticScene") as HTMLImageElement;
        document.getElementById("gameView")?.setAttribute("style", "display: none;");
        staticAnim.setAttribute("style", "display: block;")
        const animationStatic = setInterval(() => {
        staticAnim.src = `/ASSETS/TEXTURES/STATIC/static_${frame}.png`;
        frame++;
        if (frame > 7) {
            repeatFrames--;
            frame = 1;
            if(repeatFrames === 0) {
                staticAnim.src = "/ASSETS/TEXTURES/CUTSCENE/termination_ending.png";
                audioHandler.stopAllSFX();
                clearInterval(animationStatic);
            }
        }
        }, 40);
    }











    useEffect(() => {
    
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
    <CameraView />
    <div id="cutSceneText" className="cut-scene-text">
        <div id="cutSceneHr">
            5 AM
        </div>
        <div id="cutSceneNightText">
            night {night}
        </div>
    </div>
    <img id="staticScene" src="ASSETS/TEXTURES/OFFICE/office_bottom_layer.png"/>
    <img id="backgroundCutScene" src="ASSETS/TEXTURES/OFFICE/office_bottom_layer.png"/>
    <div id="gameView">
        <GameHUD />
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
                onPointerDown={(event) => {leftSwitch.current?.checkClickPostion(event.clientX, event.clientY, false, isAtLeftDoor)}}
                onPointerUp={(event) => {leftSwitch.current?.checkClickPostion(event.clientX, event.clientY, true, isAtLeftDoor)}}
                draggable={false}
                />
                <img
                src="/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_off.png"
                id="rightSwitch"
                className="right-switch user-select-none"
                onPointerDown={(event) => {rightSwitch.current?.checkClickPostion(event.clientX, event.clientY, false, isAtRightDoor)}}
                onPointerUp={(event) => {rightSwitch.current?.checkClickPostion(event.clientX, event.clientY, true, isAtRightDoor)}}
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
        </div>
        </>
    );
}


