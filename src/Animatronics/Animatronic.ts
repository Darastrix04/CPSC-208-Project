
import camFeed from "../Camera";
import MoveNode from "./MoveNode";

class Animatronic {
    // Properties
    protected active: boolean = true;
    protected doorDmg = 1;
    protected difficulty: string;
    protected night: number;
    protected aiLvl: number = 0;
    protected lastTurnAtDoor: boolean = false;
    protected attacking: boolean = false;
    protected pos: MoveNode | undefined;
    protected readonly moveInt: number | undefined;


    constructor(difficulty: string, night: number) {
        this.active = true;
        this.difficulty = difficulty;
        this.night = night;
        this.aiLvl;
    }

    public canMove(): boolean {

        let rand : number = Math.round(Math.random() * 20);
        if (rand <= this.aiLvl) {
            console.log("is able to move");
            return true;
        }
        console.log("Attmepted to move");
        return false;
    }
    public getMoveInt(): number {
        if(this.moveInt !== undefined) {
            return this.moveInt;
        } else {
            return 3;
        }
    }

    public getPos(): string {
        if(this.pos !== undefined) {
            return this.pos.getName();
        } else {
            console.log("position not available");
            return "position not available";
        }
    }

    public isAttacking(): boolean {
        return this.attacking;
    }

    public toggleAttacking(): void {
        this.attacking = !this.attacking;
    }

    public getLastTurnAtDoor(): boolean {
        return this.lastTurnAtDoor;
    }

    public toggleLastTurnAtDoor() {
        if(this.lastTurnAtDoor) {
            this.lastTurnAtDoor = false;
            this.setAiLvl(this.getAiLvl() - 2);
        } else {
            this.setAiLvl(this.getAiLvl() + 2);
            this.lastTurnAtDoor = true;
        }
    }


    public forceMove(cam: string): void {
        let temp;
        if(this.pos != undefined) {
            temp = this.pos.chooseNode(cam);
        } else {
            console.log("undefined Position");
            return;
        }
        if(temp instanceof MoveNode) {
            this.pos = temp;
            camFeed.updateCamFeed(this.pos.getName(), this.pos.getSrc());
        } else {
            console.log(temp);
        }
    }

    public aiReaval(hr: number): void {

    }
    
    public attack() {
        this.active = false;
    }

    public getNight(): number | undefined {
        if(this.night != null || this.night != undefined) {
            return this.night;
        }
        return undefined;
    }

    public move() {

    }

    public getAiLvl(): number {
        return this.aiLvl;
    }

    public setAiLvl(lvl: number) {
        if(lvl <= 20 && lvl >= 0) {
            this.aiLvl = lvl;
        }
    }

    public isActive(): boolean {
        return this.active;
    }

    public activate(): void {
        this.active = true;
    }

    public deactivate(): void {
        this.active = false;
    }
}

export default Animatronic;
