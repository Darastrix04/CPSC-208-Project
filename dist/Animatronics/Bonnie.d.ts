import Animatronic from "./Animatronic";
declare class Bonnie extends Animatronic {
    private oldSrc;
    readonly moveInt: number;
    constructor(difficulty: number, night: number);
    move(): void;
    aiReaval(hr: number): void;
    toString(): string;
    getPos(): string;
}
export default Bonnie;
//# sourceMappingURL=Bonnie.d.ts.map