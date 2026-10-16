import Animatronic from "./Animatronic";

class Foxy extends Animatronic{

    constructor(name: string, position: number, difficulty: number) {
        super(name, position, difficulty);
    }


    override move(): void {
        //each character has their own movement variations
    }

}


export default Foxy;