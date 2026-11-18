import React, { useEffect, useState, type ReactNode } from "react";
import { useGlobal } from "./GlobalContext";
import audioHandler from "./SFX";
import { Pages, usePage } from "./PageContext";


interface MultiPlayer {
    children?: ReactNode;
}




export default function MultiPlayer({children}: MultiPlayer) {

    const [lobbies, setLobbies] = useState<string[]>([]);
    const {ws,setWs, selectedLobby, setSelectedLobby, pid,setPid,clickPid, setClickPid, night, setNight} = useGlobal();
    const {display, setDisplay} = usePage();
    const [team, setTeam] = useState<Map<string, string> | null>();
    const [otherPlayer, setOtherPlayer] = useState<string | null>();


    const sendMessage = (message: string) => {
        try{
            console.log(`WS message sent: ${message}`);
            ws.send(message);
        } catch (error) {
            console.log("couldn't send message. connection to server possibly failed.")
        }
	}

    const createLobby = () => {
        sendMessage(`createLobby_${pid}`);
    }

    const chooseTeam = (chosenTeam: string) => {
        sendMessage(`chooseTeam_${pid}_${selectedLobby}_${chosenTeam}`);
    }

    const joinLobby = (lobby: string) => {
        try {
            sendMessage(`joinLobby_${pid}_${lobby}`);
            setSelectedLobby(lobby);
            console.log("joining lobby");
        } catch (error) {
            console.log("couldn't join Lobby. Server Possibly down ", error);
        }
    }

    const getLobbies = () => {
        sendMessage(`getLobbies_${pid}`);
    }
 
    const endLobby = () => {
        sendMessage(`endLobby_${pid}`);
    }

	const buttonClick = () => {
		sendMessage(`click_${pid}`);
	}

    const leaveLobby = () => {
        sendMessage(`leaveLobby_${pid}_${selectedLobby}`);
        setSelectedLobby(null);
    }

	const clearMe = () => {
		localStorage.removeItem("pid");
		window.location.reload();
    }


    useEffect(() => {
        const connection = new WebSocket("ws://localhost:443");
        try {
            connection.onopen = () => {
			console.log("Connection opened to the server...");
		}
        } catch (error) {
            console.log("error connecting ", error);
        }
		connection.onmessage = (inMessage: any) => {
            try {
			console.log(inMessage);
			const messageParts: string[] = inMessage.data.split("_");
			const messageType: string = messageParts[0]!;

			switch(messageType) {
				case "connected":
                    const storedPid = localStorage.getItem("pid");
                    const currentPid = storedPid || messageParts[1]!;
                    setPid(currentPid);
                    if (storedPid) {
                        connection.send(storedPid);
                    } else {
                        localStorage.setItem("pid", currentPid);
                    }
                    connection.send(`getLobbies_${pid}`);
				break;
                case "setTeamSelection":
                    if(messageParts[2] == "minWage") {
                        document.getElementById("minWage")?.setAttribute("style", "pointer-events: none;");
                    } else {
                        document.getElementById("anim")?.setAttribute("style", "pointer-events: none;");
                    }
                    team?.set(messageParts[1] as string, messageParts[2] as string);
                break;
                case "returnedLobbies":
                        if(messageParts[1] !== "") {
                            setLobbies(messageParts.slice(1, 6));
                        } else {
                            setLobbies([]);
                        }
                break;
                case "lobbyEnded":
                    getLobbies();
                    if(messageParts[1] !== "") {
                        setSelectedLobby(null);
                        setOtherPlayer(null);
                    }
                break;
                case "lobby":
                    setLobbies(previous => [...previous, messageParts[1] as string]);
                break;
                case "leftLobby":
                    console.log(`${pid} got someoneLeft Lobby`)
                    setOtherPlayer(null);
                    if(selectedLobby === messageParts[1]) {
                        setSelectedLobby(null);
                    }
                break;
                case "joined":
                    setOtherPlayer(messageParts[1]);
                break;
            }
		setWs(connection);
    } catch(error) {
        console.error("Error processing communication ", error);
    }
        }
        return () => {
            console.log("connection disconnected");
            connection.close();
        };
    },[])
    
    
    
    if (selectedLobby !== null) {
    return(
        <>
        <img id="backgroundCutScene" src="ASSETS/TEXTURES/OFFICE/office_bottom_layer.png" />
        <video className="background-video" id="bacOfficeViewPropskGroundVideo" autoPlay loop playsInline muted>
                <source src="ASSETS/VIDEOS/main_menu_background.mp4" type="video/mp4" />                                       {/* BACKGROUND VIDEO */}  
        </video>
        <div className="main-menu" id="mainMenu">
            <div id="title" className="h1 title text-white">
                <button className="flat-button" onClick={() => {
                    if(pid === selectedLobby) {
                        setSelectedLobby(null);
                        endLobby();
                    } else {
                        leaveLobby();
                    }
                    getLobbies();
                }}> {'<'} </button>
                Lobby
                <div className="h4 ms-4">
                Your ID: {pid.slice(4, 10)}
                </div>  
                <div className="h4 ms-4">
                Players Connected: {otherPlayer !== null ? otherPlayer?.slice(4,10) : ""} {pid.slice(4,10)}
                </div>                                                                          
            </div>
            <div className="align-menu-button">
                <div className="h1 text-white text-center" id="newGameButton" onClick={() => {

                }}>CHOOSE YOUR TEAM:</div>
            </div>
            <div className="align-menu-button text-center text-white">
                <button className="h3 flat-button mx-4 my-4" id="minWage" onClick={() => {
                    chooseTeam("minWage");
                }}>
                    Minimum Wage Employee
                </button>
                <button className="flat-button h3 mx-4 my-4 text-white" id="anima"
                 onClick={() => {
                    chooseTeam("anima");
                }}>
                    Animatronics
                </button>
            </div>
            </div>
        </>
    );
    }


    return(
        <>
        <img id="backgroundCutScene" src="ASSETS/TEXTURES/OFFICE/office_bottom_layer.png" />
        <video className="background-video" id="bacOfficeViewPropskGroundVideo" autoPlay loop playsInline muted>
                <source src="ASSETS/VIDEOS/main_menu_background.mp4" type="video/mp4" />                                       {/* BACKGROUND VIDEO */}  
        </video>
        <div className="main-menu" id="mainMenu">
            <div id="title" className="h1 title text-white">
                <button className="flat-button" onClick={() => {
                    setDisplay(Pages.MainMenu);}}>
                    {'<'}
                </button>
                MultiPlayer Lobby
                <div className="h4 ms-4">
                User ID: {pid.slice(4, 10)}
                </div>                                                                          
            </div>
            <div className="align-menu-button">
                <div className="h2 mx-5 my-5 text-white" id="newGameButton" onClick={() => {

                }}>LOBBIES:</div>           
            </div>
            <div id="lobbyList" className="align-menu-button">
                {lobbies.map((lobbyId) => (
                    <button
                    key={lobbyId}
                    className="h2 mx-5 my-5 text-white flat-button"
                    id={`lobby-${lobbyId}`}
                    onClick={() => {
                        joinLobby(lobbyId);
                    }}
                    >
                        {lobbyId.slice(4,10)}
                        </button>
                ))}
            </div>
            <div className="align-menu-button">
            <button className="h2 mx-5 my-5 text-white flat-button" id="newGameButton" onClick={() => {
                getLobbies();
                }}>RELOAD</button>
                <button className="h2 mx-5 text-white flat-button" id="newGameButton" onClick={() => {
                    createLobby();
                    setSelectedLobby(pid);
                }}>CREATE LOBBY</button>
            </div>
            </div>
        </>
    );


}