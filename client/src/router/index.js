import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardViews from '@/views/dashboard/DashboardViews.vue';
import ReportsViews from '@/views/reports/ReportsViews.vue';
import ReportViews from '@/views/reports/report/ReportViews.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardViews,
  },
  {
    path: '/reports',
    name: 'reports',
    component: ReportsViews,
  },
  {
    path: '/report/:id',
    name: 'reportItem',
    component: ReportViews,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
