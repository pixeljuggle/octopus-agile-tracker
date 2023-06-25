import { Footer, Header, Nav } from 'components';
import { Consumption } from 'features/consumption';
import { Rates } from 'features/rates';
import { Settings } from 'features/settings';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

export const Routes = () => {
  const appRoutes = [
    {
      element: <Layout />,
      children: [
        {
          path: '/rates',
          element: <Rates />,
        },
        {
          path: '/consumption',
          element: <Consumption />,
        },
        {
          path: '/charger',
          element: <div className="my-6 rounded border border-amber-500 px-3 py-2 font-semibold text-amber-500">Coming Soon</div>,
        },
        {
          path: '/settings',
          element: <Settings />,
        },
        { path: '*', element: <Navigate to="/rates" replace /> },
      ],
    },
  ];

  const element = useRoutes(appRoutes);

  return element;
};

export const Layout = () => {
  return (
    <>
      <main className="relative w-full">
        <div className="flex justify-between">
          <Header />
          <Nav />
        </div>
        <section className="h-full">
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  );
};
