
export default defineNuxtRouteMiddleware((to,from)  => {
    const token = localStorage.getItem('authToken');
    if (token) {
        if (to.path.match(/^\/login($|\/)/)) {
            return navigateTo('/alert');
        }
    } else {
        if (to.path !== '/login') {
            return navigateTo('/login');
        }
    }
});
