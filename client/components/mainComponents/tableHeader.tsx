import { Dispatch, SetStateAction } from "react"
import { tableHeaders } from "../../utils/tableHeader"


export default (props:{tab:String,setTab:Dispatch<SetStateAction<String>>})=>{

    const activeLink = "bg-danger"
    const inactiveLink = "bg-dark text-light"
    const tabStyle = " border-0"
    

    return(
        <div className="d-flex justify-content-center ">
            <table className="">
                <thead>
                    <tr>
                        {tableHeaders.map((item,i)=>{
                            let linkStyle = ``;
                            props.tab === item.Tab ? (linkStyle += `${activeLink}`) :
                            (linkStyle += `${inactiveLink}`);
                            return(
                                <td><button className={linkStyle +tabStyle} onClick={() => props.setTab(item.Tab)}>{item.Name}</button></td>

                            )
                        })}
                        
                    </tr>
                </thead>
                
            </table>
        </div>
    )
}