import Animatronic from "./Animatronic";
declare class Chicka extends Animatronic {
    readonly moveInt: number;
    constructor(difficulty: number, night: number);
    move(): void;
    aiReaval(hr: number): void;
    toString(): string;
}
export default Chicka;
//# sourceMappingURL=Chicka.d.ts.map