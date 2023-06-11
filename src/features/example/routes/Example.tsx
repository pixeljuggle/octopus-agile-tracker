import useDarkMode from 'hooks/useDarkMode';

export const Example = () => {
  const { toggleDarkMode } = useDarkMode();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-8 transition-colors">
      <h1 className=" mb-3 w-fit text-3xl font-light">Example</h1>
      <button
        className=" rounded bg-green-200 px-3 py-2 hover:bg-green-300 dark:bg-orange-300 dark:text-orange-900 dark:hover:bg-orange-200"
        onClick={() => toggleDarkMode()}
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};
