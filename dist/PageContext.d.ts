import React from "react";
declare enum Pages {
    MainMenu = 0,
    Game = 1,
    Options = 2
}
export interface PageContextType {
    display: Pages;
    setDisplay: (page: Pages) => void;
}
declare const PageContext: React.Context<PageContextType | null>;
declare function usePage(): PageContextType;
export { Pages, PageContext, usePage };
//# sourceMappingURL=PageContext.d.ts.map