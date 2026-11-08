class MoveNode {
    nodes;
    name;
    src;
    constructor(name, src, ...nodes) {
        this.name = name;
        this.nodes = nodes;
        this.src = src;
    }
    addNode(...nodes) {
        this.nodes.push(...nodes);
    }
    nextNode() {
        const rand = Math.floor(Math.random() * this.nodes.length);
        return this.nodes[rand];
    }
    getName() {
        return this.name;
    }
    getSrc() {
        return this.src;
    }
}
export default MoveNode;
//# sourceMappingURL=MoveNode.js.map