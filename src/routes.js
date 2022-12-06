import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Order';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Bill from './pages/Bill';
import Sale from './pages/Sale';
import Service from './pages/Service';
import Products from './pages/Products';
import AddProduct from './pages/addProduct';
import DetailOrder from './pages/detailOrder';
import UpdProduct from './pages/updateProduct';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'user', element: <User /> },
        { path: 'accessory', element: <Products /> },
        { path: 'service', element: <Service /> },
        { path: 'sale', element: <Sale /> },
        { path: 'order', element: <Blog /> },
        { path: 'bill', element: <Bill /> },
        //{ path: 'addProduct', element: <AddProduct /> },
        //{ path: 'orderDetail/', element: <DetailOrder /> },
        //{ path: 'updateProduct/', element: <UpdProduct /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/user" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
