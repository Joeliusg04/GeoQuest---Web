export default function authHeader() {
    let token = JSON.parse(localStorage.getItem('token'));
    console.log("el token es " + token)
    // En cas de tenir un usuari logged amb un accessToken, retorna l'Authorization Header HTTP
    if (token) {
        return {Authorization: 'Bearer ' + token};
    } else {
        return {};
    }
}