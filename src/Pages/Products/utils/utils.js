const sortPricesByAscending = ( products ) => {
    return products.slice().sort(( product1, product2 ) => product1.price - product2.price )
}
const sortPricesByDescending = ( products ) => { 
    return products.slice().sort(( product1, product2 ) => product2.price - product1.price )
}

export const getFilteredData = ( products, currentFilter ) => {
    switch( currentFilter ){
        case "ascending" : return sortPricesByAscending( products )
        case "descending" : return sortPricesByDescending( products )
        default : return products
    }
}