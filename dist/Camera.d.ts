declare class Camera {
    private lastCam;
    cameras: Map<string, string>;
    constructor();
    show(): void;
    close(): void;
    getCamFeed(cam: string): string | undefined;
    setCameraFeed(cam: string): void;
    updateCamFeed(cam: string, src: string): void;
    getLastCam(): string;
}
declare const camFeed: Camera;
export default camFeed;
//# sourceMappingURL=Camera.d.ts.map