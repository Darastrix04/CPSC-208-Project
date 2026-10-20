import Animatronic from "./Animatronic";

class Freddy extends Animatronic{
    readonly moveInt: number = 3020;

    constructor(position: number, difficulty: number, night: number) {
        super(position, difficulty, night);
        switch (night) {
            case 1: 
                this.aiLvl = 0;
                break;
            case 2: 
                this.aiLvl = 0;
                break;
            case 3: 
                this.aiLvl = 1;
                break;
            case 4: 
                this.aiLvl;
                break;    
            case 5: 
                this.aiLvl = 4;
                break;
            case 6: 
                this.aiLvl = 4;
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
    }

    override toString(): string {
        return "freddy";
    }

}


export default Freddy;