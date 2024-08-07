import { createContext, useContext, useState } from "react";
import { AppContextProps } from "./AppContext.interface";

const AppContext = createContext<AppContextProps | undefined>(undefined)

const AppContextProvider = ({children}: {children: JSX.Element[] | JSX.Element}) => {
    const [fromDate, setFromDate] = useState<Date | undefined>()
    const [toDate, setToDate] = useState<Date | undefined>()

    const payload: AppContextProps = {
        setFromDate: setFromDate,
        setToDate: setToDate,
        fromDate: fromDate,
        toDate: toDate
    } 

    return <AppContext.Provider value={payload}>{children}</AppContext.Provider>
}

const useAppContext = () => {
    const context = useContext(AppContext)
    
    if (!context) {
        throw new Error('App context provider doesn\'t exist')
    }

    return context
}

export {
    AppContextProvider,
    useAppContext
}