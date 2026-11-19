
import {type RefObject } from "react";
import DoorSwitch from "./DoorSwitch";
import { useGame } from "./GameContext";

interface OfficeSceneProps {
    leftSwitch: RefObject<DoorSwitch | null>;
    rightSwitch: RefObject<DoorSwitch | null>;
}




export default function OfficeScene({leftSwitch, rightSwitch}: OfficeSceneProps) {

    const {isAtLeftDoor, isAtRightDoor} = useGame();

    return (
        <>
            <img className="scene-office" id="topLayer" src="/ASSETS/TEXTURES/OFFICE/office_top_layer.png" draggable={false}/>
            <img
                src="/ASSETS/TEXTURES/OFFICE/switches/switch_left_door&light_off.png"
                id="leftSwitch"
                className="left-switch user-select-none"
                onPointerDown={(event) => leftSwitch.current?.checkClickPostion(event.clientX, event.clientY, false, isAtLeftDoor)}
                onPointerUp={(event) => leftSwitch.current?.checkClickPostion(event.clientX, event.clientY, true, isAtLeftDoor)}
                draggable={false}
            />
            <img
                src="/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_off.png"
                id="rightSwitch"
                className="right-switch user-select-none"
                onPointerDown={(event) => rightSwitch.current?.checkClickPostion(event.clientX, event.clientY, false, isAtRightDoor)}
                onPointerUp={(event) => rightSwitch.current?.checkClickPostion(event.clientX, event.clientY, true, isAtRightDoor)}
                draggable={false}
            />
            <img
                src="/ASSETS/TEXTURES/OFFICE/doors/door_left_normal.png"
                id="leftDoor"
                className="office-door"
                draggable={false}
            />
            <img
                src="/ASSETS/TEXTURES/OFFICE/doors/door_right_normal.png"
                id="rightDoor"
                className="office-door"
                draggable={false}
            />
        </>
    );
}
