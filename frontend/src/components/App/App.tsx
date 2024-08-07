import { Box, Button, Container, CssBaseline, Stack, ThemeProvider, Typography, createTheme } from "@mui/material"
import { BarChart } from "@mui/x-charts"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { DateRangePicker } from "@mui/x-date-pickers-pro"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DayCalendar } from "@mui/x-date-pickers/internals"
import { useLocation } from "react-router-dom"
import ClothStats from "../ClothStats/ClothStats"
import React, { useState } from "react"
import { useAppContext } from "../../contexts/AppContext/AppContext"
import PromoStats from "../PromoStats/PromoStats"
import SkinsStats from "../SkinsStats/SkinsStats"
import JoinStats from "../JoinStats/JoinStats"

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
})

const pages: {name: string, component: React.FC}[] = [
    {
        name: 'одежде',
        component: ClothStats
    },

    {
        name: 'промокодам',
        component: PromoStats
    },

    {
        name: 'скинам',
        component: SkinsStats
    },

    {
        name: 'заходам',
        component: JoinStats
    },
]

export default () => {
    const appContext = useAppContext()
    const location = useLocation()
    const [page, setPage] = useState<number>(0)

    const {name, component: Component} = pages[page]

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Container maxWidth="lg" sx={{ py: 1, height: 1 }}>
                    <Box width={1} height={1}>
                        <Stack height={1} spacing={2}>
                            <Typography variant="h5" mb={1}>Статистика по {name}</Typography>
                            <DateRangePicker localeText={{ start: 'Откуда смотрим', end: 'Куда смотрим' }} onAccept={(range) => {
                                appContext.setFromDate(range[0]?.toDate())
                                appContext.setToDate(range[1]?.toDate())
                            }}/>

                            <Box flexGrow={1} width={1}>
                                {
                                    <Component />
                                }
                            </Box>

                            <Stack direction={'row'} justifyContent={'space-evenly'} alignItems={'center'}>
                                <Button sx={{px: 3}} variant="contained" disabled={page === 0} onClick={() => {setPage(page - 1)}}>Назад</Button>
                                <Typography>{`${page + 1}/${pages.length}`}</Typography>
                                <Button sx={{px: 3}} variant="contained" disabled={page >= pages.length - 1} onClick={() => {setPage(page + 1)}}>Далее</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Container>
            </ThemeProvider>
        </LocalizationProvider>
    )
}