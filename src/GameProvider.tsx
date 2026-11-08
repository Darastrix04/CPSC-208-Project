import { useEffect, useState } from "react";
import { GameContext, type GameContextType } from "./GameContext";
import Animatronic from "./Animatronics/Animatronic";


interface GameProvideProps {
    children: React.ReactNode;
}

const GameProvider = ({children}: GameProvideProps) => {
    const SECONDS = 90; //how many seconds equal 1 hr
    const [isUsingCam, setIsUsingCam] = useState(false);
    const [time, setTime] = useState(0);
    const [hr, setHr] = useState(12);
    const [battery, setBattery] = useState(100);
    const [isAtLeftDoor, setAtLeftDoor] = useState(false);
    const [isAtRightDoor, setAtRightDoor] = useState(false);

    const value: GameContextType = {
        time,
        setTime,
        hr,
        setHr,
        isUsingCam,
        setIsUsingCam,
        SECONDS,
        battery,
        setBattery,
        setAtLeftDoor,
        setAtRightDoor,
        isAtLeftDoor,
        isAtRightDoor
    }
    
    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;