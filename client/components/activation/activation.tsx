import Link from "next/link";
import { MouseEvent } from "react"
import { Button } from "reactstrap"


export default ()=>{

    function handleClick(e:  React.MouseEvent<HTMLButtonElement> ) {
       e.preventDefault();
        console.log(e.currentTarget.name,e.currentTarget.id)
    }

    return(
        <div className="container">
           <div className="row gap-4 pt-4 ">
               
                <div className=" col bg-dark">
                    <Button name="YearlyWithInspect"
                    id="1075.00" className=" p-4 bg-dark text-light" onClick={(e) => handleClick(e)}>
                        Yearly with inspection $1075.00
                    </Button>
                    <div className="d-flex justify-content-center p-3">
                        <Link  href="/pos/info#yearlywithinspect">More info</Link>
                    </div>
                </div>
                <div className="col bg-info">
                    <Button name="YearlyNoInspect" id="975.00" className=" p-4 bg-info text-dark" onClick={(e) => handleClick(e)}>
                        Yearly No Inspections $975.00
                    </Button>
                    <div className="d-flex justify-content-center p-3">
                        <Link  href="/pos/info">More info</Link>
                    </div>
                </div>
                <div className="w-100"></div>
                <div className="col bg-warning">
                    <Button name="MonthlyWithInspect" id="125" className=" p-4 bg-warning text-dark" onClick={(e) => handleClick(e)}>
                        Monthly with inspections $125.00
                    </Button>
                    <div className="d-flex justify-content-center p-3">
                        <Link  href="/pos/info">More info</Link>
                    </div>
                </div>
                <div className="col bg-danger">
                    <Button name="MonthlyNoInspect" id="105" className=" p-4 bg-danger text-dark" onClick={(e) => handleClick(e)}>
                        Monthly No inspections $105.00
                    </Button>
                    <div className="d-flex justify-content-center p-3">
                        <Link  href="/pos/info">More info</Link>
                    </div>
                </div>
           </div>
        </div>
    )
}