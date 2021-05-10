import Vue from 'nativescript-vue';

import ASactivites from './components/app';

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false

new Vue({

    template: `
        <Frame>
            <ASactivites />
        </Frame>`,

    components: {
        ASactivites
    }
}).$start();