import Animatronic from "./Animatronic";

class Chicka extends Animatronic{
    readonly moveInt: number = 4980;
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
                this.aiLvl = 5;
                break;
            case 4:
                this.aiLvl = 4;
                break;
            case 5:
                this.aiLvl = 7;
                break;
            case 6:
                this.aiLvl = 12;
                break;
            default:
                this.aiLvl = 0;
                break;
        }
    }


    override move(seconds: number): void {
        if (seconds === 5 && this.canMove()) {
            this.position++;
        }
        //each character has their own movement variations
    }

    override aiReaval(hr: number): void {
        switch(hr) {
            case 2:
                this.aiLvl++;
              break;
            case 3: 
                this.aiLvl++;
                break;
            case 4: 
                this.aiLvl++;
                break;       
        }
    }

    override toString(): string {
        return "chica";
    }

}


export default Chicka;