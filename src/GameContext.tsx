import React, { createContext, useContext } from "react";
import type Animatronic from "./Animatronics/Animatronic";



export interface GameContextType {
    time: number;
    setTime: (time: number) => void;
    hr: number;
    setHr: (hr: number) => void;
    isUsingCam: boolean,
    setIsUsingCam: (isUsingCam: boolean) => void,
    SECONDS: number,
    setBattery: (hr: number) => void,
    battery: number,
    isAtLeftDoor: boolean,
    isAtRightDoor: boolean,
    setAtLeftDoor: (isAtDoor: boolean) => void,
    setAtRightDoor: (isAtDoor: boolean) => void
}

const GameContext = createContext<GameContextType | null>(null);

const useGame = () => {
    const context = useContext(GameContext);
    if(!context) {
        throw new Error("");
    }
    return context as GameContextType;
}


export { useGame, GameContext };
