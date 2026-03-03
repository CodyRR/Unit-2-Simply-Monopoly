import ImageHandler from "../classes/ImageHandler";
import ImageHandlerDie from "../classes/ImageHandlerDie";
import Button from "../common/Button";
import { useState, useEffect } from "react";

const StatusBoard = ({thePlayers, setThePlayers, theSpaces, setTheSpaces, turnNumber, currentPlayerTurn, gameState, dieRoll, dieRoll2, buttonChange}) => {
    
    const [ buySpaceOption, setBuySpaceOption] = useState(true);
    const [ playerBought, setPlayerBought] = useState(false);

    useEffect(()=> {
  
    setBuySpaceOption(true);
    setPlayerBought(false)

    }, [gameState]);
    const handleGameState = () => {

        if(gameState === "Start"){
            return startingBoard();
        } else if(gameState === "RollDie"){
            return pressToRoll();
        } else if(gameState === "AfterRoll") {
            
            return afterRoll();
        }
    }

    const pressToRoll = () => { // This is the setup for the player's turn and roll

        return (
            <>
                <div>
                    <div>
                        Turn Number : {turnNumber}
                    </div>
                    <div>
                        {thePlayers[currentPlayerTurn -1].name} 
                        <img className="player-display-status" src={ ImageHandler(thePlayers[currentPlayerTurn-1].color)} alt={thePlayers[currentPlayerTurn-1] +  " piece"}/>
                    </div>
                </div>
                <div>
                    <div>Roll the Die</div>
                    <Button id="roll-button" display="Roll Die" classes="roll-button" handleClick={buttonChange}/>
                </div>
                <div>
                    You are on {theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].name}
                </div>
            </>
        )
    }

    const afterRoll = () => { // This updates the board where the player lands
        
        return (
            <>
                <div>
                    <div>
                        {thePlayers[currentPlayerTurn -1].name} rolled a
                    </div>
                    <div>
                        <img className="die-display" src={ ImageHandlerDie(dieRoll)} alt={"Roll a " + dieRoll}/>
                        {dieRoll2 != 0 && <img className="die-display" src={ ImageHandlerDie(dieRoll2)} alt={"Roll a " + dieRoll2}/>}                    
                    </div>
                </div>
                <div>
                    <div>
                        You landed on 
                    </div>
                    <div>
                        {theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].name}
                    </div>
                </div>
                <div>
                    {buySpaceOption ? checkOwner() : returnToGame()}
                </div>
            </>
        )
    }

    const checkOwner = () => { // This checks the space for the owner


        if(theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].name === "GO"){
            return (
                <div>
                    <div>
                        {thePlayers[currentPlayerTurn -1].name} landed on Go
                    </div>
                    <div>
                        <Button id="continue-button" display="Continue" classes="continue-button" handleClick={buttonChange}/>
                    </div>
                </div>
            )
        } else if (theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].owner === "Sale") {
            
            return(
                <div>
                    <div>
                        Space is for sale. Buy?
                    </div>
                    <div>
                        Buy for {theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].spaceValueStart}
                    </div>
                    <div>
                        <Button id="buy-button" display="Yes" classes="buy-button" handleClick={()=>buySpace()} />
                        <Button id="no-button" display="No" classes="no-button" handleClick={()=>(setBuySpaceOption(false))} />
                    </div>
                </div>
            )
        } else if (theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].owner === thePlayers[currentPlayerTurn -1].name) {

            return (
                <div>
                    <div>
                        You own this space.
                    </div>
                    <div>
                        <Button id="continue-button" display="Continue" classes="continue-button" handleClick={buttonChange}/>
                    </div>
                </div>
            )
        } else {

            let spaceOwner = thePlayers.findIndex(player => player["name"] === theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].owner)

            return (
                <div>
                    <div>
                        {thePlayers[currentPlayerTurn-1].name} must pay {thePlayers[spaceOwner].name} $ {theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].spaceValueBought}
                    </div>
                    <div>
                        <Button id="rent-button" display="Pay" classes="pay-button" handleClick={()=>handlePayment(spaceOwner)}/>
                    </div>
                </div>
            )
        }
    }

    const handlePayment = (spaceOwner) => { // The player must pay the owner the value.
        setBuySpaceOption(false);
        let newData = [...thePlayers];

        newData[currentPlayerTurn -1].amount -= theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].spaceValueBought;
        newData[spaceOwner].amount += theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].spaceValueBought;
        setThePlayers(newData)
    }

    const buySpace = () => { // This happens if the player buys a space that is for sale.

        setBuySpaceOption(false);
        setPlayerBought(true);
        let newData = [...theSpaces];
        let newData2 = [...thePlayers];
        newData2[currentPlayerTurn -1].amount -= theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].spaceValueStart;

        newData[thePlayers[currentPlayerTurn -1].currentSpace].owner = thePlayers[currentPlayerTurn -1].name;
        newData[thePlayers[currentPlayerTurn -1].currentSpace].color = thePlayers[currentPlayerTurn -1].color;
        newData[thePlayers[currentPlayerTurn -1].currentSpace].spaceIsBought = true;

        setThePlayers(newData2);
        setTheSpaces(newData);
    }

    const returnToGame = () => { // This is the end of the player turn. Pressing the button will continue.

        return (
            <div>
                <div>
                    {playerBought ? 
                    (<div>
                        {thePlayers[currentPlayerTurn -1].name} bought {theSpaces[thePlayers[currentPlayerTurn -1].currentSpace].name}
                    </div>) : (<div>Turn over</div>)}
                </div>
                <div>
                    <Button id="continue-button" display="Continue" classes="continue-button" handleClick={buttonChange}/>
                </div>
            </div>
        )
    }
     
    const startingBoard = () => {

        return (
            <>
                <p></p>
                <div>
                    <p>Press Start to begin</p>
                    <Button id="start-button" display="Start Game" classes="start-button" handleClick={buttonChange} />
                </div>
                <p></p>
            </>
        )
    }

    return(
        <div className="status-board">
            {handleGameState()}
        </div>
    )
}

export default StatusBoard;