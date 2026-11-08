import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { PageContext, Pages } from "./PageContext";
function PageProvider({ children }) {
    const [display, setDisplay] = useState(Pages.MainMenu);
    const value = { display, setDisplay };
    return (_jsx(PageContext.Provider, { value: { display, setDisplay }, children: children }));
}
export default PageProvider;
//# sourceMappingURL=PageProvider.js.map