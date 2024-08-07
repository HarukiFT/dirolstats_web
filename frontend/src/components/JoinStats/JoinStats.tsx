import { useEffect, useState } from "react"
import { useAppContext } from "../../contexts/AppContext/AppContext"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axiosRequest from "../../shared/services/axiosInstance";
import { Button, Stack } from "@mui/material";
import { unparse } from "papaparse";
import { saveAs } from "file-saver";

interface DataItem {
    _id: {
        day: string;
        planet: string;
    };
    value: number;
}

interface Row {
    id: string;
    planet: string;
    [key: string]: number | string;
}



const JoinStats: React.FC = () => {
    const appContext = useAppContext()

    const [rows, setRows] = useState<Row[]>([])
    const [columns, setColumns] = useState<GridColDef[]>([])

    useEffect(() => {
        const fetchData = async () => {
            if (!appContext.fromDate || !appContext.toDate) {
                return
            }

            const response = await axiosRequest.get(`/stats/join?from=${appContext.fromDate.toISOString()}&to=${appContext.toDate.toISOString()}`);
            const data: DataItem[] = response as any

            const uniqueDays = Array.from(new Set(data.map(item => item._id.day))).sort()

            const cols: GridColDef[] = [
                { field: 'planet', headerName: 'Planet', width: 150 },
                ...uniqueDays.map(day => ({ field: day, headerName: day, width: 150 })),
            ]

            const transformedRows: Row[] = []
            const planetMap = new Map<string, Row>()

            data.forEach(item => {
                const { day, planet } = item._id
                const value = item.value

                if (!planetMap.has(planet)) {
                    planetMap.set(planet, { id: planet, planet })
                }

                planetMap.get(planet)![day] = value
            });

            planetMap.forEach(row => transformedRows.push(row))

            setRows(transformedRows)
            setColumns(cols)
        };

        fetchData()
    }, [appContext.fromDate, appContext.toDate])

    const exportToCSV = () => {
        const csv = unparse({
            fields: columns.map(col => col.field),
            data: rows.map(row => Object.values(row)),
        })

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        saveAs(blob, 'data.csv')
    };

    return (
        <Stack height={1} spacing={2}>
            <Button variant="outlined" onClick={exportToCSV}>
                Скачать
            </Button>
            <DataGrid rows={rows} autoHeight={true} sx={{ height: .1 }} columns={columns} />
        </Stack>
    )
}

export default JoinStats