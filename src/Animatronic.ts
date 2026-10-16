class Animatronic {
    // Properties
    name: string;
    position: number;
    active: boolean;
    difficulty: number;

    constructor(name: string, position: number, difficulty: number) {
        this.name = name;
        this.position = position;
        this.active = false;
        this.difficulty = difficulty;
    }

    move(): void {
        //movement here
    }

    activate(): void {
        this.active = true;
    }

    deactivate(): void {
        this.active = false;
    }
}

export default Animatronic;
