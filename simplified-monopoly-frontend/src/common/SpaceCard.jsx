import ImageHandler from "../classes/ImageHandler"

const SpaceCard = ({currentSpace, thePlayers}) => {

    return (
        
        <div className="card" style={{'--hover-color': currentSpace.color}}>
            <div className="owner-color" style={{ backgroundColor: currentSpace.color}}></div>
            <div className="card-field">
                {thePlayers.map((player) => {
                    if(player.currentSpace === currentSpace.spaceNum) {
                        return <img key={"player-" + player.playerId} className="player-display" src={ ImageHandler(player.color)} alt={player.color + "'s piece"}/>
                        
                    }
                })}
            </div>
            <div className="container">
                <p>{currentSpace.spaceIsBought ? currentSpace.spaceValueBought : currentSpace.spaceValueStart}</p>
                <p>{currentSpace.name}</p>
            </div>
        </div>
    )

}

export default SpaceCard