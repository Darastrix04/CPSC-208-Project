import { useEffect } from "react";
import { useGlobal } from "./GlobalContext";
import { Pages, usePage } from "./PageContext";
import audioHandler from "./SFX";


export default function Options() {
    const {setDisplay} = usePage();
    const {night, setNight, difficulty, setDifficulty, setVolume, volume} = useGlobal();



    useEffect(() => {
        Object.values(audioHandler.SFX).forEach(sfx => {
            sfx.volume = volume / 100;
        });
        Object.values(audioHandler.BACKGROUND_SFX).forEach(sfx => {
            sfx.volume = volume / 100;
        });
    }, [volume]);


    return (
        <>
        <video className="background-video" autoPlay loop playsInline muted>
            <source src="ASSETS/VIDEOS/main_menu_background.mp4" type="video/mp4" />                                       {/* BACKGROUND VIDEO */}  
        </video>
        <div className="main-menu">
            <div id="title" className="h1 title text-white"><button className='flat-button' onClick={() => {audioHandler.playSFX(audioHandler.SFX.click); setDisplay(Pages.MainMenu);}}>{'<'}</button>Options</div>
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
}