class SFX {
    SFX = {
        light: new Audio('./ASSETS/SFX/office/light/BallastHumMedium2.wav'),
        click: new Audio('./ASSETS/SFX/MENU/sfx_menu_confirm.mp3'),
        door_close: new Audio('./ASSETS/SFX/office/door/SFXBible_12478.wav'),
        cam_down: new Audio('ASSETS/SFX/cameras/put down.wav'),
        cam_switch: new Audio('ASSETS/SFX/cameras/blip3.wav')
    };
    constructor() {
        this.SFX.light.loop = true;
    }
    playSFX(audio) {
        if (!(audio instanceof Audio)) {
            return;
        }
        const sound = audio;
        sound.volume = audio.volume;
        sound.currentTime = 0;
        sound.play();
        ;
    }
    stopSFX(audio) {
        if (!(audio instanceof Audio)) {
            return;
        }
        audio.pause();
    }
}
const audioHandler = new SFX();
export default audioHandler;
//# sourceMappingURL=SFX.js.map