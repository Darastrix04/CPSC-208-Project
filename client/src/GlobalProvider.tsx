
import { useEffect, useState } from "react";
import { GlobalContext, type GlobalContextType } from "./GlobalContext";

interface GlobalProvideProps {
    children: React.ReactNode;
}



const defaultSave = {
    night: 1,
    difficulty: "normal",
    volume: 100
};
const GlobalProvider = ({ children }: GlobalProvideProps) => {const [saveData] = useState(() => {
    try {
        const localSaveData = localStorage.getItem("save");

        return localSaveData ? { ...defaultSave, ...JSON.parse(localSaveData) } : defaultSave;
    } catch {
        return defaultSave;
    }
});

    const [night, setNight] = useState(saveData.night);
    const [maxNight, setMaxNight] = useState(saveData.night);
    const [difficulty, setDifficulty] = useState(saveData.difficulty);
    const [volume, setVolume] = useState(saveData.volume);
    const [pid, setPid] = useState("");
    const [selectedLobby, setSelectedLobby] = useState<string | null>(null);
	const [ws, setWs] = useState<WebSocket>({} as WebSocket);
	const [clickPid, setClickPid] = useState("");

    useEffect(() => {
        const save = {
            night,
            difficulty,
            volume
        };

        localStorage.setItem("save", JSON.stringify(save));
    }, [night, difficulty, volume]);

    const value: GlobalContextType = {
        pid,
        setPid,
        ws, setWs,
        clickPid,
        setClickPid,
        night,
        setNight,
        difficulty,
        setDifficulty,
        volume,
        setVolume,
        selectedLobby,
        setSelectedLobby,
        maxNight,
        setMaxNight
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
