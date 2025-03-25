const homeChildren = [
    {
        name: 'menu',
        meta: { title: 'menu', isAuth: false },
        path: '/',
        component: () => import('../views/menu/index.vue')
    },
    {
        name: 'base',
        meta: { title: 'base', isAuth: false },
        path: '/base',
        component: () => import('../views/encode/base.vue')
    },
    {
        name: 'core_values',
        meta: { title: 'core_values', isAuth: false },
        path: '/core_values',
        component: () => import('../views/encode/coreValues.vue')
    },
    {
        name: 'url',
        meta: { title: 'url', isAuth: false },
        path: '/url',
        component: () => import('../views/encode/url.vue')
    },
    {
        name: 'html',
        meta: { title: 'html', isAuth: false },
        path: '/html',
        component: () => import('../views/encode/html.vue')
    },
    {
        name: 'hash',
        meta: { title: 'hash', isAuth: false },
        path: '/hash',
        component: () => import('../views/hash/hash.vue')
    },
    {
        name: 'hmac',
        meta: { title: 'hmac', isAuth: false },
        path: '/hmac',
        component: () => import('../views/hash/hmac.vue')
    },
    {
        name: 'picToBase64',
        meta: { title: 'picToBase64', isAuth: false },
        path: '/picToBase64',
        component: () => import('../views/encode/pic.vue')
    },
    {
        name: 'fileToBase64',
        meta: { title: 'fileToBase64', isAuth: false },
        path: '/fileToBase64',
        component: () => import('../views/encode/file.vue')
    },{
        name: 'complement',
        meta: { title: 'complement', isAuth: false },
        path: '/complement',
        component: () => import('../views/encode/complement.vue')
    },{
        name: 'punycode',
        meta: { title: 'punycode', isAuth: false },
        path: '/punycode',
        component: () => import('../views/encode/punycode.vue')
    }
]


const routes =  [
    {
        path: '/',
        name: 'home',
        meta: { title: 'home', isAuth: false },
        component: ()=>import('../views/home.vue'),
        children: homeChildren
    }
];

export default routes;