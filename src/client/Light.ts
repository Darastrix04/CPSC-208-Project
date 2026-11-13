import audioHandler from "./SFX";

export default class Light {
    private isOn: boolean = false;
    private side: string;


    constructor(side: string) {
        this.side = side;
    }

    public toggleLight(isAtDoor: boolean): void {
        if(this.isOn) {
            this.lightOff(isAtDoor);
        } else {
            this.lightOn(isAtDoor);
        }
    }

    private lightOn(isAtDoor: boolean): void {
        audioHandler.playSFX(audioHandler.SFX.light);
        switch (this.side) {
            case "left":
                if (isAtDoor) {
                    audioHandler.playSFX(audioHandler.SFX.light_jumpscare);
                    document.getElementById("topLayer")!.setAttribute("src", "ASSETS/TEXTURES/OFFICE/office_bonnie.png");
                } else {
                    document.getElementById("topLayer")!.setAttribute("src", "ASSETS/TEXTURES/OFFICE/office_left_empty.png");
                }
                break;
                case "right":
                    if (isAtDoor) {
                        audioHandler.playSFX(audioHandler.SFX.light_jumpscare);
                        document.getElementById("topLayer")!.setAttribute("src", "ASSETS/TEXTURES/OFFICE/office_chica.png");
                    } else {
                        document.getElementById("topLayer")!.setAttribute("src", "ASSETS/TEXTURES/OFFICE/office_right_empty.png");
                    }
                    break;
                }
                this.isOn = true;
            }

    private lightOff(isAtDoor: boolean): void {
        audioHandler.stopSFX(audioHandler.SFX.light);
        document.getElementById("topLayer")!.setAttribute("src", `/ASSETS/TEXTURES/OFFICE/office_top_layer.png`);
        this.isOn = false;
    }

    public getIsOn(): boolean {
        return this.isOn;
    }
}