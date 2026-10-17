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
    }

    canMove(): boolean{
        let rand : number = Math.round(Math.random() * 20);
        if (rand <= this.aiLvl) {
            return true;
        }
        return false;
    }


    move(seconds: number): void {

    }

    aiReaval(hr: number): void {

    }
    
    attack(): void {
        
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

    getLocation(): void {

    }

    activate(): void {
        this.active = true;
    }

    deactivate(): void {
        this.active = false;
    }
}

export default Animatronic;
