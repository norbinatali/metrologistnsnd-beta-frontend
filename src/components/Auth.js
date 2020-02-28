import client from '../index.js';

const Auth = {
    isAuthenticated: false,
    authenticate() {
        this.isAuthenticated = true;
    },
    signout() {
        this.isAuthenticated = false;
        client.cache.reset();
        sessionStorage.clear();
        client.clearStore().then(() => {
                client.resetStore();})
        localStorage.clear();
    },
    getAuth() {
        return this.isAuthenticated;
    }
};
export default Auth;
