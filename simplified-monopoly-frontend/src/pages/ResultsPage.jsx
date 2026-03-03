import ImageHandler from "../classes/ImageHandler";
import Button from "../common/Button";
import { useNavigate } from "react-router";

const ResultsPage = ({thePlayers, setThePlayers, defaultPlayers, setGeneralOptions, defaultOption}) => {

    const navigate = useNavigate();
    const resultsData = thePlayers.map( player => [player.name, player.color, player.amount]);
    resultsData.sort((a, b) => b[2] - a[2]);
    
    const displayResults = () => { // This will display the winner.  Most of this is conditions for players that have the same amount.

        let winner = "";
        let second = "";
        let third = "";
        let fourth = "";
        
        resultsData[0][0] + "with" + resultsData[0][2];
        if(resultsData[0][2] != resultsData[1][2]){
            winner = resultsData[0][0] + " with " + resultsData[0][2];

            if(resultsData[1][2] === resultsData[2][2]){

                if(resultsData[1][2] === resultsData[3][2]){
                    second = resultsData[1][0] + ", " + resultsData[2][0] + ", and " + resultsData[3][0] + " : $" + resultsData[1][2];

                    const partialData =resultsData.slice(1,4);
                    return (
                        <div>
                            <div className="result-row-1">
                                <h4>{winner}</h4>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[0][1])})`}} ></div>
                            </div>
                            <div className="result-row-2">
                                <h5>{second}</h5>
                                {partialData.map((data) => 
                                    <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(data[1])})`}} ></div>
                                )}
                            </div>
                        </div>
                    )
                } else{
                    second = resultsData[1][0] + " and " + resultsData[2][0] + " : $" + resultsData[1][2];
                    third = resultsData[3][0] + " : " + resultsData[3][2];
                    const partialData =resultsData.slice(1,3);

                    return (
                        <div>
                            <div className="result-row-1">
                                <h4>{winner}</h4>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[0][1])})`}} ></div>
                            </div>
                            <div className="result-row-2">
                                <h5>{second}</h5>
                                {partialData.map((data) => 
                                    <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(data[1])})`}} ></div>
                                )}
                            </div>
                            <div className="result-row-2">
                                <h5>{third}</h5>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[3][1])})`}} ></div>
                            </div>
                        </div>
                    )

                }
            } else {
                second = resultsData[1][0] + " : $" + resultsData[1][2];

                if(resultsData[2][2] === resultsData[3][2]){
                    third = resultsData[2][0] + " and " + resultsData[3][0] + " : $" + resultsData[2][2];
                    const partialData =resultsData.slice(2,4);

                    return (
                        <div>
                            <div className="result-row-1">
                                <h4>{winner}</h4>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[0][1])})`}} ></div>
                            </div>
                            <div className="result-row-2">
                                <h5>{second}</h5>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[1][1])})`}} ></div>
                            </div>
                            <div className="result-row-2">
                                <h5>{third}</h5>
                                {partialData.map((data) => 
                                    <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(data[1])})`}} ></div>
                                )}
                            </div>
                        </div>
                    )

                } else {
                    third = resultsData[2][0] + " : $" + resultsData[2][2];
                    fourth = resultsData[3][0] + " : $" + resultsData[3][2];

                    return (
                        <div>
                            <div className="result-row-1">
                                <h4>{winner}</h4>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[0][1])})`}} ></div>
                            </div>
                            <div className="result-row-2">
                                <h5>{second}</h5>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[1][1])})`}} ></div>
                            </div>
                            <div className="result-row-2">
                                <h5>{third}</h5>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[2][1])})`}} ></div>
                            </div>
                            <div className="result-row-2">
                                <h5>{fourth}</h5>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[3][1])})`}} ></div>
                            </div>
                        </div>
                    )
                }
            }

        } else if(resultsData[0][2] === resultsData[1][2]) {
            if(resultsData[0][2] === resultsData[2][2]){
                if(resultsData[0][2] === resultsData[3][2]){
                    winner = resultsData[0][0] + ", " + resultsData[1][0]  + ", " + resultsData[2][0]  + ", and " + resultsData[3][0] + " with $" + resultsData[0][2];
                    
                    return (
                        <div className="result-row-1">
                            <h4>{winner}</h4>
                            {resultsData.map((data) => 
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(data[1])})`}} ></div>
                            )}
                        </div>
                    )
                } else {
                    winner = resultsData[0][0] + ", " + resultsData[1][0] + ", and " + resultsData[2][0] + " with $" + resultsData[0][2];
                    second = resultsData[3][0] + " : $" + resultsData[3][2];
                    const partialData = resultsData.slice(0,3);

                    return (
                        <div>
                            <div className="result-row-1">
                                <h4>{winner}</h4>
                                {partialData.map((data) => 
                                    <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(data[1])})`}} ></div>
                                )}
                            </div>
                            <div className="result-row-2">
                                <h5>{second}</h5>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[3][1])})`}} ></div>
                            </div>
                        </div>
                    )

                }
            } else {
                winner = resultsData[0][0] + " and " + resultsData[1][0] + " with $" + resultsData[0][2];
                if(resultsData[2][2] === resultsData[3][2]){

                    second = resultsData[2][0] + " and " + resultsData[3][0] + " : $" + resultsData[2][2];
                    const partialData = resultsData.slice(0,2);
                    const partialData2 = resultsData.slice(2,4);
                    return (
                        <div>
                            <div className="result-row-1">
                                <h4>{winner}</h4>
                                {partialData.map((data) => 
                                    <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(data[1])})`}} ></div>
                                )}
                            </div>
                            <div className="result-row-2">
                                <h5>{second}</h5>
                                {partialData2.map((data) => 
                                    <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(data[1])})`}} ></div>
                                )}
                            </div>
                        </div>
                    )
                } else {
                    second = resultsData[2][0] + " : $" + resultsData[2][2];
                    third = resultsData[3][0] + " : $" + resultsData[3][2];
                    const partialData = resultsData.slice(0,2);
                    return (
                        <div>
                            <div className="result-row-1">
                                <h4>{winner}</h4>
                                {partialData.map((data) => 
                                    <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(data[1])})`}} ></div>
                                )}
                            </div>
                            <div className="result-row-2">
                                <h5>{second}</h5>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[2][1])})`}} ></div>
                            </div>
                            <div className="result-row-2">
                                <h5>{third}</h5>
                                <div className="player-display-results" style={{ backgroundImage: `url(${ImageHandler(resultsData[3][1])})`}} ></div>
                            </div>
                        </div>
                    )
                }
            }

        }

    }

    const goBackHome = (event) => {
        event.preventDefault();

        setThePlayers(structuredClone([...defaultPlayers]));
        setGeneralOptions(structuredClone({...defaultOption}));
        navigate("/");
    }

    return (
        <main>
            <div className="results-board">
                <h3>AND THE WINNER IS...</h3>
                {displayResults()}
            </div>
            <Button id="back-home-button" handleClick={goBackHome} display={"Go to Home Page"}/>
        </main>
    )
}

export default ResultsPage;