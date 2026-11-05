declare class SFX {
    readonly SFX: {
        light: HTMLAudioElement;
        click: HTMLAudioElement;
        door_close: HTMLAudioElement;
        cam_down: HTMLAudioElement;
        cam_switch: HTMLAudioElement;
    };
    constructor();
    playSFX(audio: HTMLAudioElement): void;
    stopSFX(audio: HTMLAudioElement): void;
}
declare const audioHandler: SFX;
export default audioHandler;
//# sourceMappingURL=SFX.d.ts.map