import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { PageContext, Pages } from "./PageContext";
import { GlobalContext } from "./GlobalContext";
const GlobalProvider = ({ children }) => {
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
    }, []);
    const value = {
        night,
        setNight,
        difficulty,
        setDifficulty,
        volume,
        setVolume
    };
    return (_jsx(GlobalContext.Provider, { value: value, children: children }));
    // const [display, setDisplay] = useState<Global>(Pages.MainMenu);
    // const value: PageContextType = {display, setDisplay};
    // return (
    //     <PageContext.Provider value={{display, setDisplay}}>
    //         {children}
    //     </PageContext.Provider>
    // );
};
export default GlobalProvider;
//# sourceMappingURL=GlobalProvider.js.map