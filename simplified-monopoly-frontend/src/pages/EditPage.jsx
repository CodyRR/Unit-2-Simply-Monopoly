import { use, useState } from "react";
import { DataContext } from "../context/DataContext";
import Button from "../common/Button";
import { Link } from "react-router";

const EditPage = () => {

    const { allGameBoard, setAllGameBoard, setNewGame, gameSet, setGameSet} = use(DataContext)
    const [ editLine, setEditLine] = useState(null);

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

            console.log(allGameBoard[index].id)
            console.log(data);
            const response = await fetch("http://localhost:8080/api/game-boards/" + allGameBoard[index].id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

        } catch (error) {
            console.error(error.message);
        }
    }

    const handleEditor = (event, index) => {
        setEditLine(index);
        event.preventDefault();

    };

    const handleDataChange = (keyTerm, e, index) => {
        const newData = [...allGameBoard];
        newData[index][keyTerm] = e.target.value;
        setAllGameBoard(newData)
    }

    return (
        <main>
            <h1>Edit Board</h1>
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
                                            <Button handleClick={(event) => saveSpaceData(event, index)} display={"Save"} />
                                        ) : (
                                            <Button handleClick={(event) => handleEditor(event, space.id)} display={"Edit"} />
                                        )}
                                        
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
            <Link className='link' to="/game">
                <Button id="play-button" handleClick={useNewGame} display="Play" classes="home-button"/>
            </Link>
        </main>
    )

}

export default EditPage;