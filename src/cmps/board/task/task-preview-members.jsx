import { boardService } from "../../../services/board.service"

export const TaskPreviewMembers = ({ board, memberIds }) => {

    return (
        <div className="member-preview-list">
            {memberIds.map(memberId => (
                <img key={memberId}
                    src={boardService.getMemberImgUrl(board, memberId)}
                    alt="profile img"
                />
            ))}
        </div>
    )
}