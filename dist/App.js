import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from "react";
import PageController from "./PageController";
import { createRoot } from "react-dom/client";
import PageProvider from "./PageProvider";
import Animatronic from "./Animatronics/Animatronic";
import GlobalProvider from "./GlobalProvider";
function App() {
    return (_jsx(PageProvider, { children: _jsx(GlobalProvider, { children: _jsx(PageController, {}) }) }));
}
const main = document.getElementById("main");
if (main) {
    const root = createRoot(main);
    root.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
}
//# sourceMappingURL=App.js.map