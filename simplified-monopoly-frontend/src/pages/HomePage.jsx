import { Link, Navigate } from "react-router"
import Button from "../common/Button"
import { use, useEffect } from "react"
import { DataContext } from "../context/DataContext"
import { spaceData } from "../data/spaceData"

const HomePage = ({setThePlayers, defaultPlayers}) => {

    console.log("At home page");

    const {isLoading, setIsLoading, allGameBoard, fetchGameBoard, fetchSaveSpaceData, fetchSavePlayerData,
        fetchSaveGeneralData, isSaveData, setNewGame, setIsSaveData,
        setAllGameBoard, setSaveSpaceData, setSavePlayerData, setSaveGeneralData,
        saveSpaceData, savePlayerData, saveGeneralData, deleteSpaces,
         deleteSavePlayers, deleteSaveSpaces, deleteSaveGeneral, addNewSpace} = use(DataContext);

    console.log(allGameBoard);

    const useSaveGame = () => {
        setNewGame(false);
    }

    const useNewGame = (event) => {
        setNewGame(true);
    }

    const testClick = (event) => {
        event.preventDefault();
        deleteSavePlayers();
        deleteSaveSpaces(); 
        deleteSaveGeneral();
    }

    useEffect(() => {
        setIsLoading(true);
        setAllGameBoard(null); 
        setSaveSpaceData(null);
        setSavePlayerData(null);
        setSaveGeneralData(null);
        setThePlayers(structuredClone([...defaultPlayers]));
        console.log("Reset")
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

            console.log(`${saveSpaceData.length}  ${savePlayerData.length}  ${Object.keys(saveGeneralData).length !== 0}` )
            if(saveSpaceData.length !== 0 && savePlayerData.length !== 0 && Object.keys(saveGeneralData).length !== 0){
                setIsSaveData(true);
                console.log("There is save data");
            } else {
                setIsSaveData(false);
            }

        }
    }, [allGameBoard, saveSpaceData, savePlayerData, saveGeneralData]);

    useEffect(() =>{
    
        if(!isLoading){
            if(allGameBoard.length === 0){
                addNewSpace(spaceData)
            }

            console.log(`${saveSpaceData.length}  ${savePlayerData.length}  ${Object.keys(saveGeneralData).length !== 0}` )
            if(saveSpaceData.length !== 0 && savePlayerData.length !== 0 && Object.keys(saveGeneralData).length !== 0){
                setIsSaveData(true);
                console.log("There is save data");
            } else {
                setIsSaveData(false);
                console.log("There is no save data");
                // deleteSavePlayers(); 
                // deleteSaveSpaces(); 
                // deleteSaveGeneral();
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
                            <Link className='link' to="/about">
                                <Button id="about-button" display="About" classes="home-button" />
                            </Link>
                        </td>
                        <td>
                            <label>See general information about the game</label>
                        </td>
                    </tr>
                </tbody>

                <tbody>
                    <tr>
                        <td>
                            <Button id="test-button" handleClick={testClick} display="Test" classes="home-button" />
                        </td>
                        <td>
                            <label>Test adding new space</label>
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
                            <label>See general information about the game</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}

export default HomePage