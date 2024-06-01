'use client'


import React from 'react'

import { useManageShop } from './hooks'
import { TableContainer, Table, TableHead, TableRow, TableBody, Button, Box, InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export const Shop = () => {
    const { product, handleAddCart, cart, totalPrice, handleChange,
        coupon, discount, handleDelete, rebate, getText
    } = useManageShop()

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', p: 8, justifyContent: 'center' }}>

                <TableContainer >
                    <Box sx={{ mb: 2 }}>
                        แต้มส่วนลด {product.point} แต้ม (สามารถแก้ point ได้ที่ ไฟล์ product.json)
                    </Box>

                    <Table sx={{ minWidth: 500, width: '50px' }} aria-label="customized table">

                        <TableHead>

                            <TableRow>
                                <StyledTableCell >id</StyledTableCell>
                                <StyledTableCell align="right">name</StyledTableCell>
                                <StyledTableCell align="right">catagory</StyledTableCell>
                                <StyledTableCell align="right">price</StyledTableCell>
                                <StyledTableCell align="right">เพิ่มสินค้า</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product.data?.map((row: any) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                                    <StyledTableCell align="right">{row.category}</StyledTableCell>
                                    <StyledTableCell align="right">{row.price}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button variant='outlined' onClick={() => handleAddCart(row)}>เพิ่ม</Button>

                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer >
                    <Box sx={{ mb: 2 }}>
                        ตระกร้าสินค้า
                    </Box>
                    <Table sx={{ minWidth: 700, width: '50px' }} aria-label="spanning table">
                        <TableHead>
                            <TableRow>


                            </TableRow>
                            <TableRow>
                                <StyledTableCell >name</StyledTableCell>
                                <StyledTableCell align="right">price</StyledTableCell>
                                <StyledTableCell align="right">ลบ</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((row: any, index: number) => (

                                < TableRow key={index} >

                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">
                                        <Button variant='outlined' color='error' onClick={() => handleDelete(index)}>ลบสินค้า</Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>


                            </TableRow>
                            <TableRow>
                                <TableCell >เลือกประเภทส่วนลด</TableCell>
                                <TableCell>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-filled-label">ส่วนลด</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={discount}
                                            onChange={handleChange}
                                            renderValue={(selected: any) => selected}

                                        >
                                            <MenuItem value='none'>
                                                ไม่ใช้
                                            </MenuItem>
                                            {coupon.map((item: any, index: number) => (
                                                <MenuItem key={index} value={item.type}>
                                                    {/* {item.name + ` ( ส่วนลด${item.discount}${item.type === 'amount' || item.type === 'every' ? 'บาท' : '%'})`} */}
                                                    {item.name} {getText(item.discount, item.type)}

                                                </MenuItem>

                                            ))}

                                        </Select>
                                    </FormControl>

                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell >ลด</TableCell>
                                <TableCell >{rebate} บาท</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell >ราคาทั้งหมด</TableCell>
                                <TableCell >{totalPrice}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>


            </Box>
        </React.Fragment >
    )
}