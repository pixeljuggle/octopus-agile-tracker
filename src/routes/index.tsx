import { Footer, Header, Nav } from 'components';
import { WaveLoader } from 'components/Spinner/WaveLoader';
import { Charger } from 'features/charger';
import { Consumption } from 'features/consumption';
import { Rates } from 'features/rates';
import { useRates } from 'features/rates/providers/RatesProvider';
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
          element: <Charger />,
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
  const { loading } = useRates();
  return (
    <>
      <main className="relative w-full">
        <div className="flex justify-between">
          <Header />
          <Nav />
        </div>
        <section className="h-full">
          <>
            {loading ? (
              <div className="flex h-full w-full items-center justify-center align-middle" id="loading">
                <WaveLoader className="h-20 w-20 fill-heliotrope-500" />
              </div>
            ) : (
              <Outlet />
            )}
          </>
        </section>
      </main>
      <Footer />
    </>
  );
};
