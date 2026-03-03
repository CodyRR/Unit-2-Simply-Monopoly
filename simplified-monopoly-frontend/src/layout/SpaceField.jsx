import SpaceCard from "../common/SpaceCard"

const SpaceField = ({theSpaces, widthSize, thePlayers}) => {

    const drawCard = (space, index, theSpaces, widthSize) => {



        let lastItem = false;
        if ( (theSpaces.length != (index+1)) && ((index +1) % widthSize ===0)){
            lastItem = true;
        }

        return (
            <>
                <SpaceCard key={space.name} currentSpace={space} thePlayers={thePlayers}/>
                {lastItem && <div key={"rowBoard-" + index} className="row-border"></div>}
            </>
        )

    }

    return (
        <div>
            <div className="grid">
                {theSpaces.map((space, index, theSpaces) => (
                    drawCard(space,index, theSpaces, widthSize)
                ))}
            </div>
        </div>
    )

}

export default SpaceField