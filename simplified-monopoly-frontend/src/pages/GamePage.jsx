import { use, useEffect, useState } from "react"
import { spaceData } from "../data/spaceData"
import { useNavigate } from "react-router";
import SpaceField from "../layout/SpaceField";
import StatusBoard from "../layout/StatusBoard";
import PlayerStatsBoard from "../layout/PlayerStatsBoard";
import Space from "../classes/BoardSpace"
import { DataContext } from "../context/DataContext";
import Button from "../common/Button";

const GamePage = ({thePlayers, setThePlayers, generalOptions, setGeneralOptions}) => {

    const navigate = useNavigate();
    const {allGameBoard, saveSpaceData, savePlayerData, saveGeneralData, saveTheSpaces, saveThePlayers, saveTheGeneral, isNewGame,
        deleteSaveSpaces,
        deleteSavePlayers,
        deleteSaveGeneral,
        gameSet
    } = use(DataContext)

    const spaceArrayData = [];
    
    const [turnNumber, setTurnNumber] = useState(1);
    const [currentPlayerTurn, setCurrentPlayerTurn] = useState(1);

    console.log("The game is new: " + isNewGame);

    if(isNewGame){
        // spaceData.forEach(function(space) {
        //     spaceArrayData.push( new Space(space[0], space[1], space[2], space[3], space[4]));
        // })
        allGameBoard.forEach(function(space) {
            if(space.group === gameSet){
                spaceArrayData.push(space);
            }
        })
    } else {
        saveSpaceData.forEach(function(space) {
            spaceArrayData.push(space);
        })
    }

    useEffect(() =>{
  
        
    
        if(!isNewGame){
            setThePlayers(savePlayerData);
            setGeneralOptions(saveGeneralData);
            setTurnNumber(saveGeneralData.turnNumber);
            setCurrentPlayerTurn(saveGeneralData.currentPlayerTurn);
        } else {
            const deleteSaveGeneralData = async () => {
                try {
                    const responseSpace = await fetch('http://localhost:8080/api/save-data-spaces', {
                        method: "DELETE",
                    });
                    console.log("Save data spaces deleted in Save.");

                    const responsePlayer = await fetch('http://localhost:8080/api/save-data-players', {
                        method: "DELETE",
                    });
                    const responseGeneral = await fetch('http://localhost:8080/api/save-data-general', {
                        method: "DELETE",
                    });
                    if(!responseSpace.ok){
                        const errorData = await responseSpace.json();
                        throw new Error(
                            errorData.message || `ERROR - Status ${responseSpace.status}`  
                        );
                    }
                    if(!responsePlayer.ok){
                        const errorData = await responsePlayer.json();
                        throw new Error(
                            errorData.message || `ERROR - Status ${responsePlayer.status}`  
                        );
                    }
                    if(!responseGeneral.ok){
                        const errorData = await responseGeneral.json();
                        throw new Error(
                            errorData.message || `ERROR - Status ${responseGeneral.status}`  
                        );
                    }
                    console.log("Save data general Deleted.");

                    let dieStyle;
                    switch (generalOptions.diceStyle){
                        case 1:
                            dieStyle = "ONEDIE";
                            break;
                        case 2:
                            dieStyle = "TWODIE";
                            break;
                        case 3:
                            dieStyle = "LOWDIE";
                            break;
                        default:
                            dieStyle = "ONEDIE"
                    }
                    const data = {
                        "die": dieStyle,
                        "turnLimit": generalOptions.turnLimit,
                        "turnNumber": generalOptions.turnNumber,
                        "goAmount": generalOptions.passGoAmount,
                        "currentPlayerTurn": generalOptions.currentPlayerTurn
                    }

                    const response = await fetch('http://localhost:8080/api/save-data-general', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    if(!response.ok){
                        const errorData = await response.json();
                        throw new Error(
                            errorData.message || `ERROR - Status ${response.status}`  
                        );
                    }
                    
                    const dataReturned = await response.json();
                    generalOptions.id = dataReturned.id;
                    console.log("Save data general created.");

                } catch (error) {
                    console.error(error.message);
                }
            }

            deleteSaveGeneralData();

        }
    
    }, [])

    const [theSpaces, setTheSpaces] = useState(spaceArrayData);
    const [widthSize, setWidthSize] = useState(null);
    // const [turnNumber, setTurnNumber] = useState(generalOptions.turnNumber);
    // const [currentPlayerTurn, setCurrentPlayerTurn] = useState(generalOptions.currentPlayerTurn);

    const [gameState, setGameState] = useState("Start");
    const [dieRoll, setDieRoll] = useState(0);
    const [dieRoll2, setDieRoll2] = useState(0);

    // setTurnNumber(generalOptions.turnNumber);
    // setCurrentPlayerTurn(generalOptions.currentPlayerTurn);

    useEffect(() => {  // This checks screen changes for the board. Use 5 spaces on large, 4 on medium, 3 on small

        const checkSize = () => {
            
            if(window.innerWidth >= 1200){
                setWidthSize(5);
            } else if(window.innerWidth < 1200 && window.innerWidth >= 600){
            
                setWidthSize(4);
            } else {
                setWidthSize(3)
            }

        };

        if(window.innerWidth >= 1200){
                setWidthSize(5);
            } else if(window.innerWidth < 1200 && window.innerWidth >= 600){
                setWidthSize(4);
            } else {
                setWidthSize(3)
            }

        window.addEventListener('resize', checkSize);

        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const rollTheDie = (max) => {
        return Math.floor(Math.random() *max) +1;
    }

    const saveTheGame = async (event) => {
        event.preventDefault();

        try {
            const responseSpace = await fetch('http://localhost:8080/api/save-data-spaces', {
                method: "DELETE",
            });
            console.log("Save data spaces deleted in Save.");

            const responsePlayer = await fetch('http://localhost:8080/api/save-data-players', {
                method: "DELETE",
            });
            console.log("Save data player deleted in Save.");

            for (const space of theSpaces){
                const data ={
                    "groupType": space.group,
                    "spaceName": space.name,
                    "spaceNumber": space.spaceNum,
                    "buyAmount": space.spaceValueStart,
                    "rentAmount": space.spaceValueBought,
                    "isStart": space.isStartSpace,
                    "owner": space.owner,
                    "color": space.color,
                    "isOwned": space.spaceIsBought
                }

                const response = await fetch('http://localhost:8080/api/save-data-spaces', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
            
            }
            console.log("Save data space created.");

            for (const player of thePlayers){
                const data ={
                    "playerNumber": player.playerId,
                    "name": player.name,
                    "color": player.color,
                    "amount": player.amount,
                    "currentSpace": player.currentSpace
                }

                const response = await fetch('http://localhost:8080/api/save-data-players', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
            
            }
            console.log("Save data Player created.");

            generalOptions.turnNumber = turnNumber;
            generalOptions.currentPlayerTurn = currentPlayerTurn;

            let dieStyle;
            switch (generalOptions.diceStyle){
                case 1:
                    dieStyle = "ONEDIE";
                    break;
                case 2:
                    dieStyle = "TWODIE";
                    break;
                case 3:
                    dieStyle = "LOWDIE";
                    break;
                default:
                    dieStyle = "ONEDIE"
            }
            const data = {
                "die": dieStyle,
                "turnLimit": generalOptions.turnLimit,
                "turnNumber": generalOptions.turnNumber,
                "goAmount": generalOptions.passGoAmount,
                "currentPlayerTurn": generalOptions.currentPlayerTurn
            }

            const response = await fetch('http://localhost:8080/api/save-data-general/' + generalOptions.id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(theSpaces);
            console.log(thePlayers);
            console.log(generalOptions);
            navigate("/");
        } catch (error) {
            console.error(error.message);
        }

        // saveTheSpaces(theSpaces);
        // saveThePlayers(thePlayers);
        // generalOptions.turnNumber = turnNumber;
        // generalOptions.currentPlayerTurn = currentPlayerTurn;
        // console.log(theSpaces);
        // console.log(thePlayers);
        // console.log(generalOptions);
        // navigate("/");
    }

    const quitTheGame = (event) => {

        deleteSaveSpaces();
        deleteSavePlayers();
        deleteSaveGeneral();
        navigate("/");
    }

    const gameEventHandle = (event) =>  { // This handles the game changes. When the Event handler triggers, the gameState determines what happens
        event.preventDefault();
        if(gameState === "Start"){
            setGameState("RollDie")
        } else if (gameState === "RollDie"){

            let movement = 0;
            if(generalOptions.diceStyle ===3 ){
                movement = rollTheDie(3);
            } else{
                movement = rollTheDie(6);
            }
            
            setDieRoll(movement);

            let movement2 = 0;

            if(generalOptions.diceStyle === 2){
                movement2 = rollTheDie(6)
                setDieRoll2(movement2);
            } else {
                setDieRoll2(0);
            }
            
            let newData = [...thePlayers];
            let playerIndex = currentPlayerTurn -1;

            for( let i = 0; i < (movement + movement2); i++){
                if(newData[playerIndex].currentSpace === (theSpaces.length -1)){
                    newData[playerIndex].currentSpace = 0;
                    newData[playerIndex].amount += generalOptions.passGoAmount;
                } else {
                    newData[playerIndex].currentSpace += 1;

                }
                setThePlayers(newData);
            }

            setGameState("AfterRoll");
            
        } else if(gameState === "AfterRoll") {

            if(currentPlayerTurn === thePlayers.length) {
                if(turnNumber >= generalOptions.turnLimit){
                    
                    while(spaceArrayData >0){
                        spaceArrayData.pop;
                    }
                    spaceData.forEach(function(space) {
                        spaceArrayData.push( new Space(space[0], space[1], space[2], space[3], space[4], space[5]));
                    })
                    navigate("/results");
                    setGameState("End")
                } else {
                    let tempNum = turnNumber;
                    setTurnNumber(tempNum + 1);
                    setCurrentPlayerTurn(1);
                    setGameState("RollDie");
                }
            } else {
                let tempNum = currentPlayerTurn;
                setCurrentPlayerTurn(tempNum+1);
                setGameState("RollDie");
            }
        }
    }

    return (
        <main>
            <div>
                <Button id="save-game-button" handleClick={saveTheGame} display={"Save Game"} />
                <Button id="quit-game-button" handleClick={quitTheGame} display={"Quit Game"} />

            </div>
            <SpaceField theSpaces={theSpaces} widthSize={widthSize} thePlayers={thePlayers}/>
            <StatusBoard thePlayers={thePlayers} setThePlayers={setThePlayers} theSpaces={theSpaces} setTheSpaces={setTheSpaces} turnNumber={turnNumber} currentPlayerTurn={currentPlayerTurn} gameState={gameState} dieRoll={dieRoll} dieRoll2={dieRoll2} buttonChange={gameEventHandle} />
            <PlayerStatsBoard thePlayers={thePlayers} />
        </main>
    )
}

export default GamePage