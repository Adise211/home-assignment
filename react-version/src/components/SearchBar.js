import React, { useState, useEffect } from 'react';
import areas from '../data/areas.json';
import cities from '../data/cities.json';
import branches from '../data/branches.json';
import DisplayBranch from './DisplayBranch';
import '../styles/SearchBar.css';


const SearchBar = () => {
    const [areasList,setAreasList] = useState([]);
    const [citiesList,setCitiesList] = useState([]);
    const [selecableCities,setSelectableCities] = useState([]);
    const [selectedBranch,setSelectedBranch] = useState(null);
    const [showBranch,setShowBranch] = useState('');
    const [city,setCity] = useState('');


    useEffect(() => {
        setAreasList(areas);
        setCitiesList(cities);
    },[])


    const handleSelectedArea = (e) => {
        const { value } = e.target;
        const findCities = citiesList.length > 0 && citiesList.filter((city) => {
            return city.area === value
        });
        setSelectableCities(findCities);
    };

    const handleSelectedCity = (e) => {
        const { value } = e.target;
        setSelectedBranch(value);
    };

    const handleSearchBranchInfo = () => {
        const display = branches.length > 0 && branches.filter((br) => {
            return br.cityId === selectedBranch
        });

        setShowBranch(display);
        const find = selectedBranch && citiesList.filter( (x) => { return x.id === selectedBranch});
        setCity(find)
    }


    return (
        <>
            <div className='s-container' style={{ padding: 100 , marginTop: 100, width: '70%'}}>
                <div className='s-inputs'>
                    <label htmlFor='area' style={{ fontWeight: 'bold' }}>Area: </label>
                    <select 
                        name='area' 
                        onChange={handleSelectedArea} 
                        style={{ padding: 10, width: 150, fontSize: 16, marginRight: 80 }}
                    >
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

                    <label htmlFor='city' style={{ fontWeight: 'bold' }}>City: </label>
                    <select 
                        name='city' 
                        onChange={handleSelectedCity} 
                        style={{ padding: 10, width: 150, fontSize: 16 }}
                    >
                        <option></option>
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
                <button 
                    onClick={handleSearchBranchInfo} 
                    style={{ fontStyle: 18, fontWeight: 'bold' }}
                    className='button'
                >
                    Search
                </button>
            </div>
            <DisplayBranch showBranch={showBranch} city={city}/>
        </>
    )
};

export default SearchBar;