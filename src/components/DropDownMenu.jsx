import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

const DropDownMenu = ({ setFilteredRegion }) => {
  const [showDropDown, setDropDown] = useState(false);

  const selectRegionToFilter = (region) => {
    setFilteredRegion(region);
    setDropDown(false);
  };

  return (
    <div
      id="dropdown-btn"
      className="relative pt-5 lg:absolute lg:right-[6rem] lg:top-[5rem]"
    >
      <div
        onClick={() => setDropDown((bool) => !bool)}
        className="w-fit bg-slate-50 dark:bg-slate-900 flex flex-row py-3 px-2 translate-x-[15%] shadow shadow-slate-300
         dark:shadow-[#111] rounded hover:cursor-pointer transition-all"
      >
        <span className="text-sm dark:text-slate-400 pr-8">
          filter by Region
        </span>
        <span className="self-center">
          <BiChevronDown className="dark:text-slate-400" />
        </span>
      </div>
      <div
        className={`${
          showDropDown ? 'flex' : 'hidden'
        } absolute w-fit bg-slate-50 flex-row dark:bg-slate-900 py-3 mt-1 translate-x-[15%] shadow 
        shadow-slate-300 dark:shadow-none rounded transition-all`}
      >
        <ul>
          {['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map(
            (region) => (
              <li
                key={region}
                onClick={() => selectRegionToFilter(region)}
                className="text-sm dark:text-slate-400 pl-[1rem] py-1 pr-[5.7rem] hover:cursor-pointer transition-all"
              >
                {region}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default DropDownMenu;
