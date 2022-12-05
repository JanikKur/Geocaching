import {React, useState} from 'react';
import {BsSearch} from 'react-icons/bs';
import axios from 'axios';
import '../css/searchbar.css';


/**
 * Returns a Search Bar which sets the current Position to the Searched Position
 * @param {Function} setPosition  
 * @returns HTML element 
 */
export default function Search({setPosition}) {
    const [searchValue, setSearchValue] = useState("");

    let handleInput = event => {
        setSearchValue(event.target.value);
    }

    let handeSearch = event => {
        axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchValue}`).then(response => {
            response.data.length && setPosition([response.data[0].lat, response.data[0].lon]);
        })
    }

    return (
            <div className="searchBar">
                <input type="text" className="searchBar-input" onKeyUp={event => {event.key === 'Enter' && handeSearch()}} onChange={handleInput} value={searchValue} placeholder="Search"/><button className="searchBar-searchButton" onClick={handeSearch}><BsSearch className=""/></button>
            </div>
    )
}
