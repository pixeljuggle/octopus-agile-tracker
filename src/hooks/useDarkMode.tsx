const useDarkMode = () => {
  const darkMode = () => {
    document.body.classList.add('dark');
  };

  const lightMode = () => {
    document.body.classList.remove('dark');
  };

  const toggleDarkMode = () => {
    if (document.body.classList.contains('dark')) {
      lightMode();
    } else {
      darkMode();
    }
  };

  return { darkMode, lightMode, toggleDarkMode };
};

export default useDarkMode;
