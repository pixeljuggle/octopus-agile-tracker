import useCookie from 'hooks/useCookie';
import { useEffect } from 'react';

const useDarkMode = () => {
  const [cookie, setCookie] = useCookie('learndTheme', 'light');
  const darkMode = () => {
    document.body.classList.add('dark');
    setCookie('dark', 1337);
  };

  const lightMode = () => {
    document.body.classList.remove('dark');
    setCookie('light', 1337);
  };

  const toggleDarkMode = () => {
    if (document.body.classList.contains('dark')) {
      lightMode();
    } else {
      darkMode();
    }
  };
  useEffect(() => {
    if (cookie === 'dark') {
      darkMode();
    }
  }, []);

  return { darkMode, lightMode, toggleDarkMode };
};

export default useDarkMode;
