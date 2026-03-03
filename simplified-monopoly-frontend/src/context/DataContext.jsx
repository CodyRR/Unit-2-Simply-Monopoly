import { createContext, useEffect, useState } from "react";
import Space from '../classes/BoardSpace';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [ allGameBoard, setAllGameBoard]  = useState(null);

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
                        board.isStart
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

    useEffect(() => {
        fetchGameBoard();
    }, []);

    useEffect(() => {
        if(allGameBoard !== null){
            setIsLoading(false);
            console.log(allGameBoard);
        }
    }, [allGameBoard]);

    return(
        <DataContext.Provider
            value={{
                isLoading,
                allGameBoard,
                fetchGameBoard
            }}>
            {children}
        </DataContext.Provider>
    )
}