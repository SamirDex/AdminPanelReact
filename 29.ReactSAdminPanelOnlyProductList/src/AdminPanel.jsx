// eslint-disable-next-line no-unused-vars
import React from 'react'
import Search from './components/Search'
import TableList from './components/TableList'
import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'; 
import { useEffect, useState } from "react";


function AdminPanel() {
    const [datas, setDatas] = useState([]); 
    const [search, setSearch] = useState(""); 
    const [discont, setDiscount] = useState(false)
    const [sortByName, setSortByName] = useState(''); 
    const [sortByPrice, setSortByPrice] = useState(''); 
    const [editingData, setEditingData] = useState(null); 

    useEffect(() => {
        axios("https://northwind.vercel.app/api/products/").then(res=> {
            console.log(res.data);
            setDatas(res.data); 
        })
        .catch(err => {
            console.error(err);
        });
    }, [])
    
    const handleSearch = (search) => {
        setSearch(search);
    };

    const handleDiscount = ()=> {
        setDiscount(!discont); 
    }

    const handleSortByName = (order) => {
        setSortByName(order); 
    }

    const handleSortByPrice = (order) => {
        setSortByPrice(order); 
    }

    const handleEdit = (data) => {
        setEditingData(data);
    };

    const handleSaveEdit = (updatedData) => {
        axios.put(`https://northwind.vercel.app/api/products/${updatedData.id}`, updatedData)
            .then(response => {
                const updatedDatas = datas.map(data => data.id === updatedData.id ? updatedData : data);
                setDatas(updatedDatas);
                setEditingData(null);
            })
            .catch(error => {
                console.error("Error saving edited data:", error);
            });
    };

    const filteredDatas = datas.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesDiscontinued = !discont || item.discontinued;
        return matchesSearch && matchesDiscontinued;
    }).sort((a,b) => {
        if(sortByName == "AtoZ") return a.name.localeCompare(b.name) 
        if(sortByName == "ZtoA") return b.name.localeCompare(a.name); 
    })
    .sort((a,b) => {
        if(sortByPrice == "MintoMax") return a.unitPrice - b.unitPrice
        if(sortByPrice == "MaxtoMin") return b.unitPrice - a.unitPrice 
        
    });
    const handleAddNewProduct = (newProduct) => {
        axios.post("https://northwind.vercel.app/api/products", newProduct)
            .then(response => {
                setDatas([...datas, response.data]);
            })
            .catch(error => {
                console.error("Error adding new product:", error);
            });
    }

    const handleDelete = (id) =>{
        let arr = [...datas]; 
        arr = arr.filter(elem => elem.id !=id); 
        setDatas(arr); 
        axios.delete("https://northwind.vercel.app/api/products/" + id);
    }

    return (
        <> 
            <ChakraProvider>
                <div>
                    <Search 
                        search={search} 
                        onSearch={handleSearch}
                        onDiscount={handleDiscount} 
                        discont={discont} 
                        onhandleSortByPrice={handleSortByPrice} 
                        onhandleSortByName={handleSortByName} 
                        editingData={editingData} 
                        onSaveEdit={handleSaveEdit}
                        onAddNewProduct={handleAddNewProduct} />

                    <TableList 
                        datas={filteredDatas} 
                        onDelete={handleDelete} 
                        onEdit={handleEdit}/>
                </div>
            </ChakraProvider>
        </>
    )
}

export default AdminPanel