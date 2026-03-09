import { Link, Navigate } from "react-router"
import Button from "../common/Button"
import { use } from "react"
import { DataContext } from "../context/DataContext"

const HomePage = () => {

    const {isSaveData, setNewGame} = use(DataContext);

    const useSaveGame = () => {
        setNewGame(false);
    }

    return (
        <main id="home-container">
            <h1 id="welcome-sign">Welcome to Simply Monopoly</h1>
            <table className="welcome-table">
                <tbody>
                    <tr>
                        <td>
                            <Link className='link' to="/game">
                                <Button id="play-button" display="Play" classes="home-button"/>
                            </Link>
                        </td>
                        <td>
                            <label>Play the game with set rules</label>
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
            </table>
        </main>
    )
}

export default HomePage