import { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { ThreeDots } from 'react-loader-spinner';
import Header from '../components/Header';
import DropDownMenu from '../components/DropDownMenu';
import CountryPreview from '../components/CountryPreview';
import ScrollToTopBtn from '../components/ScrollToTopBtn';

export const AllCountries = () => {
  const [allCountriesPreview, setAllCountriesPreview] = useState(
    JSON.parse(localStorage.getItem('countries')) || []
  );
  const [selectedRegion, setFilteredRegion] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [countryToSearch, setCountryToSearch] = useState('');

  const API_URL = `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3`;

  const filterByRegion = (selectedRegion) => {
    /** when a region is selected, the function filters the list of countries,
     returning only the countries in the selected region
     */

    if (selectedRegion && selectedRegion !== 'All') {
      return allCountriesPreview.filter(
        ({ region }) => region === selectedRegion
      );
    }
    if (selectedRegion && selectedRegion === 'All') {
      return allCountriesPreview;
    }
  };

  const handleChange = (e) => {
    setCountryToSearch(e.target.value);
  };

  const searchForCountry = (arrayOfCountries) => {
    /**
     * search for a particular from the array returned from filtering the default
     * list of countries by region
     */
    if (countryToSearch.length >= 2) {
      return arrayOfCountries.filter(({ name }) => {
        const stringToCompare = name.common.substring(
          0,
          countryToSearch.length
        );
        return stringToCompare.toLowerCase() === countryToSearch.toLowerCase();
      });
    }
    return arrayOfCountries;
  };

  useEffect(() => {
    const fetchAllCountriesPreview = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (!allCountriesPreview?.length) {
          setAllCountriesPreview(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log('Yooo!!!, ' + error);
      }
    };
    fetchAllCountriesPreview();
  }, []);

  useEffect(() => {
    localStorage.setItem('countries', JSON.stringify(allCountriesPreview));
  }, [allCountriesPreview]);

  return (
    <main>
      <Header />

      <ScrollToTopBtn />

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="w-[90%] lg:w-[30%] flex flex-row content-center py-6 lg:py-8 mx-auto lg:ml-16">
          <span className="w-0 self-center translate-x-8">
            <BiSearchAlt2 className="text-slate-500 text-xl" />
          </span>
          <span className="w-full">
            <input
              className="w-full py-3 pl-20 shadow-md dark:text-slate-400 dark:bg-slate-900 shadow-slate-300
               dark:shadow-[#111] rounded outline-none transition-all"
              type="text"
              value={countryToSearch}
              onChange={handleChange}
              placeholder="Search for a country..."
            />
          </span>
        </div>
      </form>

      <DropDownMenu setFilteredRegion={setFilteredRegion} />

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

        {allCountriesPreview && (
          <div className="preview-container w-[75%] lg:w-[90%] mx-auto">
            {/**
             * The filterByRegion and searchForCountry functions are chained here.
             * The array returned from calling the former is passed into the latter,
             * and the final returned array is mapped and displayed.
             */}
            {searchForCountry(filterByRegion(selectedRegion)).map((country) => (
              <CountryPreview
                key={country.name.common + country.population}
                country={country}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
