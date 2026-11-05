import { useEffect, useState } from "react";
import { PageContext, Pages, type PageContextType } from "./PageContext";
import { GlobalContext, type GlobalContextType } from "./GlobalContext";


interface GlobalProvideProps {
    children: React.ReactNode;
}

const GlobalProvider = ({children}: GlobalProvideProps) => {
    const [night, setNight] = useState(1); // night counter
    const [difficulty, setDifficulty] = useState("normal"); //difficulty variable
    const [volume, setVolume] = useState(100); //volume variable
    
    useEffect(() => {
        const localSaveData = localStorage.getItem("save");
        if (localSaveData !== null) {
            const save = JSON.parse(localSaveData);
            setNight(save.night);
            setDifficulty(save.difficulty);
            setVolume(save.volume);
        }
    },[]);
    const value: GlobalContextType = {
        night,
        setNight,
        difficulty,
        setDifficulty,
        volume,
        setVolume
    }
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );

    // const [display, setDisplay] = useState<Global>(Pages.MainMenu);
    // const value: PageContextType = {display, setDisplay};

    // return (
    //     <PageContext.Provider value={{display, setDisplay}}>
    //         {children}
    //     </PageContext.Provider>
    // );
}

export default GlobalProvider;