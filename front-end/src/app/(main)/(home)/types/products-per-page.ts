import { Dispatch, SetStateAction } from "react"

export type ProductsPerPageProps = {
    showFilterInput: boolean 
    filteredProductsLength: number 
    setProductsPerPage: Dispatch<SetStateAction<number>> 
    productsPerPage: number
}