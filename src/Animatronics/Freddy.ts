import camFeed from "../Camera";
import Animatronic from "./Animatronic";
import MoveNode from "./MoveNode";

class Freddy extends Animatronic{
    readonly moveInt: number = 3;
    constructor(difficulty: string, night: number) {
        super(difficulty, night);
        switch(night) {
            case 1:
                this.aiLvl = 0;
                break
            case 2:
                this.aiLvl = 0;
                break;
            case 3:
                this.aiLvl = 1;
                break;
            case 4:
                this.aiLvl = Math.floor(Math.random() * 2);
                break;
            case 5:
                this.aiLvl = 3;
                break;
            case 6:
                this.aiLvl = 4;
                break;
            default:
                this.aiLvl = 0;
                break;
        }
    }


    override move(): void {
        
    }

    override toString(): string {
        return "freddy";
    }

}


export default Freddy;