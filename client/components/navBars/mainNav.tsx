import { useState } from "react";
import { MyUser } from "../../utils/userUtil";


export default (props: {user:MyUser,page:string}) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  

  const style = {
    "display": "none"
  }
  const handleNull = () => { return null;}
 

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded px-4">
      <h2 className="navbar-brand font-weight-bolder">

        <span className="">{props.user.shop.shopName}</span>
      </h2>

      <button className="custom-toggler navbar-toggler" type="button"
        data-toggle="collapse"
        data-target="#navbars"
        aria-controls="navbars"
        aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation"
        data-auto-close="outside"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`${isNavCollapsed ? 'collapse ' : ''} navbar-collapse `} id="navbars">
        <div className={`${isNavCollapsed ? 'navbar-collapse' : 'position-absolute top-3 end-0 bg-light mt-2'}  `}
        onMouseLeave={isNavCollapsed ? handleNull : handleNavCollapse}>
          {
            props.page !== "account" && props.user.admin &&
            <a className="nav-link text-info p-2" href="/pos/account" >Account</a>
          }
          {
            props.page !== "newRo" &&
            <a href="/pos/new/work-order" className=" nav-link text-info p-2" >New Work Order</a>
          }
          {
            props.page !== "sales" &&
            <a href="/pos/sales" className=" nav-link text-info p-2" >Sales</a>
          }
          {
            props.page !== "clockIn" &&
            <button className="border-0 bg-transparent nav-link text-info p-2" >Clock in</button>
          }
          {
            props.page !== "main" &&
            <a href="/pos/main" className=" nav-link text-info p-2" >Home</a>
          }
          
            <a className="nav-link text-info p-2" href="/logout" >Logout</a>
          
        </div>
      </div>
    </nav>
  )
}