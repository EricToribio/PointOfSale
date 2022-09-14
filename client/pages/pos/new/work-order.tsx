import React, { useEffect, useState } from 'react'
import MainNav from '../../../components/navBars/mainNav'
import CustomerLookup from '../../../components/workOrder/customerLookup'
import WorkOrderCustomerForm from '../../../components/workOrder/workOrderCustomerForm'
import { MyCustomer } from '../../../utils/customer'
import { GetUser, MyUser } from '../../../utils/userUtil'


export default () => {
  const [loaded, setLoaded] = useState<boolean>(false);
    const [user,setUser] = useState<MyUser>();
  const [isNewCustomer, setIsNewCustomer] = useState<Boolean>(false)
  const [customer, setCustomer] = useState<MyCustomer>()

  useEffect(()=> {
    setUser(GetUser())
    setLoaded(true)
  },[])
  return (
    <div>
     {loaded &&
      <div>
        <MainNav user={user} page={'newRo'} />
        {
          isNewCustomer ?
          <WorkOrderCustomerForm customer={customer} setNewCustomer={setCustomer}/>
          :
          <CustomerLookup user={user}   setIsNewCustomer={setIsNewCustomer}/>
        }
      </div>

      }
        </div>
  )
}