declare class MoveNode {
    private readonly nodes;
    private readonly name;
    private readonly src;
    constructor(name: string, src: string, ...nodes: MoveNode[]);
    addNode(...nodes: MoveNode[]): void;
    nextNode(): MoveNode;
    getName(): string;
    getSrc(): string;
}
export default MoveNode;
//# sourceMappingURL=MoveNode.d.ts.map