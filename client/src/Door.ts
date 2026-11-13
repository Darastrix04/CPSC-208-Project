import audioHandler from "./SFX";

export default class Door {
    private door: HTMLImageElement;
    private isOpen: boolean = true;
    private isAnimating: boolean = false;
    private basePath: string;

    constructor(door: HTMLImageElement) {
        this.door = door;
        if(door.id == "leftDoor") {
            this.basePath = "/ASSETS/TEXTURES/OFFICE/doors/door_left_";
        } else {
            this.basePath = "/ASSETS/TEXTURES/OFFICE/doors/door_right_";
        }

    }

    public toggleDoor(): void {
        audioHandler.playSFX(audioHandler.SFX.door_close);
        if (this.isAnimating) {
            return;
        }
        if (this.isOpen) {
            this.closeDoor();
        } else {
            this.openDoor();
        }
    }

    private openDoor(): void {
        this.isAnimating = true;
        let frame = 8;

        const animation = setInterval(() => {
            this.door.src = `${this.basePath}closing_frame_${frame}.png`;
            frame--;

            if (frame < 1) {
                clearInterval(animation);
                this.door.src = `${this.basePath}normal.png`;

                this.isOpen = true;
                    this.isAnimating = false;
                
            }
        }, 50);
    }

    private closeDoor(): void {
        this.isAnimating = true;
        let frame = 1;

        const animation = setInterval(() => {
            this.door.src = `${this.basePath}closing_frame_${frame}.png`;
            frame++;

            if (frame > 8) {
                clearInterval(animation);
                this.door.src = `${this.basePath}closed.png`;

                this.isOpen = false;
                setTimeout(() => {
                    this.isAnimating = false;
                }, 2000);
            }
        }, 50);
    }

    public getIsOpen(): boolean {
        return this.isOpen;
    }

    public getIsAnimating(): boolean {
        return this.isAnimating;
    }
}