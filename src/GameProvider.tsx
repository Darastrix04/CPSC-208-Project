import { useEffect, useState } from "react";
import { GameContext, type GameContextType } from "./GameContext";


interface GameProvideProps {
    children: React.ReactNode;
}

const GameProvider = ({children}: GameProvideProps) => {
    const SECONDS = 90; //how many seconds equal 1 hr
    const isUsingCam = false;
    const [time, setTime] = useState(0);
    const [hr, setHr] = useState(12);
    const [battery, setBattery] = useState(100);

    const value: GameContextType = {
        time,
        setTime,
        hr,
        setHr,
        isUsingCam,
        SECONDS,
        battery,
        setBattery
    }
    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;