import Animatronic from "./Animatronic";
class Chicka extends Animatronic {
    moveInt = 4980;
    constructor(difficulty, night) {
        super(difficulty, night);
        switch (night) {
            case 1:
                this.aiLvl = 0;
                break;
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
    move() {
    }
    aiReaval(hr) {
        switch (hr) {
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
    toString() {
        return "chica";
    }
}
export default Chicka;
//# sourceMappingURL=Chicka.js.map