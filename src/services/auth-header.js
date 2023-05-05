export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    // En cas de tenir un usuari logged amb un accessToken, retorna l'Authorization Header HTTP
    if (user && user.accessToken) {
        return {Authorization: 'Bearer ' + user.accessToken};
    } else {
        return {};
    }
}