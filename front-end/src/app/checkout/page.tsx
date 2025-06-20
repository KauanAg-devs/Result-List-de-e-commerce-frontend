'use client'

import { useSelector } from "react-redux";
import { RootState } from "../store"

export default function Page(){
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
        <>
        {cartItems.map(item => {
            return (
                item.name
            )
        })}
        </>
    )
}