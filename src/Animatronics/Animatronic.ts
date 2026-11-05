
import camFeed from "../Camera";
import MoveNode from "../MoveNode";
class Animatronic {
    // Properties
    private active: boolean;
    private difficulty: number;
    private night: number;
    aiLvl: number = 0;
    private pos: MoveNode;


    constructor(difficulty: number, night: number) {
        this.active = false;
        this.difficulty = difficulty;
        this.night = night;
        this.aiLvl;
    }

    public canMove(): boolean{
        let rand : number = Math.round(Math.random() * 20);
        if (rand <= this.aiLvl) {
            console.log("is able to move");
            return true;
        }
        console.log("Attmepted to move");
        return false;
    }

    public getPos(): string {
        return this.pos.getName();
    }


    public move(): void {

    }

    public aiReaval(hr: number): void {

    }
    
    public attack(): void {
        this.active = false; 
        console.log(this.toString(), "is attacking!");
    }

    getNight(): number | undefined {
        if(this.night != null || this.night != undefined) {
            return this.night;
        }
        return undefined;
    }

    getAiLvl(): number {
        return this.aiLvl;
    }

    setAiLvl(lvl: number) {
        if(lvl <= 20 && lvl >= 0) {
            this.aiLvl = lvl;
        }
    }

    activate(): void {
        this.active = true;
    }

    deactivate(): void {
        this.active = false;
    }
}

export default Animatronic;
