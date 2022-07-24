function isEmail(search:string):boolean
    {
        var  serchfind:boolean;

        let regexp = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');

        serchfind = regexp.test(search);

        console.log(serchfind)
        return serchfind
    }

export const registrationValidations = function (firstName: string, lastName: string, email: string, password: string, confirmPassword: string)  {
    let errors = new Map<string, string>();
    if (firstName.length > 3) {
        errors.set("firstName", "firstName must be 3 characters long")
    }
    if (lastName.length > 3) {  
        errors.set("lastName",  "lastName must be 3 characters long")
    }
    if (!isEmail(email)) {
        errors.set("email", "email must be a valid email address")
    }
    if (password !== confirmPassword) {
        errors.set("password", "password must match")
    }
    return errors

}