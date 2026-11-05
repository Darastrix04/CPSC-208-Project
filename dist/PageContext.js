import React, { createContext, useContext } from "react";
var Pages;
(function (Pages) {
    Pages[Pages["MainMenu"] = 0] = "MainMenu";
    Pages[Pages["Game"] = 1] = "Game";
    Pages[Pages["Options"] = 2] = "Options";
})(Pages || (Pages = {}));
const PageContext = createContext(null);
function usePage() {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error("usePage must be used inside a PageProvider");
    }
    return context;
}
export { Pages, PageContext, usePage };
//# sourceMappingURL=PageContext.js.map