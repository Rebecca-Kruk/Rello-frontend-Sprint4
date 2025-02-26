import * as React from "react"
import dayjs from "dayjs"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateTask } from "../../store/board/board.actions"

import TextField from "@mui/material/TextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

export const DatesModal = ({ groupId, taskId, className }) => {

    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()
    const task = boardService.getTask(board, groupId, taskId)
    const ms = task.dueDate ? task.dueDate.ms : new Date().getTime()
    const date = new Date(ms)

    const cloneDayjs = dayjs().set('year', date.getFullYear())
        .set('month', date.getMonth()).set('date', date.getDate())
        .set('hour', date.getHours()).set('minute', date.getMinutes())

    const [value, setValue] = React.useState(cloneDayjs)

    useEffect(() => {
        dispatch(updateTask(groupId, taskId, 'dueDate', { ...task.dueDate, ms: new Date(value).getTime() }))
    }, [value])

    return (
        <div
            className={`dynamic-modal dates-modal ${className ? className : ""}`}
            onClick={(ev) => ev.stopPropagation()}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue)
                    }}
                />
            </LocalizationProvider>
        </div>
    )
}