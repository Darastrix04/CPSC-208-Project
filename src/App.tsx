import { useState } from "react";
import PageController from "./PageController";
import PageProvider from "./PageProvider";
import Animatronic from "./Animatronics/Animatronic";



//SAVE FILE
    export const save = JSON.parse(localStorage.getItem("save")!) || {
        night: 1,
        difficulty: "normal",
        volume: 100
    };
//PROPERTIES
    export const [night, setNight] = useState(save.night); // night counter
    export const [difficulty, setDifficulty] = useState(save.difficulty); //difficulty variable
    export const [volume, setVolume] = useState(save.volume); //volume variable
    //ENUM FOR SWITCHES
    const SWITCH_CONTROL = {
        LEFT_DOOR: 0,
        LEFT_LIGHT: 1,
        RIGHT_DOOR: 2,
        RIGHT_LIGHT: 3
    };



export default function App() {
    return (
        <PageProvider>
            <PageController />
        </PageProvider>
    );
}