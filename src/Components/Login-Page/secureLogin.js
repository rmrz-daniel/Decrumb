///I have problems importing these functions into the component login.jsx - review


/* Prevent JSON attacks */
export function characterPass(user) {

    if(user.username.search(/{|}|%|,|:|+|'|"|.|/i) != -1 || user.password.search(/{|}|%|,|:|+|'|"|.|/i) != -1) {
        return false;
    }
    //Check character string//

    return true;
}


/* Salt and Hash password */
export function passwordSecure(user) {

    //Salting & Hash
    const encryption = {
        salt: Math.floor(100000 + Math.random() * 900000).toString(),
        encryptedPassword: CryptoJS.AES.encrypt(user.password, salt)
    }

    return encryption;
}
