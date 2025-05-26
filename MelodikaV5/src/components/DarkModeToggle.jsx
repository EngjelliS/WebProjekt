import { useTheme } from '../context/ThemeContext';

const DarkModeToggle = () => { 
  const { toggleTheme } = useTheme();

  return (
    <button className="dark-mode-toggle" onClick={toggleTheme}>
      🌓
    </button>
  );
};

export default DarkModeToggle;