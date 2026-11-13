import { useGame } from "./GameContext";
import { useGlobal } from "./GlobalContext";


export default function GameHUD() {
    const {battery, hr} = useGame();
    const {night} = useGlobal();


    return(
    <div id="HUD">
    <div className="battery-bar-container" id="batteryBar">
    <div className="text-white battery-text text-center">Power Left: {Math.round(battery)}%</div>                       {/*BATTERY/POWER USAGE BAR*/}
    <div className="progress battery-bar bg-transparent border border-white rounded-3">
        <div id="batteryColor" className="text-bg-success" style={{ width: `${battery}%` }}></div>
    </div>
    </div>
    <div className='nightText' id="nightNumbers">NIGHT: {night}
        <div className='timeText'>{hr} AM</div>
    </div>
    </div>
    );
}