import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGlobal } from "./GlobalContext";
import { Pages, usePage } from "./PageContext";
import audioHandler from "./SFX";
export default function Options() {
    const { setDisplay } = usePage();
    const { night, setNight, difficulty, setDifficulty, setVolume, volume } = useGlobal();
    return (_jsxs(_Fragment, { children: [_jsxs("video", { className: "background-video", autoPlay: true, loop: true, playsInline: true, muted: true, children: [_jsx("source", { src: "ASSETS/VIDEOS/main_menu_background.mp4", type: "video/mp4" }), "                                       "] }), _jsxs("div", { className: "main-menu", children: [_jsxs("div", { id: "title", className: "h1 title text-white", children: [_jsx("button", { className: 'flat-button', onClick: () => { audioHandler.playSFX(audioHandler.SFX.click); setDisplay(Pages.MainMenu); }, children: '<' }), "Options"] }), _jsxs("div", { className: "settingsText", children: ["CURRENT NIGHT: ", night] }), _jsx("div", { className: 'settingsText', children: _jsxs("div", { children: ["Difficulty: ", difficulty, _jsx("button", { className: 'flat-button mx-3', onClick: () => { setDifficulty('easy'); audioHandler.playSFX(audioHandler.SFX.click); }, children: "easy" }), _jsx("button", { className: 'flat-button mx-3', onClick: () => { setDifficulty('normal'); audioHandler.playSFX(audioHandler.SFX.click); }, children: "normal" }), _jsx("button", { className: 'flat-button mx-3', onClick: () => { setDifficulty('hard'); audioHandler.playSFX(audioHandler.SFX.click); }, children: "hard" })] }) }), _jsx("div", { className: 'settingsText', children: _jsxs("div", { children: ["Volume:", _jsx("button", { className: 'flat-button mx-5', onClick: () => { setVolume(Math.max(volume - 5, 0)); audioHandler.playSFX(audioHandler.SFX.click); }, children: '<' }), _jsx("span", { children: volume }), _jsx("button", { className: 'flat-button mx-5', onClick: () => { setVolume(Math.min(volume + 5, 100)); audioHandler.playSFX(audioHandler.SFX.click); }, children: '>' })] }) }), _jsx("div", { className: 'settingsText', children: _jsx("button", { className: 'delete-button', onClick: () => {
                                if (window.confirm("Are you sure you want to delete your save?")) {
                                    localStorage.removeItem("save");
                                    setNight(1);
                                    setDifficulty("normal");
                                    setVolume(100);
                                    audioHandler.playSFX(audioHandler.SFX.click);
                                }
                            }, children: "DELETE SAVE DATA" }) })] })] }));
}
//# sourceMappingURL=Options.js.map