import Animatronic from "./Animatronic";

class Freddy extends Animatronic{
    readonly moveInt: number = 3020;

    constructor(position: number, difficulty: number, night: number) {
        super(position, difficulty, night);
    }


    override move(): void {

    }

}


export default Freddy;