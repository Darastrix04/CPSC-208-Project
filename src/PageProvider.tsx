import { ReactNode, useState } from "react";
import { PageContext, PageContextType, Pages } from "./PageContext";


interface PageProviderProps {
    children: React.ReactNode;
}

function PageProvider({children}: PageProviderProps) {
    const [display, setDisplay] = useState<Pages>(Pages.MainMenu);
    const value: PageContextType = {display, setDisplay};

    return (
        <PageContext.Provider value={{display, setDisplay}}>
            {children}
        </PageContext.Provider>
    );
}

export default PageProvider;