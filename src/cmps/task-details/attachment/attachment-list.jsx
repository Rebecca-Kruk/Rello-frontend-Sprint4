import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { Attachment } from "./attachment"
import { setDynamicModal, updateTask } from "../../../store/board/board.actions"
import { DynamicModal } from "../../dynamic-modal/dynamic-modal"
import { useMediaQuery } from "@mui/material"
import { ImAttachment } from "react-icons/im"

export const AttachmentList = ({ attachments, dynamicModal }) => {

    const { groupId, taskId } = useParams()
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width: 750px)')

    const toggleCover = (ev, idx) => {
        ev.stopPropagation()
        const attachment = attachments[idx]
        attachment.isCover = !attachment.isCover

        attachments.forEach((attachment, index) => {
            if (index === idx) return
            if (attachment.isCover) attachment.isCover = false
        })

        if (attachment.isCover) {
            dispatch(updateTask(groupId, taskId, 'cover', { img: attachment.url }))
        } else {
            dispatch(updateTask(groupId, taskId, 'cover', null))
        }

        dispatch(updateTask(groupId, taskId, 'attachments', attachments))
    }

    const toggleModal = (modalType, ev) => {
        if (ev) ev.stopPropagation()

        if (dynamicModal.modalType === modalType) {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }

        dispatch(setDynamicModal({ modalType, fromCmp: 'attachment' }))
    }

    const removeAttachment = (ev, idx) => {
        ev.stopPropagation()
        const updatedAttachments = attachments.filter((attachment, index) => index !== idx)
        dispatch(updateTask(groupId, taskId, 'attachments', updatedAttachments))

        const { isCover } = attachments[idx]
        if (isCover) dispatch(updateTask(groupId, taskId, 'cover', null))
    }

    const updateAttachments = (attachment, idx) => {
        attachments.splice(idx, 1, attachment)
        dispatch(updateTask(groupId, taskId, 'attachments', attachments))
    }

    return (
        <div className="attachment-list">

            <div className="attachment-list-header">
                <ImAttachment className="attachment-icon" />
                <h4>Attachments</h4>
            </div>

            {attachments.map((attachment, idx) => {
                return (
                    <Attachment key={idx}
                        attachment={attachment}
                        idx={idx}
                        toggleCover={toggleCover}
                        toggleModal={toggleModal}
                        removeAttachment={removeAttachment}
                        updateAttachments={updateAttachments}
                    />
                )
            })}

            <button className="add-attachment-btn" onClick={() => toggleModal('attachment-add')}>
                Add an attachment
            </button>

            {dynamicModal.modalType === 'attachment-add' && dynamicModal.fromCmp === 'attachment' &&
                <>
                    <DynamicModal type='attachment' groupId={groupId} taskId={taskId} closeModal={toggleModal} />
                    {matches && <div className="black-screen" />}
                </>
            }
        </div >
    )
}