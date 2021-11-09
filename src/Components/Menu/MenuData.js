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
                route : "/men/shirts"
            },
            {
                id : uuidv4(),
                category : "T-Shirts",
                route : "/men/t-shirts"
            },
            {
                id : uuidv4(),
                category : "Shorts",
                route : "/men/shorts"
            },
            {
                id : uuidv4(),
                category : "Jeans",
                route : "/men/jeans"
            },
            {
                id : uuidv4(),
                category : "Sweatpants",
                route : "/men/sweatpants"
            },
            {
                id : uuidv4(),
                category : "Sweatshirts",
                route : "/men/sweatshirts"
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
                route : "/women/tops"
            },
            {
                id : uuidv4(),
                category : "Bottoms",
                route : "/women/bottoms"
            },
            {
                id : uuidv4(),
                category : "Dresses",
                route : "/women/dresses"
            },
            {
                id : uuidv4(),
                category : "Jackets",
                route : "/women/jackets"
            }
        ]
    },
    {
        id : uuidv4(),
        title : "Brands",
        expandable : true,
        content : [
            {
                id : uuidv4(),
                category : "neog shirt company",
                route : "/brands/neog/shirts"
            },
            {
                id : uuidv4(),
                category : "TDZ shirts",
                route : "/brands/tdz/shirts"
            }
        ]
    },
    {
        id : uuidv4(),
        title : "About Us",
        expandable : false
    }
]

export default MenuData