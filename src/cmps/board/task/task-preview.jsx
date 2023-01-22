import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setModalTaskId } from "../../../store/board/board.actions"
import { BiPencil } from "react-icons/bi"

import { Loader } from "../../loader"
import { Draggable } from "react-beautiful-dnd"
import { TaskEditModal } from "./task-edit-modal"
import { TaskPreviewBadge } from "./task-preview-badge"
import { TaskPreviewLabels } from "./task-preview-labels"
import { TaskPreviewMembers } from "./task-preview-members"

export const TaskPreview = ({ task, groupId, index }) => {

    const board = useSelector(state => state.boardModule.board)
    const modalTaskId = useSelector(state => state.systemModule.modalTaskId)
    const { id, cover, title, description, attachments, dueDate, labelIds, memberIds } = task
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openTaskDetails = () => {
        navigate(`/board/${board._id}/group/${groupId}/task/${id}`)
    }

    const openTaskEditModal = (ev) => {
        ev.stopPropagation()
        dispatch(setModalTaskId(task.id))
    }

    const closeTaskEditModal = (ev) => {
        ev.stopPropagation()
        dispatch(setModalTaskId(null))
    }

    const isBadge = () => {
        if (dueDate || description || memberIds || attachments) return true
        return false
    }

    if (!task) return <Loader />

    return (
        <Draggable key={id} draggableId={id} index={index} isDragDisabled={modalTaskId !== null}>
            {(provided) => (

                <div
                    className="task-preview-container"
                    onClick={openTaskDetails}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {modalTaskId === id &&
                        <TaskEditModal
                            task={task}
                            groupId={groupId}
                            closeTaskEditModal={(ev) => closeTaskEditModal(ev)}
                            isBadge={isBadge}
                        />
                    }

                    <div className="task-preview">
                        {cover &&
                            (cover.img
                                ? <img className="task-cover" src={cover.img} alt="cover" />
                                : <div className="task-cover task-cover-color" style={{ background: `${cover.color}` }} />
                            )
                        }

                        <button className="task-edit-icon" onClick={openTaskEditModal}>
                            <BiPencil />
                        </button>

                        <div className="task-preview-details">
                            {labelIds &&
                                <TaskPreviewLabels board={board} groupId={groupId} taskId={task.id} />
                            }

                            <div className="task-preview-title">{title}</div>

                            <div className="badge-wrapper">
                                {isBadge() &&
                                    <TaskPreviewBadge task={task} groupId={groupId} />
                                }

                                {memberIds?.length > 0 &&
                                    <TaskPreviewMembers board={board} memberIds={memberIds} />
                                }
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </Draggable>
    )
}