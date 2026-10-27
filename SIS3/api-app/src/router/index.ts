import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import('../views/HomeView.vue')
const ProductDetailView = () => import('../views/ProductDetailView.vue')
const AdminView = () => import('../views/AdminView.vue')
const CartView = () => import('../views/CartView.vue')
const LoginView = () => import('../views/LoginView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetailView,
    props: true,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
