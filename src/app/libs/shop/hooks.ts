
import { ChangeEvent, useEffect, useState } from "react"
import productList from '../../product.json'
import couponList from '../../coupon.json'

import Select, { SelectChangeEvent } from '@mui/material/Select';

export const useManageShop = () => {

    const [product, setProduct] = useState<any>([])
    const [cart, setCart] = useState<any>([])
    const [totalPrice, setTotalPrice] = useState(0);
    const [coupon, setCoupon] = useState<any>([])
    const [discount, setDiscount] = useState<string>('')
    const [rebate, setRebate] = useState(0);

    const getProduct = async () => {
        const res = await productList
        setProduct(res)

    }
    const getCoupon = async () => {
        const res = await couponList
        setCoupon(res.data)

    }


    const handleChange = (event: SelectChangeEvent | any) => {
        setDiscount(event.target.value)
        // console.log(data)
        // if (data.type === 'amount') {
        //     setTotalPrice(totalPrice - data.discount)
        // }
        // setCoupon();
    };
    const handleAddCart = (row: any) => {
        const updateTodo = [...cart, row]
        console.log(updateTodo)
        setCart(updateTodo)
        setDiscount('')

        // setCart((prevArr: any) => [
        //     ...prevArr, row]);
    }
    const caltotal = () => {
        const newTotalPrice = cart.reduce((acc: any, item: any) => acc + item.price, 0);
        setTotalPrice(newTotalPrice)


    }
    const calCoupon = () => {
        const item = coupon.find((items: any) => items.type === discount)
        const newTotalPrice = cart.reduce((acc: any, item: any) => acc + item.price, 0);
        if (item?.type === 'amount') {
            setTotalPrice(newTotalPrice - item.discount)
            // บอกจำนวนว่าลดเท่าไหร่
            setRebate(item.discount)
        } else if (item?.type === 'percentage') {
            setTotalPrice((newTotalPrice - (newTotalPrice * item.discount) / 100))
            setRebate((newTotalPrice * item.discount) / 100)


        } else if (item?.type === 'clothing') {
            const findClothing = cart.filter((items: any) => items.category === discount)
            const totalClothing = findClothing.reduce((acc: any, item: any) => acc + item.price, 0);
            const per = (newTotalPrice - ((totalClothing * item.discount) / 100))
            setTotalPrice(per)
            setRebate((totalClothing * item.discount) / 100)


        }
        else if (item?.type === 'points') {
            const max = (newTotalPrice * 20) / 100
            if (product.point >= max) {
                setTotalPrice(newTotalPrice - max)
                setRebate(max)


            } else {
                setTotalPrice(newTotalPrice - product.point)
                setRebate(product.point)



            }



        }
        else if (item?.type === 'every') {
            const discountAmount = Math.floor(newTotalPrice / 300) * item.discount;
            console.log('discountAmount', discountAmount)
            setTotalPrice((newTotalPrice - discountAmount))
            setRebate(discountAmount)
        }
        else {
            setTotalPrice(newTotalPrice)
            setRebate(0)

        }


    }

    const handleDelete = (index: number) => {
        const updateTodo = [...cart];
        updateTodo.splice(index, 1);
        setCart(updateTodo)
        setDiscount('')

    }
    const getText = (disc: string, type: string) => {
        switch (type) {
            case 'amount':
                return ` ( ส่วนลด${disc} บาท)`

            case 'percentage':
                return ` ( ส่วนลด${disc} %)`

            case 'clothing':
                return ` ( ส่วนลด${disc} % เฉพาะเสื้อผ้า)`
            case 'points':
                return ''
            case 'every':
                return ` ( ส่วนลด${disc} บาท ทุกๆ300)`

        }


    }

    useEffect(() => {
        calCoupon()
    }, [discount])
    useEffect(() => {
        caltotal()

    }, [cart])
    useEffect(() => {
        getCoupon()
        getProduct()
    }, [])
    return {
        getText,
        rebate,
        handleDelete,
        discount,
        handleChange,
        coupon,
        cart,
        totalPrice,
        handleAddCart,
        product

    }
}