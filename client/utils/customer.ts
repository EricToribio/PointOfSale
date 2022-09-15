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
    vehicles : Vehicle[];
}







