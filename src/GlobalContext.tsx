import React, { createContext, useContext } from "react";

export const save = JSON.parse(localStorage.getItem("save")!) || {
        night: 1,
        difficulty: "normal",
        volume: 100
    };


export interface GlobalContextType {
    night: number;
    setNight: (night: number) => void;
    difficulty: string;
    setDifficulty: (difficulty: string) => void;
    volume: number;
    setVolume: (volume: number) => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

const useGlobal = () => {
    const context = useContext(GlobalContext);
    if(!context) {
        throw new Error("");
    }
    return context as GlobalContextType;
}


export { useGlobal, GlobalContext };
