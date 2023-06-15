export const Header = ({ className = '' }) => {
  return (
    <div className={className}>
      <h2 className="flex text-xl opacity-50">
        <p className="font-semibold">octopus</p>
        <p className="font-thin">energy</p>
      </h2>
      <h1 className="mb-4 flex text-4xl">
        <p className="font-semibold">agile</p>
        <p className="font-thin">tracker</p>
      </h1>
    </div>
  );
};
