import Vue from "vue"
import VueRouter from "vue-router"


//四个主界面
import main from "../views/main.vue"
import mine from "../views/mine.vue"
import cloud from "../views/cloud.vue"
import vedio from "../views/vedio.vue"
import collectionDetail from "../views/collectionDetail.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: main,
    children: [
      {
        path: 'mine',
        name: 'Mine',
        component: mine,
      },
      {
        path: 'find',
        name: 'Find',
        component: () => import(/*webpackChunkName:"find"*/"../views/find.vue")
      },
      {
        path: 'cloud',
        name: 'Cloud',
        component: cloud
      },
      {
        path: 'vedio',
        name: 'Vedio',
        component: vedio
      },

    ]
  },
  {
    path: '/songs',
    name: 'Songs',
    component: collectionDetail
  },
]

const router = new VueRouter({
  routes,
  mode: "history",
})

export default router;