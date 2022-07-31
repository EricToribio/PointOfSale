import { useState } from "react";


export default (props: { page: string }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const header = props.page === "landing" ? "Point of Sale"
    : props.page === "login" ? "Login"
      : props.page === "about" ? "About"
        : props.page === "demo" ? "Request a Demo"
          : props.page === "features" ? "Features"
            : props.page === "register" && "Register"

  const style = {
    "display": "none"
  }
  const handleNull = () => { return null;}
 

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded px-4">
      <h2 className="navbar-brand font-weight-bolder">

        <span className="">{header}</span>
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
            props.page !== "about" &&
            <a className="nav-link text-info" href="/about" >About Us</a>
          }
          {
            props.page !== "login" &&
            <a className="nav-link text-info" href="/login" >Login</a>
          }
          {
            props.page !== "features" &&
            <a href="/features" className=" nav-link text-info" >Features</a>
          }
          {
            props.page !== "demo" &&
            <a href="/demo" className=" nav-link text-info" >Request a Demo</a>
          }
          {
            props.page !== "landing" &&
            <a href="/" className=" nav-link text-info" >Home</a>
          }
        </div>
      </div>
    </nav>
  )
}