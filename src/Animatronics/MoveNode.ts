class MoveNode {
    private readonly nodes: MoveNode[];
    private readonly name: string;
    private readonly src: string;

    constructor(name: string, src: string, ...nodes: MoveNode[]) {
        this.name = name;
        this.nodes = nodes;
        this.src = src;
    }

    public addNode(...nodes: MoveNode[]): void {
        this.nodes.push(...nodes);
    }

    public nextNode(): MoveNode {
        const rand = Math.floor(Math.random() * this.nodes.length);
        return this.nodes[rand];
    }

    public getName(): string {
        return this.name;
    }
    public getSrc(): string {
        return this.src;
    }
}

export default MoveNode;