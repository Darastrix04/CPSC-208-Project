import React, { createContext, useContext } from "react";



export interface GameContextType {
    time: number;
    setTime: (time: number) => void;
    hr: number;
    setHr: (hr: number) => void;
    isUsingCam: boolean,
    SECONDS: number,
    setBattery: (hr: number) => void,
    battery: number,
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
