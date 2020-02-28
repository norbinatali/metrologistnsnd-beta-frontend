

const Auth = {
    isAuthenticated: false,
    authenticate() {
        this.isAuthenticated = true;
    },
    signout() {
        this.isAuthenticated = false;
        this.client.cache.reset();
        sessionStorage.clear();
        this.client.clearStore().then(() => {
                this.client.resetStore();})
    },
    getAuth() {
        return this.isAuthenticated;
    }
};
export default Auth;
