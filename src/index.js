import Vue from "vue";
import App from "./App.vue";
import SuiVue from "semantic-ui-vue"
import TextareaAutosize from 'vue-textarea-autosize'
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue)
Vue.use(TextareaAutosize)

new Vue({
    render: h => h(App)
}).$mount("#app")