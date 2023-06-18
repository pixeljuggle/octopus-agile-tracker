import { OctopusMascot } from 'components/Logo/OctopusMascot';
import { useRates } from 'features/rates';

export const Footer = () => {
  const { getRates } = useRates();
  return (
    <footer className="mt-10 flex w-full justify-between">
      <section id="footer-left">
        <button className=" rounded py-2 text-xs text-heliotrope " onClick={() => getRates()}>
          Refresh Data
        </button>
      </section>
      <section id="footer-right">
        <OctopusMascot size={2} />
      </section>
    </footer>
  );
};
