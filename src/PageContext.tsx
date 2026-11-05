import React, { createContext, useContext } from "react";


export enum Pages {
    MainMenu,
    Game,
    Options
}

export interface PageContextType {
    display: Pages;
    setDisplay: (page: Pages) => void;
}

export const PageContext = createContext<PageContextType | null>(null);

export function usePage(): PageContextType {
    const context = useContext(PageContext);
    if(!context) {
        throw new Error("usePage must be used inside a PageProvider");
    }
    return context;
}