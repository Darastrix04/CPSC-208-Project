import Door from "./Door";

export default class DoorSwitch {
    private switch: HTMLImageElement;
    private isDoorClosed: boolean = false;
    private isLightOn: boolean = false;
    private side: string;
    private door: Door;

    constructor(switchSide: HTMLImageElement) {
        if(switchSide.id == "leftSwitch") {
            this.side = "left";
        } else {
            this.side = "right";
        }
        this.door = new Door(document.getElementById(`${this.side}Door`) as HTMLImageElement);
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
                this.toggleDoor();
            }
        } else {
            this.toggleLight();
        }
        this.toggleSwitch();
    }
    

    public toggleDoor(): void {
        this.door.toggleDoor();
        this.isDoorClosed = !this.isDoorClosed;
    }

    public toggleLight(): void {
        this.isLightOn = !this.isLightOn;
    }



    public toggleSwitch() {
        const basedLinePath = "/ASSETS/TEXTURES/OFFICE/switches/switch_"
            if (this.isLightOn && this.isDoorClosed) {
                this.switch.src = `${basedLinePath}${this.side}_door&light_on.png`;
                document.getElementById("topLayer")!.setAttribute("src", `/ASSETS/TEXTURES/OFFICE/office_${this.side}_empty.png`);
            } else if (this.isDoorClosed) {
                this.switch.src = `${basedLinePath}${this.side}_door_on.png`;
            } else if (this.isLightOn) {
                this.switch.src = `${basedLinePath}${this.side}_light_on.png`;
                document.getElementById("topLayer")!.setAttribute("src", `/ASSETS/TEXTURES/OFFICE/office_${this.side}_empty.png`);
            } else {
                this.switch.src = `${basedLinePath}${this.side}_door&light_off.png`;
            }
    }

    private officeLightUpdates(): void {

    }

    //     //UPDATE VIEWS FROM LIGHT
    //     if (updated[SWITCH_CONTROL.LEFT_LIGHT]) {
    //         if(animatronics[0].getPos() == "2B") {
    //             document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_bonnie.png";
    //         } else {
    //             document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_left_empty.png";
    //         }
    //     } else if (updated[SWITCH_CONTROL.RIGHT_LIGHT]) {
    //         document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_right_empty.png";
    //     } else {
    //         document.getElementById("topLayer").src = "/ASSETS/TEXTURES/OFFICE/office_top_layer.png";
    //     }

    //     //UPDATE VISUAL DOOR STATES
    //     if (index == SWITCH_CONTROL.LEFT_DOOR && updated[index] !== isSwitchOn[index]) {
    //         toggleDoor("left", updated[index]);
    //     }
    //     if (index == SWITCH_CONTROL.RIGHT_DOOR && updated[index] !== isSwitchOn[index]) {
    //         toggleDoor("right", updated[index]);
    //         setTimeout(()=> {

    //         }, 3000);
    //     }
        
    //     //PLAYS DOOR CLOSING SOUND
    //     if (isSwitchOn[SWITCH_CONTROL.LEFT_DOOR] != updated[SWITCH_CONTROL.LEFT_DOOR] || isSwitchOn[SWITCH_CONTROL.RIGHT_DOOR] != updated[SWITCH_CONTROL.RIGHT_DOOR]) {
    //         audioHandler.playSFX(audioHandler.SFX.door_close);
    //     }
    // setSwitch(updated);
}