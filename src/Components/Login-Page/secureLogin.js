/* Prevent JSON attacks */
export function characterPass(userQuery) {

    const [username, setUserName] = useState(userQuery.username);
    const [password, setPassword] = useState(userQuery.password);
    const [salt, setSalt] = useState(userQuery.salt);
    //Variables//


    //Check character string//


    //Validate password//


    return false;
}


/* Salt and Hash password */
export function passwordSecure() {

    
}