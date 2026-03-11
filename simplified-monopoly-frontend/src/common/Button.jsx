
const Button = ({ id, display, classes, handleClick, validator = true}) => {

    return (
        <button id={id} className={classes} onClick={handleClick} disabled={!validator}>
            {display}
        </button>
    )
}

export default Button;