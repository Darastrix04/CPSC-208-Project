import react from "react";

let page = 0;
export default function Info({ onExit }) {
    const sfx_click = new Audio('ASSETS/SFX/MENU/sfx_menu_confirm.mp3');
    const [selector, setSelector] = react.useState(page);

    function nextPage() {
        sfx_click.play();
        page++;
        setSelector(page);
    }
    function lastPage() {
        sfx_click.play();
        page--;
        setSelector(page);
    }

    if (selector == 0) {
        return (

        <div className="d-flex bg-black justify-content-center align-items-center vh-100">
            <div className="info-menu border border-danger squared p-5 bg-black text-center d-flex flex-column shadow">
                <div className="h1"><u>How to SURVIVE</u></div>

                <div className="h3 my-5 text-white" style={{lineHeight: "2.5"}}>
                    <p>survive till 6am</p>
                    <p><br /></p>
                    <p>You have limited power and EVERYTHING you do uses that power</p>
                    <p><br /></p>
                    <p>There is a camera system you will use to see how close the animatronics are to you</p>
                    <p></p>
                </div>

                <div className="mt-auto">
                <button className="h3 text-white flat-button mx-4" onClick={onExit}>Exit</button> 
                <button className="h3 text-white flat-button mx-4" onClick={nextPage}>Next</button>
                </div>
            </div>
        </div>
        );

    } else if (selector == 1) {
        return (
        <div className="d-flex bg-black justify-content-center align-items-center vh-100">
            <div className="info-menu border border-white rounded p-5 bg-black text-center d-flex flex-column shadow">
                <div className="h1"><u>How to SURVIVE</u></div>

                <div className="h3 my-5 text-white" style={{lineHeight: "2.5"}}>
                    <p>there are 4 animatronics you will have to worry about </p>
                    <p><br /></p>
                    <p style={{ color: "blue"}}>Bonnie The Bunny</p>
                    <p><br /></p>
                    <p style={{ color: "Yellow" }}>Chica The Chicken</p>
                    <p><br /></p>
                    <p style={{ color: "Brown" }}>Freddy Fazbear</p>
                    <p><br /></p>
                    <p style={{ color: "red" }}>Foxy The Pirate</p>
                </div>

                <div className="mt-auto">
                    <button className="h3 text-white flat-button mx-4" onClick={lastPage}>Back</button>
                    <button className="h3 text-white flat-button mx-4" onClick={onExit}>Exit</button> 
                    <button className="h3 text-white flat-button mx-4" onClick={nextPage}>Next</button>
                </div>
            </div>
        </div>
        );

    } else if (selector == 2) {
        return (
        <div className="d-flex bg-black justify-content-center align-items-center vh-100">
            <div className="info-menu border border-white rounded p-5 bg-black text-center d-flex flex-column shadow">
                <div className="h1"><u>How to SURVIVE</u></div>

                <div className="h3 my-5 text-white" style={{lineHeight: "2.5"}}>
                    <p>Bonnie and chica </p>
                    <p><br /></p>
                    <p>these two are practically the same with the only difference being that</p>
                    <p style={{ color: "blue" }}>bonnie goes down the left hall</p>
                    <p style={{ color: "yello" }}>Chica goes down the right hall</p>
                    <p><br /></p>
                    <p>there will be a blindspot right next to your door, make sure to check your door lights to see if they are there
                        if they are, make sure to close your doors immediately and wait for them to leave.
                    </p>
                </div>

                <div className="mt-auto">
                    <button className="h3 text-white flat-button mx-4" onClick={lastPage}>Back</button>
                    <button className="h3 text-white flat-button mx-4" onClick={onExit}>Exit</button> 
                    <button className="h3 text-white flat-button mx-4" onClick={nextPage}>Next</button>
                </div>
            </div>
        </div>
        );
        
    } else if (selector == 3) {
        return (
        <div className="d-flex bg-black justify-content-center align-items-center vh-100">
            <div className="info-menu border border-white rounded p-5 bg-black text-center d-flex flex-column shadow">
                <div className="h1"><u>How to SURVIVE</u></div>

                <div className="h3 my-5 text-white" style={{lineHeight: "2.5"}}>
                    <p>Freddy and foxy</p>
                    <p><br /></p>
                    <p>these two force you to check on the cameras regularly</p>
                    <p style={{ color: "red" }}>foxy will be stationed on cam 1C where he has 
                        4 stages, you wanna watch out for when he is off the stage, after that stage he will sprint down the left hallway 
                        close the door quickly and stop him from getting in.
                    </p>
                    <p style={{ color: "brown" }}>Freddy is very quick and ruthless, he goes down the same hallway as chica. When freddy reaches your left door he will relentlessly attack that door for the rest of the night</p>
                    <p><br /></p>
                    <p>while they may sound difficult what you can do to prevent these things from happeneing is by stalling them,
                        neither of them like being seen on the cams, so when you pull up the camera it will prevent both of them from moving for a certain amount of time.
                    </p>
                </div>

                <div className="mt-auto">
                    <button className="h3 text-white flat-button mx-4" onClick={lastPage}>Back</button>
                    <button className="h3 text-white flat-button mx-4" onClick={onExit}>Exit</button> 
                </div>
            </div>
        </div>
        );
    }
}