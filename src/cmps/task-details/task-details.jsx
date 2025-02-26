import { useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { setDynamicModal } from "../../store/board/board.actions"
import { IoCloseOutline } from "react-icons/io5"

import { Loader } from "../loader"
import { Cover } from "./cover"
import { TaskTitle } from "./task-title"
import { Members } from "./members"
import { Labels } from "./labels"
import { Date } from "./date"
import { Description } from "./description"
import { AttachmentList } from "./attachment/attachment-list"
import { ChecklistList } from "./checklist/checklist-list"
import { TaskSideBar } from "./task-sidebar"

export const TaskDetails = () => {

    const board = useSelector(state => state.boardModule.board)
    const dynamicModal = useSelector(state => state.systemModule.dynamicModal)
    const { groupId, taskId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref = useRef()

    const closeTaskDetails = () => {
        navigate(`/board/${board._id}`)
    }

    const closeModal = (ev) => {
        ev.stopPropagation()

        if (dynamicModal.modalType) {
            dispatch(setDynamicModal({ modalTYpe: null, fromCmp: null }))
        }
    }

    if (!board) return <Loader />

    const task = boardService.getTask(board, groupId, taskId)
    const { title, dueDate, memberIds, attachments, checklists, description, cover, labelIds } = task

    return (
        <div className="black-screen" onClick={closeTaskDetails}>
            <div className="task-details-wrapper">
                <div className="task-details-layout task-details-container" ref={ref} onClick={closeModal}>

                    <button className="close-btn" onClick={closeTaskDetails}>
                        <IoCloseOutline />
                    </button>

                    {cover && <Cover cover={cover} dynamicModal={dynamicModal} />}

                    <TaskTitle title={title} board={board} />

                    <main className="task-details">
                        <div className="task-details-content">

                            <div className="content-info">
                                {memberIds?.length > 0 &&
                                    <Members
                                        members={boardService.getTaskMembers(board, groupId, taskId)}
                                        dynamicModal={dynamicModal}
                                    />
                                }

                                {labelIds?.length > 0 &&
                                    <Labels board={board} dynamicModal={dynamicModal} />
                                }
                            </div>

                            {dueDate && <Date dueDate={dueDate} dynamicModal={dynamicModal} />}

                            <Description description={description} />

                            {attachments?.length > 0 &&
                                <AttachmentList attachments={attachments} dynamicModal={dynamicModal} />
                            }

                            {checklists && <ChecklistList checklists={checklists} />}
                        </div>

                        <TaskSideBar dynamicModal={dynamicModal} />
                    </main>
                </div>

                <div className="task-details-margin-bottom" />
            </div>
        </div>
    )
}