class Animatronic {
    // Properties
    position: number;
    active: boolean;
    difficulty: number;
    night: number;
    aiLvl: number = 0;
    


    constructor(position: number, difficulty: number, night: number) {
        this.position = position;
        this.active = false;
        this.difficulty = difficulty;
        this.night = night;
        this.aiLvl;
    }

    canMove(): boolean{
        let rand : number = Math.round(Math.random() * 20);
        if (rand <= this.aiLvl) {
            return true;
        }
        return false;
    }


    move(seconds: number): void {
       if (this.active && this.canMove()) {
        this.position +=1;
       }
    }

    aiReaval(hr: number): void {

    }
    
    attack(): void {
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

    getLocation(): number {
        return this.position;
    }

    activate(): void {
        this.active = true;
    }

    deactivate(): void {
        this.active = false;
    }
}

export default Animatronic;
