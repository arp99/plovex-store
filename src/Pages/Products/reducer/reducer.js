export const reducer = ( prevState, { type, payload }) => {
    switch( type ) {
        case "CHANGE_FILTER" : 
            return payload
        default : break
    }
}