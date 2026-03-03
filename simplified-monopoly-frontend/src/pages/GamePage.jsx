import { useEffect, useState } from "react"
import { spaceData } from "../data/spaceData"
import { useNavigate } from "react-router";
import SpaceField from "../layout/SpaceField";
import StatusBoard from "../layout/StatusBoard";
import PlayerStatsBoard from "../layout/PlayerStatsBoard";
import Space from "../classes/BoardSpace"

const GamePage = ({thePlayers, setThePlayers, generalOptions}) => {

    const navigate = useNavigate();
    const spaceArrayData = [];
    spaceData.forEach(function(space) {
        spaceArrayData.push( new Space(space[0], space[1], space[2], space[3], space[4]));
    })

    const [theSpaces, setTheSpaces] = useState(spaceArrayData);
    const [widthSize, setWidthSize] = useState(null);
    const [turnNumber, setTurnNumber] = useState(1);
    const [currentPlayerTurn, setCurrentPlayerTurn] = useState(1);
    const [gameState, setGameState] = useState("Start");
    const [dieRoll, setDieRoll] = useState(0);
    const [dieRoll2, setDieRoll2] = useState(0);

    

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
                if(turnNumber >= generalOptions.turnNumber){
                    
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
            <SpaceField theSpaces={theSpaces} widthSize={widthSize} thePlayers={thePlayers}/>
            <StatusBoard thePlayers={thePlayers} setThePlayers={setThePlayers} theSpaces={theSpaces} setTheSpaces={setTheSpaces} turnNumber={turnNumber} currentPlayerTurn={currentPlayerTurn} gameState={gameState} dieRoll={dieRoll} dieRoll2={dieRoll2} buttonChange={gameEventHandle} />
            <PlayerStatsBoard thePlayers={thePlayers} />
        </main>
    )
}

export default GamePage