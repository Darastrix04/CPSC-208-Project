import { useEffect, useState } from "react";
import { useGlobal } from "./GlobalContext";
import { Pages, usePage } from "./PageContext";
import audioHandler from "./SFX";


export default function Options() {
    const {setDisplay} = usePage();
    const {night, setNight, difficulty, setDifficulty, setVolume, volume, maxNight} = useGlobal();
    const [selectedNight, setSelectedNight] = useState<number>();
    const nightArray: number[] = [];
    for (let i = 1; i <= maxNight; i++) {
        nightArray.push(i);
    }

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
            <div id="title" className="h1 title text-white"><button className='flat-button' onClick={() => {audioHandler.playSFX(audioHandler.SFX.click); setNight(selectedNight as number); setDisplay(Pages.MainMenu);}}>{'<'}</button>Options</div>
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
                <div className="dropdown h1 my-3">
                    <button className="flat-button dropdown-toggle text-bg-dark text-light" type="button" id="dropDownLevels" data-bs-toggle="dropdown" aria-expanded="false">
                        Night Selector
                    </button>
                    <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropDownLevels">
                        {
                        nightArray.map(nightsel => (
                            <button
                            key={nightsel}
                            className="dropdown-item h2"
                            onClick={() => {
                                setSelectedNight(nightsel);
                                audioHandler.playSFX(audioHandler.SFX.click);
                            }}
                            >
                                Night {nightsel}
                                </button>
                            ))}
                            </div>
                            <div className="text-light my-3">
                                Selected Night: {selectedNight}
                            </div>
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