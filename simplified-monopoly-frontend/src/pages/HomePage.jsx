import { Link } from "react-router"
import Button from "../common/Button"
import { use, useEffect } from "react"
import { DataContext } from "../context/DataContext"
import { spaceData } from "../data/spaceData"

const HomePage = ({setThePlayers, defaultPlayers}) => {

    const {isLoading, setIsLoading, gameSet, setGameSet, allGameBoard, 
        fetchGameBoard, fetchSaveSpaceData, fetchSavePlayerData,
        fetchSaveGeneralData, isSaveData, setNewGame, setIsSaveData,
        setAllGameBoard, setSaveSpaceData, setSavePlayerData, setSaveGeneralData,
        saveSpaceData, savePlayerData, saveGeneralData, addNewSpace} = use(DataContext);


    const useSaveGame = () => {
        setNewGame(false);
    }

    const useNewGame = () => {
        setNewGame(true);
    }

    const handleSetChange = (event) => {
        event.preventDefault();
        setGameSet(event.target.value);
    }

    useEffect(() => {
        setIsLoading(true);
        setAllGameBoard(null); 
        setSaveSpaceData(null);
        setSavePlayerData(null);
        setSaveGeneralData(null);
        setThePlayers(structuredClone([...defaultPlayers]));
    }, []);

    useEffect(() => {
        fetchGameBoard();
        fetchSaveSpaceData();
        fetchSavePlayerData();
        fetchSaveGeneralData();
    }, []);

    useEffect(() => {
        
        if(allGameBoard !== null && saveSpaceData !== null && savePlayerData !== null && saveGeneralData !== null){
            setIsLoading(false);

            if(saveSpaceData.length !== 0 && savePlayerData.length !== 0 && Object.keys(saveGeneralData).length !== 0){
                setIsSaveData(true);
            } else {
                setIsSaveData(false);
            }

        }
    }, [allGameBoard, saveSpaceData, savePlayerData, saveGeneralData]);

    useEffect(() =>{
    
        if(!isLoading){
            // If there is no spaces in the board. This will fill them up with default data
            if(allGameBoard.length === 0){
                addNewSpace(spaceData, "A");
                addNewSpace(spaceData, "B");
                addNewSpace(spaceData, "C");
            } else {

                // If there is data but not all sets have it, those sets will be filled with default data

                let countA = 0;
                let countB = 0;
                let countC = 0;
                allGameBoard.forEach(space => {
                    switch (space.group){
                        case "GROUPA":
                            countA++;
                            break;
                        case "GROUPB":
                            countB++;
                            break;
                        case "GROUPC":
                            countC++;
                            break;
                    }

                });

                if(countA === 0){
                    addNewSpace(spaceData, "A");
                }
                if(countB === 0){
                    addNewSpace(spaceData, "B");
                }
                if(countC === 0){
                    addNewSpace(spaceData, "C");
                }
            }

            // This checks if there is any data in the save tables. If there is, there is a save game. Else, no save game.
            if(saveSpaceData.length !== 0 && savePlayerData.length !== 0 && Object.keys(saveGeneralData).length !== 0){
                setIsSaveData(true);
            } else {
                setIsSaveData(false);
            }

        }
    }, [isLoading])


    

    return (
        <main id="home-container">
            <h1 id="welcome-sign">Welcome to Simply Monopoly</h1>
            <table className="welcome-table">
                <tbody>
                    <tr>
                        <td>
                            <Link className='link' to="/game">
                                <Button id="play-button" handleClick={useNewGame} display="Play" classes="home-button"/>
                            </Link>
                        </td>
                        <td>
                            <label>Play the game with set rules {isSaveData && ("- Saved Data will be deleted")}</label>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <select name="GroupSet" id="GroupSet" value={gameSet} onChange={(event) =>handleSetChange(event)}>
                                    <option value="GROUPA">Set A</option>
                                    <option value="GROUPB">Set B</option>
                                    <option value="GROUPC">Set C</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <label>Select the game set</label>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <Link className='link' to="/game">
                                <Button id="saved-button" handleClick={useSaveGame} display="Saved Game" classes="home-button" validator={isSaveData}/>
                            </Link>
                        </td>
                        <td>
                            {isSaveData ? (
                                <label>Play from a save game</label>
                            ) : (
                                <label>There is no saved game</label>
                            )}
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <Link className='link' to="/rules">
                                <Button id="rule-button" display="Rules" classes="home-button" />
                            </Link>
                        </td>
                        <td>
                            <label>See the rules for the game</label>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <Link className='link' to="/options">
                                <Button id="options-button" display="Options" classes="home-button" />
                            </Link>
                        </td>
                        <td>
                            <label>Change game settings</label>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <Link className='link' to="/edit">
                                <Button id="edit-button" display="Edit" classes="home-button" />
                            </Link>
                        </td>
                        <td>
                            <label>Edit the spaces</label>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <Link className='link' to="/about">
                                <Button id="about-button" display="About" classes="home-button" />
                            </Link>
                        </td>
                        <td>
                            <label>See general information about the game</label>
                        </td>
                    </tr>
                </tbody>
                
            </table>
        </main>
    )
}

export default HomePage