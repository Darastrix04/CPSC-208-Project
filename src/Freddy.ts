import Animatronic from "./Animatronic";

class Freddy extends Animatronic{

    constructor(name: string, position: number, difficulty: number) {
        super(name, position, difficulty);
    }


    override move(): number | undefined {
        //each character has their own movement variations
        let rand : number = Math.random();
        if(rand > 0.5) {
            rand = Math.random();
            if(rand > 0.5) {
                this.position++;
                return 1;
            } else {
                this.position--;
                return -1;
            }
        } else {
            return undefined;
        }
    }

}


export default Freddy;