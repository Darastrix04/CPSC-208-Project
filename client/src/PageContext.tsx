import React, { createContext, useContext } from "react";


enum Pages {
    MainMenu,
    Game,
    Options,
    MultiPlayer,
    MultiPlayerLobby
}

export interface PageContextType {
    display: Pages;
    setDisplay: (page: Pages) => void;
}

const PageContext = createContext<PageContextType | null>(null);

function usePage(): PageContextType {
    const context = useContext(PageContext);
    if(!context) {
        throw new Error("usePage must be used inside a PageProvider");
    }
    return context;
}

export {Pages, PageContext, usePage};