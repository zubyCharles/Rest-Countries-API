import { useNavigate } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import ErrorImg from '../images/error.png';

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="w-[40%] lg:w-[10%] pt-20 mx-auto">
        <img src={ErrorImg} />
      </div>
      <div className="py-4">
        <h1 className="text-2xl text-center py-4 dark:text-slate-400">
          Country Not Found
        </h1>
        <p className="text-center text-lg dark:text-slate-400">
          For some reason, the country could not be found
        </p>
      </div>
      <div className="pt-6 w-fit mx-auto">
        <button
          onClick={() => navigate('/')}
          className="py-2 px-4 mr-2 mb-2 flex dark:text-slate-300 bg-slate-50 border dark:bg-slate-800
                     border-slate-300 dark:border-slate-700 rounded hover:scale-95 transition-all"
        >
          <span className="self-center pr-2">
            <BiHomeAlt className="text-xl" />
          </span>
          <span className="self-center">Go Home</span>
        </button>
      </div>
    </section>
  );
};
