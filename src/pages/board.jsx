import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { loadBoard, setMainHeaderHidden, updateBoardFromSocket } from "../store/board/board.actions"
import { setIsFormAddOpen } from "../store/board/board.actions"
import { socketService } from "../services/socket.service"
import { useMediaQuery } from "@mui/material"
import { BsPlusLg } from "react-icons/bs"

import { Loader } from "../cmps/loader"
import { MainHeader } from "../cmps/main-header"
import { BoardSecondaryHeader } from "../cmps/board/board-secondary-header"
import { GroupList } from "../cmps/board/group/group-list"
import { FormAdd } from "../cmps/board/form-add"

export const Board = () => {

    const formAdd = useSelector(state => state.systemModule.formAdd)
    const isMainHeaderHidden = useSelector(state => state.systemModule.isMainHeaderHidden)
    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()
    const params = useParams()
    const matches = useMediaQuery('(max-width: 520px)')

    useEffect(() => {
        dispatch(loadBoard(params.boardId))
        setMainHeaderShown()
    }, [params.boardId, matches])

    useEffect(() => {
        socketService.on('board-updated', (board) => {
            dispatch(updateBoardFromSocket(board))
        })
    }, [])

    const setMainHeaderShown = () => {
        if (matches) dispatch(setMainHeaderHidden(true))
        else dispatch(setMainHeaderHidden(false))
    }

    const onAddGroup = () => {
        dispatch(setIsFormAddOpen(null, true))
    }

    const getBoardBg = () => {
        let style = {}

        if (board.style?.imgUrl) {
            style = {
                background: `url(${board.style.imgUrl})`,
                backgroundSize: 'cover'
            }
        } else {
            style = {
                background: board.style.bgColor
            }
        }

        return style
    }

    if (!board) return <Loader />

    return (
        <div className="board-layout board-page">
            {!isMainHeaderHidden && <MainHeader />}

            <main className="full board-layout board" style={getBoardBg()}>
                <BoardSecondaryHeader board={board} />

                <div className="group-list-container">
                    <GroupList groups={board.groups} />

                    {formAdd.isAddGroup
                        ? <FormAdd />
                        : <button className="btn btn-add-group" onClick={onAddGroup}>
                            <BsPlusLg className="plus-icon" />
                            Add another list
                        </button>
                    }
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
