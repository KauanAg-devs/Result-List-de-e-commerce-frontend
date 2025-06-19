export type ProductProps = {
    name: string 
    color: string[]
    price: number
    sku: string
    showProductDetails: string
    setShowProductDetails: React.Dispatch<React.SetStateAction<string>>
    showColorsOnCard?: boolean;
}