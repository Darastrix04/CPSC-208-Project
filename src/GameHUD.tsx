
import { useGame } from "./GameContext";

export default function GameHUD() {
    const { battery } = useGame();

    return (
        <>
        <div className="battery-bar-container" id="batteryBar">
            <div className="text-white battery-text text-center">
                Power Left: {Math.round(battery)}%
            </div>

            <div className="progress battery-bar bg-transparent border border-white rounded-3">
                <div
                    id="batteryColor"
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${Math.max(0, Math.min(100, battery))}%` }}
                    aria-valuenow={battery}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
        </div>
        </>
    );
}
