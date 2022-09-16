import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
export interface Address {
    address: string;
    city: string;
    zip: string;
    state: string;
}

export interface Vehicle {
    year: number;
    id: number;
    vin: string;
    make: string;
    model: string;
    plate: string;
    engineSize : number
}

export interface Customer {
    firstName: string ;
    lastName: string;
    email: string;
    phone: string;
}

export interface MyCustomer {
    customer: Customer;
    address: Address;
    vehicle : Vehicle[];
}


export const GetCustomer = () : MyCustomer => {
const customerCookie : string = Cookies.get('customerToken')
const customerToken : MyCustomer = jwt_decode(customerCookie)
console.log(customerToken)
const customer : MyCustomer = {
    customer : customerToken.customer,
    address : customerToken.address,
    vehicle : customerToken.vehicle
}
return customerToken
}







