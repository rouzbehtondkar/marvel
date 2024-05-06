import { defineNuxtRouteMiddleware } from '#app';

import Swal from 'sweetalert2';
export default defineNuxtRouteMiddleware((to,from)  => {
    const token = localStorage.getItem('authToken');
    if (token) {
        Swal.fire({
            icon: 'error',
            title: 'کاربر گرامی',
            text: 'مجددا وارد نشوید',
        });
        if (to.path.match(/^\/$/)) {
            return navigateTo('/landing');
        }

    } else {
        if (to.path !== '/') {
            return navigateTo('/');
        }
    }
});
