import { createContext, useEffect, useState } from "react";
import Space from '../classes/BoardSpace';
import Players from "../classes/Player";
import { spaceData } from "../data/spaceData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [ isSaveData, setIsSaveData] = useState(null);
    const [ isNewGame, setNewGame] = useState(true);
    const [ gameSet, setGameSet] = useState("GROUPA");

    const [ allGameBoard, setAllGameBoard]  = useState(null);
    const [ saveSpaceData, setSaveSpaceData] = useState(null);
    const [ savePlayerData, setSavePlayerData] = useState(null);
    const [ saveGeneralData, setSaveGeneralData] = useState(null);

    const fetchSaveGeneralData = async () => {

        const saveGeneral = {};

        try{
            const response = await fetch("http://localhost:8080/api/save-data-general");

            if(!response.ok){
                const errorData = await response.json();

                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`
                )
            } else {
                const data = await response.json();

                data.forEach(general => {
                    let dieSytle;
                    switch (general.die) {
                        case "ONEDIE":
                            dieSytle = 1;
                            break;
                        case "TWODIE":
                            dieSytle = 2;
                            break;
                        case "LOWDIE":
                            dieSytle = 3;
                            break;
                        default:
                            dieSytle = 1;
                    }

                    let newGeneral = {
                        turnLimit: general.turnLimit,
                        diceStyle: dieSytle,
                        passGoAmount: general.goAmount,
                        turnNumber: general.turnNumber,
                        currentPlayerTurn: general.currentPlayerTurn,
                        id: general.id
                    }

                    Object.assign(saveGeneral,newGeneral);
                })
            }
        } catch (error) {
            console.log(error.message);
        } finally{
            setSaveGeneralData(saveGeneral);
        }
    }

    const fetchSavePlayerData = async () => {

        const savePlayer = [];

        try {
            const response = await fetch("http://localhost:8080/api/save-data-players")

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`  
                );
            } else {
                const data = await response.json();

                data.forEach(player => {
                    let newPlayer = new Players(
                        player.playerNumber,
                        player.name,
                        player.color,
                        player.amount
                    )
                    newPlayer.currentSpace = player.currentSpace;
                    savePlayer.push(newPlayer);
                });
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setSavePlayerData(savePlayer);
        }
    }

    const fetchSaveSpaceData = async () => {

        const saveSpace = [];

        try {
            const response = await fetch("http://localhost:8080/api/save-data-spaces");

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`  
                );
            } else {
                const data = await response.json();

                data.forEach(space => {
                    let newSpace = new Space(
                        space.spaceName,
                        space.spaceNumber,
                        space.buyAmount,
                        space.rentAmount,
                        space.isStart
                    )
                    if(!newSpace.isStartSpace){
                        newSpace.owner = space.owner;
                    }
                    newSpace.color = space.color;
                    newSpace.spaceIsBought = space.isOwned;
                    saveSpace.push(newSpace);
                });
            }

        } catch (error){
            console.error(error.message);
        } finally {
            setSaveSpaceData(saveSpace);
        }
    }


    const fetchGameBoard = async () => {

        const boards = [];

        try {
            const response = await fetch('http://localhost:8080/api/game-boards');

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`  
                );
            } else {
                const data = await response.json();

                data.forEach(board => {
                    let newBoardSpace = new Space(
                        board.spaceName,
                        board.spaceNumber,
                        board.buyAmount,
                        board.rentAmount,
                        board.isStart,
                        board.groupType,
                        board.id
                    )
                    boards.push(newBoardSpace);
                });
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setAllGameBoard(boards);
        }
    }

    // useEffect(() => {
    //     fetchGameBoard();
    //     fetchSaveSpaceData();
    //     fetchSavePlayerData();
    //     fetchSaveGeneralData();
    // }, []);

    useEffect(() => {
        
        if(allGameBoard !== null && saveSpaceData !== null && savePlayerData !== null && saveGeneralData !== null){
            setIsLoading(false);

            console.log(`${saveSpaceData.length}  ${savePlayerData.length}  ${Object.keys(saveGeneralData).length !== 0}` )
            if(saveSpaceData.length !== 0 && savePlayerData.length !== 0 && Object.keys(saveGeneralData).length !== 0){
                setIsSaveData(true);
                console.log("There is save data");
            } else {
                setIsSaveData(false);
            }

        }
    }, [allGameBoard, saveSpaceData, savePlayerData, saveGeneralData]);


    const addNewSpace = async (newSpaceArray, groupLetter) => {
        try {
            for (const newSpace of newSpaceArray){
                const data = {
                        "groupType": "GROUP" + groupLetter,
                        "spaceName": newSpace[0],
                        "spaceNumber": newSpace[1],
                        "buyAmount": newSpace[2],
                        "rentAmount": newSpace[3],
                        "isStart": newSpace[4]
                    }
                const response = await fetch('http://localhost:8080/api/game-boards', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
            }
            console.log("Creating space data for Set: " + groupLetter);
            fetchGameBoard();
        } catch (error) {
            console.error(error.message);
        }
    }

    const saveTheSpaces = async (spaceArray) => {
        try {
            for (const space of spaceArray){
                const data ={
                    "groupType": "GROUPA",
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
        } catch (error) {
            console.error(error.message);
        }
    }

    const saveThePlayers = async (playerArray) => {
        try {
            for (const player of playerArray){
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
        } catch (error) {
            console.error(error.message);
        }
    }

    const saveTheGeneral = async (generalObject) => {
        try {
            let dieStyle;
            switch (generalObject.diceStyle){
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
                "turnLimit": generalObject.turnLimit,
                "turnNumber": generalObject.turnNumber,
                "goAmount": generalObject.passGoAmount,
                "currentPlayerTurn": generalObject.currentPlayerTurn
            }

            const response = await fetch('http://localhost:8080/api/save-data-general', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const dataReturned = await response.json();
            generalObject.id = dataReturned.id;
            console.log("Save data general created.");

        } catch (error) {
            console.error(error.message)
        }
    }

    const deleteSpaces = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/game-boards', {
                method: "DELETE",
            });
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`  
                );
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteSaveSpaces = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/save-data-spaces', {
                method: "DELETE",
            });
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`  
                );
            }
            console.log("Save data spaces deleted.");
        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteSavePlayers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/save-data-players', {
                method: "DELETE",
            });
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`  
                );
            }
            console.log("Save data player deleted.");
        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteSaveGeneral = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/save-data-general', {
                method: "DELETE",
            });
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`  
                );
            }
            console.log("Save data general Deleted.");
        } catch (error) {
            console.error(error.message);
        }
    }

    return(
        <DataContext.Provider
            value={{
                isLoading, setIsLoading, isSaveData, setIsSaveData,
                isNewGame, setNewGame, gameSet, setGameSet,
                allGameBoard,
                fetchGameBoard,
                saveSpaceData,
                fetchSaveSpaceData,
                savePlayerData,
                fetchSavePlayerData,
                saveGeneralData,
                fetchSaveGeneralData,
                setAllGameBoard, setSaveSpaceData, setSavePlayerData, setSaveGeneralData,
                addNewSpace, saveTheSpaces, saveThePlayers, saveTheGeneral,
                deleteSpaces, deleteSavePlayers, deleteSaveSpaces, deleteSaveGeneral
            }}>
            {children}
        </DataContext.Provider>
    )
}