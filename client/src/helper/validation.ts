

export const isAddressValid = function (street: string, city: string, state: string, zip: string) {

    let errors = new Map<string, string>();
    if (street.length < 8) {
        errors.set("address", "Enter valid street")
    }
    if (city.length < 3) {
        errors.set("city", "Enter valid city")
    }
    if (state.length > 2) {
        errors.set("state", "Select a valid state")
    }
    if (zip.length != 5) {
        errors.set("zip", "Enter a valid zip code")
    }
    return errors
}

function isEmail(search: string): boolean {
    var serchfind: boolean;

    let regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

    serchfind = regexp.test(search);

    console.log(serchfind)
    return serchfind
}
function isValidPassword(password: string): boolean {
    let testPassword: boolean;
    let passwordREGEX = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)

    testPassword = passwordREGEX.test(password);
    return testPassword

}

export const registrationValidations = function (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    let errors = new Map<string, string>();
    if (firstName.length < 2) {
        errors.set("firstName", "First Name must be 2 characters long")
    }
    if (lastName.length < 3) {
        errors.set("lastName", "Last Name must be 3 characters long")
    }
    if (isEmail(email) == false) {
        errors.set("email", "Email must be a valid email address")
    }
    if (isValidPassword(password) == false) {
        errors.set("password", "Password must contain one number, one lowercase letter, one uppercase letter, and be at least 8 characters long")
    }
    if (password !== confirmPassword) {
        errors.set("confirmPassword", "Passwords must match")
    }
    
    return errors

}