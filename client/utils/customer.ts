interface Address {
    address: string;
    city: string;
    zip: string;
    state: string;
}

export interface Vehicle {
    id: number;
    vin: string;
    make: string;
    model: string;
    plate: string;
}

export interface MyCustomer {
    firstName: string;
    lastName: string;
    phone: number;
    address: Address;
    vehicles : Vehicle[];
}





