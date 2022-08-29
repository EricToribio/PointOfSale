import useCheckLoggedIn from "../hooks/useCheckLoggedIn"

export default () =>{
    useCheckLoggedIn('features')
    return(
        <div>
            <h1>Features</h1>
        </div>
    )
}