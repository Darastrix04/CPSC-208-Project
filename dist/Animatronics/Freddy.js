import Animatronic from "./Animatronic";
class Freddy extends Animatronic {
    moveInt = 3020;
    constructor(difficulty, night) {
        super(difficulty, night);
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
    move() {
    }
    toString() {
        return "freddy";
    }
}
export default Freddy;
//# sourceMappingURL=Freddy.js.map