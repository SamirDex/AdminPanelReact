// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Input, Select } from '@chakra-ui/react'
import '../css/Search.css'
import Buttons from './Buttons'

function Search(props) {

    // eslint-disable-next-line react/prop-types
    const {Search, onSearch, onDiscount, discont,onhandleSortByPrice,onhandleSortByName} = props; 

    const inputHandleSearch = (event) => {
        // console.log(event.target.value);
        onSearch(event.target.value)
    }

    const handleSortOrderChange = (event) => {
        // console.log(event.target.value);
        onhandleSortByName(event.target.value)
    }

    const handleSortPriceChange = (event) => {
        console.log(event.target.value);
        onhandleSortByPrice(event.target.value)
    }


    return ( 
        <div className='Searchbar'>
            <Input placeholder='Search...' className='Search' value={Search} onChange={inputHandleSearch}/>
            <div color="yellow" className='selectDiv'>
                <Select placeholder='Name' onChange={handleSortOrderChange}>
                    <option value='AtoZ'>A to Z</option>
                    <option value='ZtoA'>Z to A</option>
                </Select>
            </div>
            <div color="yellow" className='selectDiv'>
                <Select placeholder='Price' className='select' onChange={handleSortPriceChange}>
                    <option value='MintoMax'>Min. to Max.</option>
                    <option value='MaxtoMin'>Max. to Min</option>
                </Select>
            </div>
            <Buttons color="red" onDiscount={onDiscount} discont={discont} >{discont ?"Show All"  : " Discontinued" }</Buttons>
        </div>
    )
}

export default Search