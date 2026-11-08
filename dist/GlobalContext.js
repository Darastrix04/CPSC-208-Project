import React, { createContext, useContext } from "react";
export const save = JSON.parse(localStorage.getItem("save")) || {
    night: 1,
    difficulty: "normal",
    volume: 100
};
const GlobalContext = createContext(null);
const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("");
    }
    return context;
};
export { useGlobal, GlobalContext };
//# sourceMappingURL=GlobalContext.js.map