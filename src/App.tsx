import React, { useState } from "react";
import PageController from "./PageController";
import { createRoot } from "react-dom/client";
import PageProvider from "./PageProvider";
import Animatronic from "./Animatronics/Animatronic";
import GlobalProvider from "./GlobalProvider";



function App() {
    return (
        <PageProvider>
            <GlobalProvider>
                <PageController />
            </GlobalProvider>
        </PageProvider>
    );
}


const main = document.getElementById('main');
if (main) {
    const root = createRoot(main);
    root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    );
}
