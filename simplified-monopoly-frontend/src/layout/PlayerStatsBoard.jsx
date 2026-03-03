import ImageHandler from "../classes/ImageHandler"

const PlayerStatsBoard = ({thePlayers}) => {

    return(
        <div className="player-stats-board">
            {thePlayers.map((player) => (
                <div className="player-stat">
                <p>{player.name}: ${player.amount}</p>
                <img className="player-icon" src={ ImageHandler(player.color)} alt={player.color +  " piece"}/>
            </div>
            ))}
        </div>
    )
}

export default PlayerStatsBoard