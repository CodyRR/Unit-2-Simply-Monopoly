import { use, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import Button from "../common/Button";
import { Link } from "react-router";

const EditPage = () => {

    const { allGameBoard, setAllGameBoard, fetchGameBoard, setNewGame, gameSet, setGameSet} = use(DataContext)
    const [ editLine, setEditLine] = useState(null);
    const [ originalData, setOriginalData] = useState(null);
    const [ deleteLoading, setDeleteLoading] = useState(null);

     const useNewGame = (event) => {
        setNewGame(true);
    }

    const saveSpaceData = async (event, index) => {
        event.preventDefault();

        try {
            const data = {
                "groupType": allGameBoard[index].group,
                "spaceName": allGameBoard[index].name,
                "spaceNumber": allGameBoard[index].spaceNum,
                "buyAmount": allGameBoard[index].spaceValueStart,
                "rentAmount": allGameBoard[index].spaceValueBought,
                "isStart": allGameBoard[index].isStartSpace
            }

            const response = await fetch("http://localhost:8080/api/game-boards/" + allGameBoard[index].id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            setEditLine(null);
            setOriginalData(null);
        } catch (error) {
            console.error(error.message);
        }
    }

    const cancelEdit = (event, index) => {
        event.preventDefault();
        const newData = [...allGameBoard];
        newData[index]["name"] = originalData.name;
        newData[index]["spaceValueStart"] = originalData.spaceValueStart;
        newData[index]["spaceValueBought"] = originalData.spaceValueBought;
        setAllGameBoard(newData);
        setEditLine(null);
        setOriginalData(null);
    }

    const handleEditor = (event, indexId, index) => {
        setEditLine(indexId);
        setOriginalData(structuredClone(allGameBoard[index]));
        event.preventDefault();

    };

    const handleDataChange = (keyTerm, e, index) => {
        const newData = [...allGameBoard];
        newData[index][keyTerm] = e.target.value;
        setAllGameBoard(newData)
    }

    const handleSetChange = (event) => {
        event.preventDefault();
        setGameSet(event.target.value);
    }

    const addNewSpace = async (event) => {
        event.preventDefault();
        let nextNum = 0;
        allGameBoard.forEach(space => {
            if(space.group === gameSet){
                if(nextNum < space.spaceNum){
                    nextNum = space.spaceNum;
                }
            }
            
        });
        console.log(`Last space is ${nextNum}`);

        try {
            const data = {
                "groupType": gameSet,
                "spaceName": "New Space",
                "spaceNumber": nextNum + 1,
                "buyAmount": 0,
                "rentAmount": 0,
                "isStart": false
            }
            const response = await fetch('http://localhost:8080/api/game-boards', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            fetchGameBoard();
        } catch (error) {
            console.error(error.message);
        } finally {
            setDeleteLoading(true);
        }
    }

    const deleteSpace = async (event, indexId, index) => {
        event.preventDefault();
        setDeleteLoading(true);

        let spaceNumToDelete = allGameBoard[index].spaceNum;
        console.log(indexId);
        try {
            const responseDelete = await fetch('http://localhost:8080/api/game-boards/' + indexId, {
                method: "DELETE",
            });

            allGameBoard.forEach(async space => {
                if(space.group === gameSet){
                    if(spaceNumToDelete < space.spaceNum){
                        console.log(`${space.name} should be ${space.spaceNum - 1}`);

                        const data = {
                            "groupType": space.group,
                            "spaceName": space.name,
                            "spaceNumber": space.spaceNum - 1,
                            "buyAmount": space.spaceValueStart,
                            "rentAmount": space.spaceValueBought,
                            "isStart": space.isStartSpace
                        }

                        const response = await fetch("http://localhost:8080/api/game-boards/" + space.id, {
                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data)
                        });
                        fetchGameBoard();

                    }
                }
                
            });
            

        } catch (error) {

        }
    }

    return (
        <main>
            <h1>Edit Board</h1>
            <div>
                <select name="GroupSet" id="GrouptSet" value={gameSet} onChange={(event) =>handleSetChange(event)}>
                    <option value="GROUPA">Set A</option>
                    <option value="GROUPB">Set B</option>
                    <option value="GROUPC">Set C</option>
                </select>
            </div>
            <table className="welcome-table">
                <thead>
                    <tr>
                        <td>
                            Number
                        </td>
                        
                        <td>
                            Space name
                        </td>                       
                        <td>
                            Buy Amount
                        </td>
                        <td>
                            Rent Amount
                        </td>
                    </tr>    
                </thead>
                <tbody>
                    {allGameBoard.map((space, index)=> {
                         if(space.spaceNum !== 0 && space.group === gameSet) {
                            return (
                                <tr>
                                    <td>
                                        {space.spaceNum}
                                    </td>
                                    <td>{space.id}</td>
                                    <td>
                                        {editLine === space.id ? (
                                            <input type="text" value={space.name} onChange={(e) => handleDataChange("name", e, index)} />
                                        ) : (
                                            space.name
                                        )}
                                    </td>
                                    
                                    <td>
                                        {editLine === space.id ? (
                                            <input type="number" value={space.spaceValueStart} onChange={(e) => handleDataChange("spaceValueStart", e, index)}/>
                                        ) : (
                                            space.spaceValueStart
                                        )}
                                    </td>
                                    <td>
                                        {editLine === space.id ? (
                                            <input type="number" value={space.spaceValueBought} onChange={(e) => handleDataChange("spaceValueBought", e, index)} />
                                        ) : (
                                            space.spaceValueBought
                                        )}
                                        
                                    </td>
                                    <td>
                                        {editLine === space.id ? (
                                            <div>
                                                <Button handleClick={(event) => saveSpaceData(event, index)} display={"Save"} />
                                                <Button handleClick={(event) => cancelEdit(event, index)} display={"Cancel"} />
                                            </div>
                                        ) : (
                                            <dir>
                                                <Button handleClick={(event) => handleEditor(event, space.id, index)} display={"Edit"} validator={editLine===null} />
                                                <Button handleClick={(event) => deleteSpace(event, space.id, index)} display={"Delete"} validator={editLine===null} />
                                            </dir>
                                        )}
                                        
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                    <tr>
                        <td></td><td></td>
                        <td>
                            <Button handleClick={(event) => addNewSpace(event)} display={"Add New Space"} validator={editLine===null} />
                                
                        </td>
                        <td></td><td></td>
                    </tr>
                </tbody>
            </table>
            <Link className='link' to="/game">
                <Button id="play-button" handleClick={useNewGame} display="Play" classes="home-button"/>
            </Link>
        </main>
    )

}

export default EditPage;