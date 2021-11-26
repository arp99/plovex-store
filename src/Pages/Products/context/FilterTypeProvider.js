import { createContext, useReducer, useContext } from "react"
import { reducer } from "../reducer/reducer"

const filterContext = createContext()

export const FilterDataProvider = ({ children }) => {
    const [ filterOption, setFilterChosen ] = useReducer(reducer, "ascending")
    return(
        <filterContext.Provider value={{ filterOption, setFilterChosen }}>
            { children }
        </filterContext.Provider>
    )
}

export const useFilterOption = () => useContext( filterContext )