import camFeed from "../Camera";
import audioHandler from "../SFX";
import Animatronic from "./Animatronic";
import MoveNode from "./MoveNode";



class Foxy extends Animatronic{
    readonly moveInt: number = 6;
    private position: number = 0;
    constructor(difficulty: string, night: number) {
        super(difficulty, night);
        switch(night) {
            case 1:
                this.aiLvl = 0;
                break
            case 2:
                this.aiLvl = 1;
                break;
            case 3:
                this.aiLvl = 2;
                break;
            case 4:
                this.aiLvl = 6;
                break;
            case 5:
                this.aiLvl = 5
                break;
            case 6:
                this.aiLvl = 6;
                break;
            default:
                this.aiLvl = 0;
                break;
        }
    }



    public override attack() {
        document.getElementById("cameraMonitor")?.setAttribute("style", "Display: none;");
            console.log("foxy attacked");
            let frame = 1;
            const jumpscare = document.getElementById("topLayer") as HTMLImageElement;
            audioHandler.playSFX(audioHandler.SFX.foxy_scream);
            document.getElementById("leftDoor")?.setAttribute("style", "Display: none;");
            const animation = setInterval(() => {
                jumpscare.src = `ASSETS/TEXTURES/OFFICE/FOXY/${frame}.png`;
                frame++;
                if (frame > 21) {
                    clearInterval(animation);
                }
            }, 40);
        }


    public override move() {
        if(!camFeed.getIsUsingCam() && camFeed.getLastCam() !== "1C") {
            this.position++;
            switch(this.position) {
                case 0: camFeed.updateCamFeed("1C", "ASSETS/TEXTURES/CAMERA/pirate_cove/pirate_cove_1.png");
                break;
                case 1: camFeed.updateCamFeed("1C", "ASSETS/TEXTURES/CAMERA/pirate_cove/pirate_cove_2.png");
                break;
                case 2: camFeed.updateCamFeed("1C", "ASSETS/TEXTURES/CAMERA/pirate_cove/pirate_cove_3.png")
                break;
                case 3: camFeed.updateCamFeed("1C", "ASSETS/TEXTURES/CAMERA/pirate_cove/pirate_cove_4.png")
                break;
        }
        if(this.position === 4) {
            camFeed.setFoxyRun(true);
        }
    }
}

    public getPosition(): number {
        return this.position;
    }

    public setPosition(pos:number) {
        this.position = pos;
    }

    override aiReaval(hr: number): void {
        switch(hr) {
            case 3:
                this.aiLvl++;
              break;
            case 4: 
                this.aiLvl++;
                break;       
        }
    }

    override toString(): string {
        return "foxy";
    }

}


export default Foxy;