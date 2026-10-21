class SFX {
    public readonly SFX = {
    light: new Audio('./ASSETS/SFX/office/light/BallastHumMedium2.wav'),
    click: new Audio('./ASSETS/SFX/MENU/sfx_menu_confirm.mp3'),
    door_close: new Audio('./ASSETS/SFX/office/door/SFXBible_12478.wav'),
    cam_down: new Audio('ASSETS/SFX/cameras/put down.wav'),
    cam_switch: new Audio('ASSETS/SFX/cameras/blip3.wav')
};

constructor() {
    this.SFX.light.loop = true;
}
public playSFX(audio: HTMLAudioElement) {
        if(!(audio instanceof Audio)) {return;}
        audio.currentTime = 0;
        audio.play();
    }
    public stopSFX(audio: HTMLAudioElement) {
        if(!(audio instanceof Audio)) {return;}
        audio.currentTime = 0;
        audio.pause();
    }
}
export default SFX;