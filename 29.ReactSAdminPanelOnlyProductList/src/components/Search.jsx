/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { Input, Select } from '@chakra-ui/react'
import '../css/Search.css'
import Buttons from './Buttons'

function Search(props) {

    const {Search, onSearch, onDiscount, discont,onhandleSortByPrice,onhandleSortByName,editingData, onSaveEdit, onAddNewProduct} = props; 


    const [editName, setEditName] = useState(''); 
    const [editPrice, setEditPrice] = useState('');
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newProductName, setNewProductName] = useState(''); 
    const [newProductPrice, setNewProductPrice] = useState(''); 

    useEffect(() => {
        if (editingData) {
            setEditName(editingData.name);
            setEditPrice(editingData.unitPrice);
        }
    }, [editingData]);

    const handleSave = () => {
        if (editingData) {
            onSaveEdit({ ...editingData, name: editName, unitPrice: editPrice });
        }
    };
    
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

    const handleAddNew = () => {
        setIsAddingNew(true);
    }

    const handleSaveNewProduct = () => {
        const newProduct = {
            name: newProductName,
            unitPrice: parseFloat(newProductPrice),
            discontinued: false,
            unitsInStock: 0
        };
        onAddNewProduct(newProduct);
        setNewProductName('');
        setNewProductPrice('');
        setIsAddingNew(false);
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

            {editingData && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Edit Product</h3>
                    <Input
                        type="text"
                        placeholder="Edit Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{ marginBottom: '10px', display: 'block' }}
                    />
                    <Input
                        type="number"
                        placeholder="Edit Price"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        style={{ marginBottom: '10px', display: 'block' }}
                    />
                    <button color="green" onClick={handleSave}>Save Changes</button>
                </div>
            )}
            <button onClick={handleAddNew} style={{ marginTop: '20px' }}>Add Product</button>

            {isAddingNew && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Add New Product</h3>
                    <Input
                        type="text"
                        placeholder="Product Name"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        style={{ marginBottom: '10px', display: 'block' }}
                    />
                    <Input
                        type="number"
                        placeholder="Product Price"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        style={{ marginBottom: '10px', display: 'block' }}
                    />
                    <button color="green" onClick={handleSaveNewProduct}>Save Product</button>
                </div>
            )}
        </div>
    )
}

export default Search