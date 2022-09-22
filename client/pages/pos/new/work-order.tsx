import Cookies from 'js-cookie'
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import NewRoModal from '../../../components/modals/newRoModal'
import MainNav from '../../../components/navBars/mainNav'
import CustomerLookup from '../../../components/workOrder/customerLookup'
import Jobs from '../../../components/workOrder/jobs'
import WorkOrderCustomerForm from '../../../components/workOrder/workOrderCustomerForm'
import { GetCustomer, MyCustomer } from '../../../utils/customer'
import { newRoTableHeaders } from '../../../utils/tableHeader'
import { GetUser, MyUser } from '../../../utils/userUtil'


export default () => {
  const [tab, setTab] = useState<string>(Cookies.get('tab') ? Cookies.get('tab') : "customer")
  const [gotCustomer, setGotCustomer] = useState<boolean>(false);
  const [foundCustomer, setFoundCustomer] = useState<MyCustomer>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<MyUser>();
  const [isNewCustomer, setIsNewCustomer] = useState<boolean>(false)
  

  const activeLink = "bg-danger"
  const inactiveLink = "bg-dark text-light"
  const tabStyle = " border-0 btn btn-lg"
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => {
    gotCustomer ?
    setOpen(false)
    : 
    setOpen(true)
  
  }
  useEffect(() => {
    !gotCustomer && !Cookies.get('customerToken') && toggle()
  },[!gotCustomer])

  

  useEffect(() => {
    Cookies.get('customerToken') && (
      setFoundCustomer(GetCustomer),
      setGotCustomer(true)
    )
    setUser(GetUser())
    setLoaded(true)
  }, [!open])

  const newTab = (e : FormEvent<HTMLInputElement>, name : string) => {
    e.preventDefault()
    Cookies.set('tab', name, {path : '/'})
    setTab(Cookies.get('tab'))
  }

  return (
    <div>
      <NewRoModal setTab={setTab} IsOpen={open} toggle={toggle} setGotCustomer={setGotCustomer} setIsNewCustomer={setIsNewCustomer} isNewCustomer={isNewCustomer} setOpen={setOpen}/>
      {loaded &&
        <div>
          <MainNav user={user} page={'newRo'} />
          <div className="d-flex justify-content-center ">

<div className="new-ro-table">
  
              <div className="d-flex justify-content-around gap-4 pt-4">
                {newRoTableHeaders.map((item, i) => {
                  let linkStyle = ``;
                  tab === item.Tab ? (linkStyle += `${activeLink}`) :
                    (linkStyle += `${inactiveLink}`);
                  return (
                    <button className={linkStyle + tabStyle} onClick={(e) => newTab(e,item.Tab)}>{item.Name}</button>
  
                  )
                })}
              </div>
  
              <div>
                {
                  tab === "customer" ?
                  <WorkOrderCustomerForm setTab={setTab} setOpen={setOpen} foundCustomer={foundCustomer} setGotCustomer={setGotCustomer} disabled={true} />
                  :
                  <div>
                    <Jobs/>
                    </div>
                }
              </div>
</div>





            {/* {
          isNewCustomer ?
          <WorkOrderCustomerForm setGotCustomer={setGotCustomer} />
          :
          <CustomerLookup user={user}   setIsNewCustomer={setIsNewCustomer}/>
        } */}
          </div>
        </div>

      }
    </div>
  )
}