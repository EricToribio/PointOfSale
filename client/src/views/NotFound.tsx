import { MouseEvent } from "react";
import { useHistory } from "react-router-dom"

export default  ()  => { 
    const history = useHistory()
    const onclickHandler = () => {
        console.log('here')
        history.push('/')
    }
    return(
    <div>
        <h1>
            404 Not Found
        </h1>
        <button onClick={onclickHandler}>
            Click here to go home!
        </button>
    </div>
)}