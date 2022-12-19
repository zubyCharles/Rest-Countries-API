import { BiMoon, BiSun } from 'react-icons/bi';
import { useTheme } from '../context/Theme';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-900 px-4 pt-4 pb-6 transition-all">
      <div className="w-[100%] lg:w-[90%] lg:mx-auto flex flex-row justify-between">
        <p className="dark:text-slate-200 text-sm lg:text-base font-bold">
          Where in the world?
        </p>
        <p
          onClick={toggleTheme}
          className="w-fit text-sm flex flex-row content-center p-1 rounded-2xl cursor-pointer 
          bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <span className="grid place-content-center">
            {theme === 'light' && <BiMoon className="text-lg" />}
            {theme === 'dark' && <BiSun className="text-lg text-slate-50" />}
          </span>
          <span className="pl-1 dark:text-slate-200">
            {theme === 'light' && 'Dark Mode'}
            {theme === 'dark' && 'Light Mode'}
          </span>
        </p>
      </div>
    </header>
  );
};

export default Header;
