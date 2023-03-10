import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { ThreeDots } from 'react-loader-spinner';
import Header from '../components/Header';

export const DetailedPage = () => {
  const [detailedCountry, setDetailedCountry] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const navigate = useNavigate();

  const { name } = location.state.country;

  const SINGLE_COUNTRY_API_URL = `https://restcountries.com/v2/name/${name.official}`;

  useEffect(() => {
    const fetchSingleCountry = async () => {
      try {
        const response = await fetch(SINGLE_COUNTRY_API_URL);
        if (response.ok) {
          const data = await response.json();
          setDetailedCountry(data);
        } else {
          navigate('*');
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        navigate('*');
      }
    };
    fetchSingleCountry();
  }, [location.key]);

  useEffect(() => {
    // return from localStorage, array of all countries bordering the selected country

    const bordercountries = JSON.parse(
      localStorage.getItem('countries')
    ).filter((country) => {
      return detailedCountry.some((detailedCountry) => {
        return (
          detailedCountry.borders &&
          detailedCountry.borders.includes(country.cca3)
        );
      });
    });
    setBorderCountries(bordercountries);
  }, [detailedCountry]);

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.key]);

  return (
    <>
      <Header />

      {/* return to home page button */}
      <div className="px-10 pt-10">
        <button
          onClick={() => navigate('/')}
          className="flex bg-white dark:bg-slate-900 px-4 py-1 shadow shadow-slate-300
         dark:shadow-[#111] hover:scale-95 rounded transition-all"
        >
          <span className="self-center pr-2">
            <BiArrowBack className="dark:text-slate-400" />
          </span>
          <span className="dark:text-slate-400">Back</span>
        </button>
      </div>

      <section>
        {isLoading && (
          <div className="w-fit py-6 mx-auto">
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color="#abadb0"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        )}

        {detailedCountry.map((country) => (
          <div
            key={country.name + country.population}
            className="px-10 py-20 lg:flex"
          >
            <div className="img w-full lg:w-[35%]">
              <img
                className="w-full"
                src={country.flags.svg || country.flags.png}
                alt="country flag"
              />
            </div>

            <div className="lg:pl-20 self-center">
              <div className="details lg:flex lg:justify-center lg:content-center">
                <div className="details-1 lg:self-center lg:pr-24 lg:pb-11">
                  <h1 className="text-2xl dark:text-slate-300 font-semibold pt-12 pb-6">
                    {country.name}
                  </h1>
                  <p className="flex text-sm py-[4px]">
                    <span className="font-bold dark:text-slate-200">
                      Native Name:
                    </span>
                    <span className="pl-1 dark:text-slate-400">
                      {country.nativeName}
                    </span>
                  </p>
                  <p className="flex text-sm py-[4px]">
                    <span className="font-bold dark:text-slate-200">
                      Population:
                    </span>
                    <span className="pl-1 dark:text-slate-400">
                      {country.population.toLocaleString("en-US")}
                    </span>
                  </p>
                  <p className="flex text-sm py-[4px]">
                    <span className="font-bold dark:text-slate-200">
                      Region:
                    </span>
                    <span className="pl-1 dark:text-slate-400">
                      {country.region}
                    </span>
                  </p>
                  <p className="flex text-sm py-[4px]">
                    <span className="font-bold dark:text-slate-200">
                      Sub Region:
                    </span>
                    <span className="pl-1 dark:text-slate-400">
                      {country.subregion}
                    </span>
                  </p>
                  <p className="flex text-sm py-[4px]">
                    <span className="font-bold dark:text-slate-200">
                      Capital:
                    </span>
                    <span className="pl-1 dark:text-slate-400">
                      {country.capital}
                    </span>
                  </p>
                </div>

                <div className="details-2 py-8 lg:self-center">
                  <p className="flex text-sm py-[4px]">
                    <span className="font-bold dark:text-slate-200">
                      Top Level Domain:
                    </span>
                    <span className="pl-1 dark:text-slate-400">
                      {country.topLevelDomain.map((tld) => tld)}
                    </span>
                  </p>
                  <p className="flex text-sm py-[4px]">
                    <span className="font-bold dark:text-slate-200">
                      Currencies:
                    </span>
                    <span className="pl-1 dark:text-slate-400">
                      {country.currencies.map((currency) => currency.name)}
                    </span>
                  </p>
                  <p className="flex text-sm py-[4px]">
                    <span className="font-bold dark:text-slate-200">
                      Capital:
                    </span>
                    <span className="pl-1 dark:text-slate-400">
                      {country.capital}
                    </span>
                  </p>
                </div>
              </div>

              <div className="py-2">
                <h2 className="text-lg font-medium dark:text-slate-200">
                  Border Countries:
                </h2>
                <div className="py-4 ">
                  {borderCountries.length >= 1 &&
                    borderCountries.map((country) => (
                      <button
                        key={country.name.common + country.population}
                        onClick={() => {
                          navigate('/detailedPage', {
                            state: { country: country },
                          });
                          setIsLoading(true);
                        }}
                        className="py-1 px-4 mr-2 mb-2 dark:text-slate-300 bg-slate-50 border dark:bg-slate-800
                     border-slate-300 dark:border-slate-700 rounded hover:scale-95 transition-all"
                      >
                        {country.name.common}
                      </button>
                    ))}
                  {borderCountries.length < 1 && (
                    <p className="dark:text-slate-300">No border countries</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
