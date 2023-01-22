import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { TaskPreview } from "./task-preview"
import { Droppable } from "react-beautiful-dnd"

export const TaskList = ({ tasks, groupId, setIsScrollable }) => {

    const board = useSelector(state => state.boardModule.board)
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const ref = useRef()

    useEffect(() => {
        checkScroll()
    }, [board])

    useEffect(() => {
        if (formAdd?.groupId) checkScroll()
    }, [formAdd])

    const checkScroll = () => {
        setIsScrollable(ref.current.scrollHeight > ref.current.clientHeight)
    }

    if (!tasks) return <div />

    return (
        <div className="task-list-container" ref={ref}>
            <Droppable droppableId={groupId} key={groupId} type="task">
                {provided => (
                    <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => (
                            <li key={task.id}>
                                <TaskPreview task={task} groupId={groupId} index={index} />
                            </li>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    )
}
