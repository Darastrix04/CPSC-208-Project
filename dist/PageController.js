import { jsx as _jsx } from "react/jsx-runtime";
import Game from "./Game";
import MainMenu from "./MainMenu";
import Options from "./Options";
import { Pages, usePage } from "./PageContext";
export default function PageController() {
    const { display } = usePage();
    switch (display) {
        case Pages.MainMenu:
            return _jsx(MainMenu, {});
        case Pages.Game:
            return _jsx(Game, {});
        case Pages.Options:
            return _jsx(Options, {});
    }
}
//# sourceMappingURL=PageController.js.map