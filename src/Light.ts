import { useState } from "react";
import { useGame } from "./GameContext";

export default class Light {
    private isOn: boolean = false;
    private side: string;
    private isAtDoor: boolean;


    constructor(side: string, isAtDoor: boolean) {
        this.side = side;
        this.isAtDoor = isAtDoor;
    }

    public toggleLight(): void {
        if(this.isOn) {
            this.lightOff();
        } else {
            this.lightOn();
        }
    }

    private lightOn(): void {
        switch (this.side) {
            case "left":
                if (this.isAtDoor) {
                    document.getElementById("topLayer")!.setAttribute("src", "/ASSETS/TEXTURES/OFFICE/office_bonnie.png");
                } else {
                    document.getElementById("topLayer")!.setAttribute("src", "/ASSETS/TEXTURES/OFFICE/office_left_empty.png");
                }
                break;
                case "right":
                    if (this.isAtDoor) {
                        document.getElementById("topLayer")!.setAttribute("src", "/ASSETS/TEXTURES/OFFICE/office_chica.png");
                    } else {
                        document.getElementById("topLayer")!.setAttribute("src", "/ASSETS/TEXTURES/OFFICE/office_right_empty.png");
                    }
                    break;
                }
                this.isOn = true;
            }

    private lightOff(): void {
        document.getElementById("topLayer")!.setAttribute("src", `/ASSETS/TEXTURES/OFFICE/office_top_layer.png`);
        this.isOn = false;
    }

    public getIsOn(): boolean {
        return this.isOn;
    }
}