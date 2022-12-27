import React, { useState, useEffect } from 'react';
import areas from '../data/areas.json';
import cities from '../data/cities.json';


const SearchBar = () => {
    const [areasList,setAreasList] = useState([]);
    const [citiesList,setCitiesList] = useState([]);
    const [selecableCities,setSelectableCities] = useState([]);


    useEffect(() => {
        setAreasList(areas);
        setCitiesList(cities);
    },[])


    const handleSelectedArea = (e) => {
        // console.log("arear",e.target.value);
        const { value } = e.target;
        const findCities = citiesList.length > 0 && citiesList.filter((city) => {
            return city.area === value
        });
        setSelectableCities(findCities);
    }

    console.log("selecableCities", selecableCities);

    return (
        <>
            <div>
                <div>
                    <label htmlFor='area'>Area: </label>
                    <select name='area' onChange={handleSelectedArea}>
                        <option></option>
                        {areasList.length > 0  && areasList.map((item) => {
                            return (
                                <option 
                                    id='' 
                                    key={item.id}
                                    value={item.id} 
                                >
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>

                    <label htmlFor='city'>City: </label>
                    <select>
                        {selecableCities.length > 0 ? selecableCities.map((city) => {
                           return (
                            <option
                                key={city.id}
                                value={city.id}
                            >
                                {city.cityName}
                            </option>
                           )
                        }) : (
                            <option></option>
                        )}
                    </select>
                </div>
                <button>Search</button>
            </div>
        </>
    )
};

export default SearchBar;