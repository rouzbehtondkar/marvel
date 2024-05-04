import { defineNuxtRouteMiddleware } from '#app';

import Swal from 'sweetalert2';
export default defineNuxtRouteMiddleware((to,from)  => {
    const token = localStorage.getItem('authToken');
    if (token) {
        if (to.path.match(/^\/login($|\/)/)) {
            return navigateTo('/landing');
        }

    } else {
        if (to.path !== '/login') {
            return navigateTo('/login');
        }
    }
});
