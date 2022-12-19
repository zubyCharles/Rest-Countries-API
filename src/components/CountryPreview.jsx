import { useNavigate } from 'react-router-dom';

const CountryPreview = ({ country }) => {
  const { name, capital, region, population, flags } = country;

  let navigate = useNavigate();

  const goToDetailedPage = () => {
    /*navigate to the detailed page of each country(path='/detailedPage'), while passing along
     the country's object to trigger a new API request on the specific country in a new page. 
     */

    navigate('/detailedPage', { state: { country: country } });
  };

  return (
    <div
      onClick={goToDetailedPage}
      className="w-full bg-slate-50 dark:bg-slate-900 my-10 shadow shadow-slate-300
       dark:shadow-[#111] rounded cursor-pointer hover:scale-105 transition-all"
    >
      <div className="w-full">
        <img className="w-full" src={flags.svg} alt="country flag" />
      </div>
      <div className="pl-6 pb-10">
        <h2 className="text-lg dark:text-slate-100 font-bold py-4">
          {name.common}
        </h2>
        <p className="flex text-sm py-[1px]">
          <span className="font-bold dark:text-slate-100">Population:</span>
          <span className="pl-1 dark:text-slate-400">{population}</span>
        </p>
        <p className="flex text-sm py-[1px]">
          <span className="font-bold dark:text-slate-100">Region:</span>
          <span className="pl-1 dark:text-slate-400">{region}</span>
        </p>
        <p className="flex text-sm py-[1px]">
          <span className="font-bold dark:text-slate-100">Capital:</span>
          <span className="pl-1 dark:text-slate-400">{capital}</span>
        </p>
      </div>
    </div>
  );
};

export default CountryPreview;
