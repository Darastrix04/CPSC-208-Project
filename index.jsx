import { createRoot } from 'react-dom/client';
function GameMenu() {
    const sfx_click = new Audio('ASSETS/SFX/MENU/sfx_menu_confirm.mp3'); //preloads audio for menu selection
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
    return (
        <>
        <video className="background-video" autoPlay loop playsInline muted>
            <source src="ASSETS/VIDEOS/main_menu_background.mp4" type="video/mp4" />                                {/* BACKGROUND VIDEO */}  
        </video>
        <div class="main-menu">
            <div className="h1 title ms-4 text-white">
                Five Nights at Freddy's                                                                             {/*TITLE*/}
            </div>
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" onClick={newGame}>NEW GAME</button>         {/*NEW GAME BUTTON*/}
            </div>
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" onClick={continueGame}>CONTINUE</button>    {/*CONTINUE GAME BUTTON*/}
            </div>
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" onClick={optionsMenu}>OPTIONS</button>      {/*OPTIONS BUTTON*/}
            </div>
        </div>
        </>
    );
}

const root = createRoot(
    document.getElementById('root')
);

root.render(<GameMenu />); //renders main menu