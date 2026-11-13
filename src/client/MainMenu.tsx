import { useEffect } from "react";
import { useGlobal } from "./GlobalContext";
import { Pages, usePage } from "./PageContext";
import audioHandler from "./SFX";
import { useGame } from "./GameContext";


function MainMenu() {
    const {setDisplay} = usePage();
    const {setNight, volume} = useGlobal();


    useEffect(() => {
        Object.values(audioHandler.SFX).forEach(sfx => {
            sfx.volume = volume / 100;
        });
        Object.values(audioHandler.BACKGROUND_SFX).forEach(sfx => {
            sfx.volume = volume / 100;
        });
        audioHandler.playSFX(audioHandler.SFX.main_menu);
    }, []);

    
    return (
        <>
        <div id="cutSceneText" className="cut-scene-text">
            <div>12:00 AM</div>
            <div>1st Night</div>
        </div>
        <img id="cutScene" className="cut-scene" src="ASSETS/TEXTURES/CUTSCENE/beginning.png"/>
        <img id="backgroundCutScene" src="ASSETS/TEXTURES/OFFICE/office_bottom_layer.png" />
        <video className="background-video" id="backGroundVideo" autoPlay loop playsInline muted>
                <source src="ASSETS/VIDEOS/main_menu_background.mp4" type="video/mp4" />                                       {/* BACKGROUND VIDEO */}  
        </video>
        <div className="main-menu" id="mainMenu">
            <div id="title" className="h1 title ms-4 text-white">
                Five Nights at Freddy's                                                                                    {/*TITLE*/}
            </div>
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" id="newGameButton" onClick={() => {
                    audioHandler.playSFX(audioHandler.SFX.click);
                    document.getElementById("backgroundCutScene")?.setAttribute("style", "display: block;");
                    setNight(1);
                    document.getElementById("newGameButton")?.setAttribute("style", "pointer-events: none;");
                    document.getElementById("continueGameButton")?.setAttribute("style", "pointer-events: none;");
                    document.getElementById("optionsButton")?.setAttribute("style", "pointer-events: none;");
                    document.getElementById("mainMenu")?.classList.toggle("main-menu-transition");
                    document.getElementById("cutScene")?.classList.toggle("cut-scene-ease-in");
                    setTimeout(() => {
                        document.getElementById("backGroundVideo")?.setAttribute("style", "display: none;");
                        document.getElementById("cutScene")?.classList.toggle("cut-scene-ease-out");
                        document.getElementById("cutSceneText")?.setAttribute("style", "display: flex;");
                    }, 8000);
                    setTimeout(() => {
                        setDisplay(Pages.Game);
                    }, 15000);
                }}>NEW GAME</button>               {/*NEW GAME BUTTON*/}
            </div>
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" id="continueGameButton" onClick={() => {
                    audioHandler.playSFX(audioHandler.SFX.click);
                    setDisplay(Pages.Game);}}>CONTINUE</button>           {/*CONTINUE GAME BUTTON*/}
            </div>
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" id="optionsButton" onClick={() => {
                    audioHandler.playSFX(audioHandler.SFX.click);
                    setDisplay(Pages.Options);}}>OPTIONS</button>             {/*OPTIONS BUTTON*/}
            </div>
            </div>
            
        </>
    );
}

export default MainMenu;