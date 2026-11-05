import Animatronic from "./Animatronic";
declare class Foxy extends Animatronic {
    readonly moveInt: number;
    constructor(position: number, difficulty: number, night: number);
    move(): void;
    toString(): string;
}
export default Foxy;
//# sourceMappingURL=Foxy.d.ts.map