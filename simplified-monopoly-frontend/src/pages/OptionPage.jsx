import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../common/Button";
import PlayerColorOption from "../common/PlayerColorOption";

const OptionsPage = ({thePlayers, setThePlayers, defaultPlayers, generalOptions, setGeneralOptions, defaultOption}) => {

    const navigate = useNavigate();

    const [playerData, setPlayerData] = useState(structuredClone(thePlayers));
    const [optionData, setOptionData] = useState(structuredClone(generalOptions));
    const [validOutput, setValidOutput] = useState(true);

    useEffect(()=>{

        let playerNames = [];
        let playerColors = [];
        let optionNumber = [];
        for(let i = 0; i < playerData.length; i++){
            playerNames.push(playerData[i].name);
            playerColors.push(playerData[i].color);
            optionNumber.push(playerData[i].amount);
        }
        optionNumber.push(optionData.turnNumber);
        let validName = checkForDuplicates(playerNames);
        let validColor = checkForDuplicates(playerColors);
        let validNumber = checkForNegatives(optionNumber)

        if(validName && validColor && validNumber){
            setValidOutput(true);
        } else {
            setValidOutput(false);
        }

    }, [playerData, optionData])

    const checkForDuplicates = (data) => {

        for(let i = 0; i < data.length; i++){

            for(let j = i+1; j< data.length; j++){
                if(data[i] === data[j]){

                    return false;
                }
            }
        }
        return true;
    }
    
    const checkForNegatives = (data) => {

        for(let i = 0; i < data.length; i++){
            if(data[i] <= 0){
                return false;
            }
        }
        return true;
    }

    const handleDataChange = (playerNum, index, event) => {
        let newData = [...playerData];
        newData[playerNum][index] = event.target.value;
        setPlayerData(newData);
    }

    const handleGeneralChange = (name, event) => {
        let newData = {...optionData};
        newData[name] = Number(event.target.value);
        setOptionData(newData);
    }

    const handleRadioChange = (event) => {

        let newData = {...optionData};
        newData["diceStyle"] = Number(event.target.value);
        setOptionData(newData);
    }

    const saveData = (event) => {

        event.preventDefault();
        setThePlayers(playerData);
        setGeneralOptions(optionData);
    }

    const goToGame = (event) => {
        event.preventDefault()
        navigate("/game")
    }

    const restoreDefaults = (event) => {

        event.preventDefault();
        
        setPlayerData(structuredClone([...defaultPlayers]));
        setThePlayers(structuredClone([...defaultPlayers]));
        setOptionData(structuredClone({...defaultOption}));
        setGeneralOptions(structuredClone({...defaultOption}));
    }

    return (
        <main>
            <form className="grid-form-container">

                {playerData.map((player, index) => (
                    <>
                        <label>Player {player.playerId}</label>

                        <label>Name:</label>
                        <input type="text" name={"player"+player.playerId+"Name"} value={player.name} onChange={(event) => handleDataChange(index,"name", event)} />
                        
                        <div></div>

                        <label>Color:</label>
                        <PlayerColorOption id={"player"+player.playerId+"Color"} defaultElement={player.color} handleChange={(event) => handleDataChange(index,"color", event)} />
                        
                        <div></div>

                        <label>Amount: $</label>
                        <input type="number" name={"player"+player.playerId+"amount"} step="1" value={player.amount} onChange={(event) => handleDataChange(index,"amount", event)} />
                        
                    </>
                ))}

                <div></div>
                <label>Turn Amount:</label>
                <input type="number" name="turnAmount" step="1" value={optionData.turnNumber} onChange={(event) => handleGeneralChange("turnNumber", event)}/>
                
                <div></div>
                <label>Dice Number:</label>
                <div className="radio-container">
                    <div>
                        <input type="radio" id="diceNum1" name="dice" value={1} checked={optionData["diceStyle"] === 1} onChange={handleRadioChange} />
                        <label htmlFor="diceNum1">1 Die</label>
                    </div>
                    <div>
                        <input type="radio" id="diceNum2" name="dice" value={2} checked={optionData["diceStyle"] === 2} onChange={handleRadioChange} />
                        <label htmlFor="diceNum2">2 Die</label>
                    </div>
                    <div>
                    
                        <input type="radio" id="diceNum3" name="dice" value={3} checked={optionData["diceStyle"] === 3} onChange={handleRadioChange} />
                        <label htmlFor="diceNum3">Low Die</label>
                    </div>
                </div>

                <div></div>
                <label>Amount from Go: $</label> 
                <input type="number" name="passGoAmount" step="1" value={optionData.passGoAmount} onChange={(event) => handleGeneralChange("passGoAmount", event)} />
                    
                <Button id="save-button" handleClick={saveData} validator={validOutput} display={"Save"}/>
                <Button id="play-options-button" handleClick={goToGame} validator={validOutput} display="Play"/>
                <Button id="restore-button" handleClick={restoreDefaults} display={"Restore Defaults"}/>
            </form>
            {!validOutput && <p className="error-menu" >The names or colors need to be different or the amounts or turns must be positive</p>}
        </main>
    )
}

export default OptionsPage;