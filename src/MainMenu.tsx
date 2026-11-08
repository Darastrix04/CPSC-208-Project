import { Pages, usePage } from "./PageContext";


function MainMenu() {
    const {setDisplay} = usePage();
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
                <button className="h2 mx-5 my-5 text-white flat-button" onClick={() => {setDisplay(Pages.Game);}}>NEW GAME</button>               {/*NEW GAME BUTTON*/}
            </div>
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" onClick={() => {setDisplay(Pages.Game);}}>CONTINUE</button>           {/*CONTINUE GAME BUTTON*/}
            </div>
            <div className="align-menu-button">
                <button className="h2 mx-5 my-5 text-white flat-button" onClick={() => {setDisplay(Pages.Options);}}>OPTIONS</button>             {/*OPTIONS BUTTON*/}
            </div>
            </div>
            
        </>
    );
}

export default MainMenu;