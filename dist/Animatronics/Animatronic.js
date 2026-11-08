import camFeed from "../Camera";
class Animatronic {
    // Properties
    active;
    difficulty;
    night;
    aiLvl = 0;
    pos;
    constructor(difficulty, night) {
        this.active = false;
        this.difficulty = difficulty;
        this.night = night;
        this.aiLvl;
    }
    canMove() {
        let rand = Math.round(Math.random() * 20);
        if (rand <= this.aiLvl) {
            console.log("is able to move");
            return true;
        }
        console.log("Attmepted to move");
        return false;
    }
    getPos() {
        if (this.pos !== undefined) {
            return this.pos.getName();
        }
        else {
            console.log("position not available");
            return "position not available";
        }
    }
    move() {
    }
    aiReaval(hr) {
    }
    attack() {
        this.active = false;
        console.log(this.toString(), "is attacking!");
    }
    getNight() {
        if (this.night != null || this.night != undefined) {
            return this.night;
        }
        return undefined;
    }
    getAiLvl() {
        return this.aiLvl;
    }
    setAiLvl(lvl) {
        if (lvl <= 20 && lvl >= 0) {
            this.aiLvl = lvl;
        }
    }
    activate() {
        this.active = true;
    }
    deactivate() {
        this.active = false;
    }
}
export default Animatronic;
//# sourceMappingURL=Animatronic.js.map