
interface CutsceneViewProps {
    night: number;
}

export default function CutsceneView({night}: CutsceneViewProps) {
    return (
        <>
        <img id="staticScene" src="/ASSETS/TEXTURES/OFFICE/office_bottom_layer.png"/>
        <img id="backgroundCutScene" src="/ASSETS/TEXTURES/OFFICE/office_bottom_layer.png"/>
            <div id="cutSceneText" className="cut-scene-text">
                <div id="cutSceneHr">
                    5 AM
                </div>
                <div id="cutSceneNightText">
                    night {night}
                </div>
            </div>
        </>
    );
}
