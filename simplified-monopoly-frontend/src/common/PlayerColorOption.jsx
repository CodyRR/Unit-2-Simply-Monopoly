
const PlayerColorOption = ({id, defaultElement, handleChange}) => {


    return (
        <div>
            <select name={id} id={id} value={defaultElement} onChange={handleChange}>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="cyan">Cyan</option>
                <option value="purple">Purple</option>
                <option value="lightgray">Gray</option>
            </select>
        </div>
    )
}

export default PlayerColorOption