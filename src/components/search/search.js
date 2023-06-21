import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoAPIOptions } from "../../api";
import "./search.css"


const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`, geoAPIOptions)
            .then(response => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    // sets the searchData on change
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    // const customStyles = {
    //     control: (provided, state) => ({
    //         ...provided,
    //         borderRadius: '5px',
    //         border: '2px solid #ccc',
    //         boxShadow: state.isFocused ? '0 0 0 2px #3699FF' : null,
    //         width: '80%',
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center'
    //     }),
    //     option: (provided, state) => ({
    //         ...provided,
    //         backgroundColor: state.isFocused ? '#3699FF' : null,
    //         color: state.isFocused ? 'white' : null,
    //         width: '80%'
    //     }),
    // }

    return (
        <div className="search-style">
            <AsyncPaginate
                placeholder="Search for city"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />
        </div>

    )
}

export default Search;