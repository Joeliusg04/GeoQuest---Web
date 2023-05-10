import AuthService from '../services/auth.service';
// import UserService from "@/services/user.service";

const token = JSON.parse(localStorage.getItem('token'));

const user = JSON.parse(localStorage.getItem('user'));

/*

if (token) {

    UserService.getUsername().then((response) => {

        UserService.getByNickname(response.data).then((response) => {

            auth.user = response.data
            console.log("he arribat aqui")
        }).catch((error) => {
            console.log("Error store" + error)
        })
    }).catch((error) => {
        console.log("Error store 2" + error)
    })
}
*/


const initialState = token
    ? {status: {loggedIn: true}, user: user}
    : {status: {loggedIn: false}, user: null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, user) {
            return AuthService.login(user.nickname, user.password).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        register({commit}, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            )
        },
        logout({commit}) {
            AuthService.logout();
            commit('logout');
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};