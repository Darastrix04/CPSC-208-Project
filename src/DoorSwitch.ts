import type Animatronic from "./Animatronics/Animatronic";
import Door from "./Door";
import Light from "./Light";
import audioHandler from "./SFX";

export default class DoorSwitch {
    private switch: HTMLImageElement;
    private isDoorClosed: boolean = false;
    private isLightOn: boolean = false;
    private side: string;
    private light: Light;
    private door: Door;

    constructor(switchSide: HTMLImageElement, isAtDoor: boolean) {
        if(switchSide.id == "leftSwitch") {
            this.side = "left";
            
        } else {
            this.side = "right";
        }
        this.door = new Door(document.getElementById(`${this.side}Door`) as HTMLImageElement);
        this.light = new Light(this.side, isAtDoor);
        this.switch = switchSide;
    }
    public checkClickPostion(X: number, Y: number, isLightRelease: boolean) {
        const button = this.switch.getBoundingClientRect();
        const PosX = X - button.left;
        const PosY = Y - button.top;
        if (
            PosX < button.width * 0.20 ||
            PosX > button.width * 0.86 ||
            PosY < button.height * 0.16 ||
            PosY > button.height * 0.86
        ) {
            return;
        }
        if (PosY < button.height / 2) {
            if(isLightRelease!) {
                if(!this.door.getIsAnimating()) {
                    this.toggleDoor();
                    this.toggleSwitch();
                } else {
                    audioHandler.playSFX(audioHandler.SFX.door_error);
                }
            }
        } else {
            this.toggleLight();
            this.toggleSwitch();
        }
    }
    

    public toggleDoor(): void {
        this.door.toggleDoor();
        this.isDoorClosed = !this.isDoorClosed;
    }

    public toggleLight(): void {
        this.light.toggleLight();
        this.isLightOn = !this.isLightOn;
    }

    public toggleSwitch() {
        const basedLinePath = "/ASSETS/TEXTURES/OFFICE/switches/switch_"
            if (this.isLightOn && this.isDoorClosed) {
                this.switch.src = `${basedLinePath}${this.side}_door&light_on.png`;
            } else if (this.isDoorClosed) {
                this.switch.src = `${basedLinePath}${this.side}_door_on.png`;
            } else if (this.isLightOn) {
                this.switch.src = `${basedLinePath}${this.side}_light_on.png`;
            } else {
                this.switch.src = `${basedLinePath}${this.side}_door&light_off.png`;
            }
    }
}