import { useEffect, useRef } from "react";
import DoorSwitch from "./DoorSwitch";

export default function DoorSwitches() {
    // HTML elements
    const leftRef = useRef<HTMLImageElement>(null);
    const rightRef = useRef<HTMLImageElement>(null);

    // Class instances
    const leftSwitch = useRef<DoorSwitch | null>(null);
    const rightSwitch = useRef<DoorSwitch | null>(null);

    useEffect(() => {
        if (!leftRef.current || !rightRef.current) return;

        leftSwitch.current = new DoorSwitch(leftRef.current);
        rightSwitch.current = new DoorSwitch(rightRef.current);

        return () => {
            leftSwitch.current = null;
            rightSwitch.current = null;
        };
    }, []);

    return (
        <>
            <img
                ref={leftRef}
                id="leftSwitch"
                className="left-switch"
                src="/ASSETS/TEXTURES/OFFICE/switches/switch_left_door&light_off.png"
                onClick={() => leftSwitch.current?.toggleDoor()}
                draggable={false}
            />

            <img
                ref={rightRef}
                id="rightSwitch"
                className="right-switch"
                src="/ASSETS/TEXTURES/OFFICE/switches/switch_right_door&light_off.png"
                onClick={() => rightSwitch.current?.toggleDoor()}
                draggable={false}
            />
        </>
    );
}