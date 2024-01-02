import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardViews from '@/views/dashboard/DashboardViews.vue';
import ReportsViews from '@/views/reports/ReportsList.vue';
import ReportViews from '@/views/reports/report/Report.vue';
import Graph from '@/views/graphs/Graph.vue';

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
    path: '/reports/asnumber',
    name: 'As Number',
    component: ReportViews,
  },
  {
    path: '/reports/historical-record',
    name: 'Historical Records',
    component: ReportViews,
  },
  {
    path: '/reports/graphs',
    name: 'Loss Rates',
    component: Graph,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
