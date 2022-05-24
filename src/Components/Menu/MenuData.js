import { v4 as uuidv4 } from 'uuid';

const MenuData = [
    {
        id : uuidv4(),
        title : "Home",
        route : "/",
        expandable : false
    },
    {
        id : uuidv4(),
        title : "Men",
        expandable : true,
        content : [
            {
                id : uuidv4(),
                category : "Shirts",
                route : "/products/category/shirts"
            },
            {
                id : uuidv4(),
                category : "T-Shirts",
                route : "/products/category/t-shirt"
            },
            {
                id : uuidv4(),
                category : "Shorts",
                route : "/products/category/shorts"
            },
            {
                id : uuidv4(),
                category : "Jeans",
                route : "/products/category/jeans"
            },
            {
                id : uuidv4(),
                category : "Sweatpants",
                route : "/products/category/sweatpants"
            },
        ]
    },
    {
        id : uuidv4(),
        title : "Women",
        expandable : true,
        content : [
            {
                id : uuidv4(),
                category : "Tops",
                route : "/products/category/tops"
            },
            {
                id : uuidv4(),
                category : "Dresses",
                route : "/products/category/dresses"
            },
        ]
    },
    {
        id : uuidv4(),
        title : "Brands",
        expandable : true,
        content : [
            {
                id : uuidv4(),
                category : "Indie",
                route : "/products/brand/indie"
            },
            {
                id : uuidv4(),
                category : "Korra",
                route : "/products/brand/korra"
            },
            {
                id : uuidv4(),
                category : "Cityof_",
                route : "/products/brand/cityof_"
            },
            {
                id : uuidv4(),
                category : "Flora",
                route : "/products/brand/flora"
            }
        ]
    }
]

export default MenuData