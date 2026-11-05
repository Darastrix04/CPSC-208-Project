// import Game from "./Game";
import MainMenu from "./MainMenu";
import Options from "./Options";
import { Pages, usePage } from "./PageContext";



export default function PageController() {
    const {display} = usePage();

    switch(display) {
        case Pages.MainMenu:
            return <MainMenu />;
        case Pages.Game:
            // return <Game />;
        case Pages.Options:
            return <Options />;

    }
}