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

    const handleSortByName = (order) => {
        setSortByName(order); 
    }

    const handleSortByPrice = (order) => {
        setSortByPrice(order); 
    }

    const handleSearch = (search) => {
        setSearch(search);
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

    const handleDelete = (id) =>{
        let arr = [...datas]; 
        arr = arr.filter(elem => elem.id !=id); 
        setDatas(arr); 
        axios.delete("https://northwind.vercel.app/api/products/" + id);
    }

    const handleDiscount = ()=> {
        setDiscount(!discont); 
    }

    useEffect(() => {
        axios("https://northwind.vercel.app/api/products/").then(res=> {
            console.log(res.data);
            setDatas(res.data); 
        })
        .catch(err => {
            console.error(err);
        });
    }, [])

    return (
        <> 
            <ChakraProvider>
                <div>
                    <Search search={search} onSearch={handleSearch} onDiscount={handleDiscount} discont={discont} onhandleSortByPrice={handleSortByPrice} onhandleSortByName={handleSortByName}/>
                    <TableList datas={filteredDatas} onDelete={handleDelete} />
                </div>
            </ChakraProvider>
        </>
    )
}

export default AdminPanel