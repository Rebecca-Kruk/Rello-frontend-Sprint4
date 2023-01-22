import { useDispatch } from 'react-redux'
import { GroupPreview } from './group-preview'
import { handleDrag } from '../../../store/board/board.actions'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { utilService } from '../../../services/util.service'
import { Loader } from '../../loader'

export const GroupList = ({ groups }) => {

    const dispatch = useDispatch()

    const onDragEnd = (result) => {

        const { destination, source } = result
        const { droppableId, index } = source
        if (!destination) return

        if (destination.droppableId === droppableId &&
            destination.index === index) return

        dispatch(handleDrag(result))
    }

    if (!groups) return <Loader />

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={utilService.makeId()} direction="horizontal" type="group">
                {provided => (
                    <div className="group-list flex"
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {groups.map((group, index) =>
                            <GroupPreview key={group.id} group={group} index={index} />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
