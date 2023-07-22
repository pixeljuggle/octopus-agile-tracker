import { OctopusMascot } from 'components/Logo/OctopusMascot';

export const Footer = () => {
  return (
    <footer className="mt-10 flex w-full justify-between">
      <section id="footer-right">
        <OctopusMascot size={2} />
      </section>
    </footer>
  );
};
