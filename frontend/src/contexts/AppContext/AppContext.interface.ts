export interface AppContextProps {
    fromDate?: Date
    toDate?: Date

    setFromDate: (date?: Date) => void
    setToDate: (date?: Date) => void
}