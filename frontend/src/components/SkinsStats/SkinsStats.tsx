import { Typography } from "@mui/material"
import axiosRequest from "../../shared/services/axiosInstance"
import { useEffect, useState } from "react"
import { useAppContext } from "../../contexts/AppContext/AppContext"
import { BarChart } from "@mui/x-charts"
import { SeriesValueFormatter } from "@mui/x-charts/internals"

interface SeriesType {
    dataKey: string
    label: string
    valueFormatter: SeriesValueFormatter<number | null>
}

const SkinsStats: React.FC = () => {
    const appContext = useAppContext()
    const [series, setSeries] =  useState<SeriesType[]>([])
    const [dataset, setDataset] =  useState<Record<string, number>[]>([])

    useEffect(() => {
        if (!appContext.fromDate || !appContext.toDate) {
            setSeries([])
            setDataset([])

            return
        }

        axiosRequest.get<{_id: string, value: number}[]>(`/stats/skins?from=${appContext.fromDate.toISOString()}&to=${appContext.toDate.toISOString()}`).then(response => {
            setDataset([response.reduce((prev: Record<string, number>, currentValue: {_id: string, value: number}) => {
                const map = {...prev}
                map[currentValue._id] = currentValue.value

                return map
            }, {})])

            const seriesNames = new Set<string>()
            response.forEach(item => {
                seriesNames.add(item._id)
            })

            const series: SeriesType[] = []
            seriesNames.forEach(item => {
                series.push({
                    dataKey: item,
                    label: item,
                    valueFormatter: (value) => `${value?.toString()}` 
                })
            })

            setSeries(series)
            
        })
    }, [appContext.fromDate, appContext.toDate])

    return (
        <BarChart dataset={dataset} series={series}/>
    )
}

export default SkinsStats