import { Header } from 'components';
import { Footer } from 'components/Footer/Footer';
import { Rates } from 'features/rates';
import { Outlet, useRoutes } from 'react-router-dom';

export const Routes = () => {
  const appRoutes = [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Rates />,
        },
        {
          path: '/settings',
          element: <>settings</>,
        },
        {
          path: '*',
          element: <Rates />,
        },
      ],
    },
  ];

  const element = useRoutes(appRoutes);

  return element;
};

export const Layout = () => {
  return (
    <>
      <main className="w-full">
        <Header />
        <section className="h-full">
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  );
};
