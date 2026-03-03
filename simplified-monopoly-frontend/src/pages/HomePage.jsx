import { Link } from "react-router"
import Button from "../common/Button"

const HomePage = () => {

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