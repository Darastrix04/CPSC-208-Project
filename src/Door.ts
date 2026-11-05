import React from "react";

class Door {


    private door: HTMLImageElement;
    private isOpen: boolean = false;

    constructor(door: HTMLImageElement) {
        this.door = door;
    }


    public openDoor() {
        if(this.isOpen!) {
            let frame = 1;
            let baseLinePath;
            if(this.door.id == "leftDoor") {
                baseLinePath = "/ASSETS/TEXTURES/OFFICE/doors/door_left_";
            } else {
                baseLinePath = "/ASSETS/TEXTURES/OFFICE/doors/door_right_";
            }
            const animation = setInterval(() => {
                this.door.src = `${baseLinePath}${frame}.png`;
                frame++;
                if (frame > 8) {
                    this.door.src = `${baseLinePath}closed.png`;
                    clearInterval(animation);
                }
            }, 50);
            this.isOpen = true;
        }
    }

    public closeDoor() {
        if(this.isOpen) {
            let frame = 8;
            let baseLinePath;
            if(this.door.id == "leftDoor") {
                baseLinePath = "/ASSETS/TEXTURES/OFFICE/doors/door_left_";
            } else {
                baseLinePath = "/ASSETS/TEXTURES/OFFICE/doors/door_right_";
            }
            const animation = setInterval(() => {
                this.door.src = `${baseLinePath}${frame}.png`;
                frame++;
                if (frame < 1) {
                    clearInterval(animation);
                }
            }, 50);
            this.isOpen = false;
        }
    }
}