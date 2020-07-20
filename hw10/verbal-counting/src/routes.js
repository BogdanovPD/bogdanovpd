const { default: VueRouter } = require("vue-router");
import Main from './components/Main'
import Settings from './components/Settings'

const router = new VueRouter ({
    routes: [
        { path: '/', component: Settings },
        { path: '/training', name: 'training', component: Main, props: true },
    ]
})

export default router