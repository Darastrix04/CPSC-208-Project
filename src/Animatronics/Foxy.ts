import camFeed from "../Camera";
import Animatronic from "./Animatronic";
import MoveNode from "./MoveNode";



class Foxy extends Animatronic{
    readonly moveInt: number = 5.5;
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


    override move(): void {
        this.position++;
        switch(this.position) {
            case 1: camFeed.updateCamFeed("1C", "ASSETS/TEXTURES/CAMERA/pirate_cove/pirate_cove_2.png");
            break;
            case 2: camFeed.updateCamFeed("1C", "ASSETS/TEXTURES/CAMERA/pirate_cove/pirate_cove_3.png")
            break;
            case 3: camFeed.updateCamFeed("1C", "ASSETS/TEXTURES/CAMERA/pirate_cove/pirate_cove_4.png")
            break;
        }
        if(this.position == 4) {
            //send in attack here
            //set timer for 25 seconds
            camFeed.updateCamFeed("1C", "ASSETS/TEXTURES/CAMERA/pirate_cove/pirate_cove_1.png");
            this.position = 0;
        }
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