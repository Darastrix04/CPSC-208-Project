import type MoveNode from "./MoveNode";
declare class Animatronic {
    private active;
    private difficulty;
    private night;
    aiLvl: number;
    protected pos: MoveNode | undefined;
    constructor(difficulty: number, night: number);
    canMove(): boolean;
    getPos(): string;
    move(): void;
    aiReaval(hr: number): void;
    attack(): void;
    getNight(): number | undefined;
    getAiLvl(): number;
    setAiLvl(lvl: number): void;
    activate(): void;
    deactivate(): void;
}
export default Animatronic;
//# sourceMappingURL=Animatronic.d.ts.map