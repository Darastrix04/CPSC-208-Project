import React, { createContext, useContext } from "react";



export interface GlobalContextType {
    night: number;
    setNight: (night: number) => void;
    difficulty: string;
    setDifficulty: (difficulty: string) => void;
    volume: number;
    setVolume: (volume: number) => void;
    pid: string;
    setPid: (pid: string) => void;
    ws: WebSocket;
    setWs: (ws: WebSocket) => void;
    clickPid: string;
    setClickPid: (clickPid: string) => void;
    selectedLobby: string | null;
    setSelectedLobby: (lobby: string | null) => void;
    maxNight: number;
    setMaxNight: (night: number) => void;
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
