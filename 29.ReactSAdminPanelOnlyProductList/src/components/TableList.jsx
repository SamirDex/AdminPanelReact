/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./../css/TableList.css"
import { Button } from '@chakra-ui/react'
import {Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,} from '@chakra-ui/react'

function TableList(props) {
    const {datas, onDelete, onEdit} = props; 
    return (
        <div className='container'>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>id</Th>
                            <Th>name</Th>
                            <Th isNumeric>price</Th>
                            <Th>discontinued</Th>
                            <Th>unitsInStock</Th>
                            <Th>edit</Th>
                            <Th>delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {datas.map(elem=> {
                            return (
                                <Tr key={elem.id} style={{backgroundColor: elem.unitsInStock < 20 ? "#F08080" : "transparent"}}>
                                    <Td style={{fontWeight: "bold"}}>{elem.id}</Td>
                                    <Td>{elem.name}</Td>
                                    <Td isNumeric>${elem.unitPrice}</Td>
                                    <Td>{elem.discontinued? "YES" : "NO"}</Td>
                                    <Td>{elem.unitsInStock}</Td>
                                    <Td><Button colorScheme='blue' onClick={() => onEdit(elem)}>Edit</Button></Td>
                                    <Td><Button colorScheme='red' data-id={elem.id} onClick={() => onDelete(elem.id)}>Delete</Button></Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
        
    )
}

export default TableList