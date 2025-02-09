import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { updateTask } from "../../store/board/board.actions"
import { IoCloseOutline } from "react-icons/io5"

export const ChecklistModal = ({ groupId, taskId, closeModal, className }) => {

    const board = useSelector(state => state.boardModule.board)
    const [title, setTitle] = useState('Checklist')
    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    const onChange = ({ target }) => {
        setTitle(target.value)
    }

    const addChecklist = () => {
        let checklists = boardService.getTask(board, groupId, taskId).checklists
        if (!checklists) checklists = []
        const checklist = { id: utilService.makeId(), title, todos: [] }
        checklists.push(checklist)
        dispatch(updateTask(groupId, taskId, 'checklists', checklists))
        closeModal()
    }

    return (
        <div
            className={`dynamic-modal checklist-modal ${className ? className : ""}`}
            onClick={(ev) => ev.stopPropagation()}
        >
            <div className="dynamic-header">
                <h5>Add checklist</h5>
                <IoCloseOutline className="icon-close" onClick={closeModal} />
            </div>

            <div className="dynamic-content">
                <h6>Title</h6>

                <input
                    className="dynamic-input"
                    type="text"
                    placeholder="Search members"
                    ref={ref}
                    value={title}
                    onChange={onChange}
                />

                <button className="add-btn" onClick={addChecklist}>Add</button>
            </div>
        </div>
    )
}