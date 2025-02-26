import { boardService } from "../../services/board.service.js"
import { showSuccessMsg, showErrorMsg } from "../../services/event-bus.service.js"
import { socketService } from "../../services/socket.service.js"

export function loadBoards() {
    return async (dispatch) => {
        try {
            const miniBoards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', miniBoards })
        } catch (err) {
            console.log('Cannot load boards', err)
            throw err
        }
    }
}

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {
            const newBoard = await boardService.getBoardById(boardId)
            socketService.setBoard(boardId)
            dispatch({ type: 'SET_BOARD', newBoard })
        } catch (err) {
            showErrorMsg('Cannot load board')
            console.log('Cannot load board', err)
        }
    }
}

export function addBoard(board) {
    return async (dispatch) => {
        try {
            const newBoard = await boardService.save(board)
            dispatch({ type: 'SET_BOARD', newBoard })
        } catch (err) {
            console.log('Cannot add board', err)
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            console.log('Deleted Successfully!')
            showSuccessMsg('Board removed')
        } catch (err) {
            showErrorMsg('Cannot remove board')
            console.log('Cannot remove board', err)
        }
    }
}

export function updateBoard(board) {
    return async (dispatch, getState) => {
        try {
            const updatedBoard = await boardService.save(board)
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
            socketService.updateBoard(board._id)
        } catch (err) {
            console.log('Cannot update board', err)
            throw err
        }
    }
}

export function updateBoardFromSocket(updatedBoard) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_BOARD', updatedBoard })
    }
}

export function setBoardIsStarred(board) {
    return async (dispatch, getState) => {
        try {
            let miniBoards = getState().boardModule.boards
            miniBoards = await boardService.setBoardIsStarred(miniBoards, board)
            dispatch({ type: 'SET_BOARDS', miniBoards })
        } catch (err) {
            console.log('Cannot set board as starred', err)
        }
    }
}

export function saveGroup(group) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const updatedBoard = await boardService.saveGroup(board, group)
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
        } catch (err) {
            console.error('Save group in board actions has failed:', err)
        }
    }
}

export function removeGroup(groupId) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const updatedBoard = await boardService.removeGroup(board, groupId)
            console.log('Deleted successfully')
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
            showSuccessMsg('Group removed')
        } catch (err) {
            showErrorMsg('Cannot remove group')
            console.log('Cannot remove task', err)
        }
    }
}

export function updateGroupTitle(groupId, title) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const updatedBoard = await boardService.updateGroupTitle(board, groupId, title)
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
        } catch (err) {
            console.log('Update group title has failed in board actions:', err)
        }
    }
}

export function duplicateGroup(groupId) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const updatedBoard = await boardService.duplicateGroup(board, groupId)
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })

        } catch (err) {
            console.log('Duplicate group title has failed in board actions:', err)
        }
    }
}

export function addTask(groupId, task) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const updatedBoard = await boardService.saveTask(board, groupId, task)
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
        } catch (err) {
            console.error('Add task in board actions has failed:', err)
        }
    }
}

export function updateTask(groupId, taskId, key, value) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            let task = boardService.getTask(board, groupId, taskId)
            task = { ...task, [key]: value }
            const updatedBoard = await boardService.saveTask(board, groupId, task)
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
        } catch (err) {
            console.error('Update task in board actions has failed:', err)
        }
    }
}

export function removeTask(groupId, taskId) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const updatedBoard = await boardService.removeTask(board, groupId, taskId)
            console.log('Deleted Successfully!')
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
            showSuccessMsg('Task removed')
        } catch (err) {
            showErrorMsg('Cannot remove task')
            console.log('Cannot remove task', err)
        }
    }
}

export function handleDrag(result) {
    return async (dispatch, getState) => {
        try {
            let updatedBoard
            const board = getState().boardModule.board
            if (result.type === 'group') {
                updatedBoard = await boardService.moveGroup(board, result)
            } else {
                updatedBoard = await boardService.moveTask(board, result)
            }
            socketService.updateBoard(updatedBoard._id)
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
        } catch (err) {
            console.log('Cannot move task', err)
        }
    }
}

export function updateBoardLabels(labels) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const updatedBoard = await boardService.updateBoardLabels(board, labels)
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
        } catch (err) {
            console.error('Update board labels in board actions has failed:', err)
        }
    }
}

export function addMembersToBoard(users) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const updatedBoard = await boardService.addMembersToBoard(board, users)
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
        } catch (err) {
            console.log('Add members to board has failed in board actions:', err)
        }
    }
}

export function setIsFormAddOpen(groupId, isAddGroup) {
    return (dispatch) => {
        dispatch({ type: 'SET_FORM_ADD_GROUP_ID', groupId })
        dispatch({ type: 'SET_FORM_ADD_IS_ADD_GROUP', isAddGroup })
    }
}

export function setModalGroupId(groupId) {
    return (dispatch) => {
        dispatch({ type: 'SET_MODAL_GROUP_ID', groupId })
    }
}

export function setModalTaskId(taskId) {
    return (dispatch) => {
        dispatch({ type: 'SET_MODAL_TASK_ID', taskId })
    }
}

export function setTitleGroupId(groupId) {
    return (dispatch) => {
        dispatch({ type: 'SET_TITLE_GROUP_ID', groupId })
    }
}

export function setEditModalAttachmentIdx(idx) {
    return (dispatch) => {
        dispatch({ type: 'SET_EDIT_MODAL_ATTACHMENT_IDX', idx })
    }
}

export function setDynamicModal(modal) {
    return (dispatch) => {
        const { modalType, fromCmp } = modal
        dispatch({ type: 'SET_DYNAMIC_MODAL_TYPE', modalType })
        dispatch({ type: 'SET_DYNAMIC_MODAL_FROM_CMP', fromCmp })
    }
}

export function clearStore() {
    return (dispatch) => {
        const newBoard = null
        dispatch({ type: 'SET_BOARD', newBoard })
    }
}

export function setMainHeaderHidden(boolean) {
    return (dispatch) => {
        dispatch({ type: 'SET_MAIN_HEADER_HIDDEN', boolean })
    }
}