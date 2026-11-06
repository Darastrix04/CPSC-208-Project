export default class DoorSwitch {
    private switchSide: HTMLImageElement;
    private doorOn: boolean = false;

    constructor(switchSide: HTMLImageElement) {
        this.switchSide = switchSide;
    }

    public toggleDoor(): void {
        this.doorOn = !this.doorOn;
        this.updateImage();
    }

    private updateImage(): void {
        const side = this.switchSide.id === "leftSwitch"
            ? "left"
            : "right";

        const state = this.doorOn
            ? "door_on"
            : "door&light_off";

        this.switchSide.src =
            `/ASSETS/TEXTURES/OFFICE/switches/switch_${side}_${state}.png`;
    }
}