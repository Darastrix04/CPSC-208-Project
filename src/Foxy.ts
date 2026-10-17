import Animatronic from "./Animatronic";

class Foxy extends Animatronic{
    readonly moveInt: number = 5020; //interval paused if looking at his camera
    constructor(position: number, difficulty: number, night: number) {
        super(position, difficulty, night);
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
                this.aiLvl = 5;
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
        if(this.canMove() && this.position != 4) {
            this.position++;
        } else if(this.position == 4) {
            this.attack();
        }
    }

}


export default Foxy;