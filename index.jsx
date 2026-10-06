function GameMenu() {
    function newGame() {
        //placeholder for action to start a new game
    }
    function continueGame() {
        //placeholder for action to continue a saved game
    }
    function optionsMenu() {
        //placeholder for action to open the options menu
    }
    return (
        <>
            <div className="h1 title ms-4 text-white">
                Five Nights at Freddy's                  {/*TITLE*/}
            </div>
            <div className="align-menu">
                <button className="h2 mx-5 my-5 text-white start" onClick={newGame}>NEW GAME</button>            {/*NEW GAME BUTTON*/}
            </div>
            <div className="align-menu">
                <button className="h2 mx-5 my-5 text-white continue" onClick={continueGame}>CONTINUE</button>    {/*CONTINUE GAME BUTTON*/}
            </div>
            <div className="align-menu">
                <button className="h2 mx-5 my-5 text-white options" onClick={optionsMenu}>OPTIONS</button>       {/*OPTIONS BUTTON*/}
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(<GameMenu />); //renders main menu