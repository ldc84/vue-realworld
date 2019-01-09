import Vue from 'vue'
import Router from 'vue-router'

// import Main from '~@/main/'

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import('~@/main/'),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("~@/main/Global")
        },
        {
          path: "my-feed",
          name: "my-feed",
          component: () => import("~@/main/MyFeed")
        },
        {
          path: "tag/:tag",
          name: "tag",
          component: () => import("~@/main/Tag")
        }
      ]
    },{
      path : "/login",
      name : "login",
      component: () => import('~@/login/')
    },{
      path : "/register",
      name : "register",
      component: () => import('~@/register/')
    },{
      path : "/settings",
      name : "settings",
      component: () => import('~@/settings/')
    },{
      path: "/@:name",
      component: () => import("~@/profile/"),
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("~@/profile/Articles")
        },
        {
          name: "favorites",
          path: "favorites",
          component: () => import("~@/profile/Favorited")
        }
      ]
    },{
      name: "article",
      path: "/articles/:slug",
      component: () => import("~@/article/"),
      props: true
    },
    {
      name: "article-edit",
      path: "/editor/:slug?",
      props: true,
      component: () => import("~@/article/Edit")
    }
  ]
})
