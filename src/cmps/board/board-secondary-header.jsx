import { useState } from "react"
import { BoardSideMenu } from "./board-side-menu"
import { BoardMembersModal } from "./board-members-modal"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { BsPersonPlus } from "react-icons/bs"

export const BoardSecondaryHeader = ({ board }) => {

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false)
    if (!board) return

    const getAvatarPosition = (avatarIdx) => {
        return avatarIdx * (-3)
    }

    const openBoardMenu = (isOpen) => {
        setIsSideMenuOpen(!isSideMenuOpen)
    }

    return (
        <header className="full board-layout board-secondary-header-container">
            <div className="board-secondary-header">
                <div className="header-main-content">

                    <div className="header-board-details">
                        <span className="board-title">{board.title}</span>

                        <button className="btn btn-transparent creator">
                            {board.createdBy ? board.createdBy.fullname : 'Guest'}
                        </button>

                        <span className="divider"></span>
                        <span className="member-avatars">
                            {board.members && board.members.map((member, idx) => (
                                <img key={member._id}
                                    className="member-avatar"
                                    src={member.imgUrl}
                                    alt="profile img"
                                    style={{ transform: `translate(${getAvatarPosition(idx)}px)` }}
                                />
                            ))}

                            <button
                                className="btn btn-transparent btn-share"
                                onClick={() => setIsMembersModalOpen(true)}
                            >
                                <BsPersonPlus className="add-member-icon" />
                                <span className="share">Share</span>
                            </button>
                        </span>

                        {isMembersModalOpen && <BoardMembersModal setIsMembersModalOpen={setIsMembersModalOpen} />}
                    </div>

                    <button className="btn-transparent btn-open-menu" onClick={() => openBoardMenu()}>
                        <HiOutlineDotsHorizontal className="board-menu-dots-icon" />
                        <span className="show-menu-txt">Show menu</span>
                    </button>

                    {isSideMenuOpen && <BoardSideMenu board={board} setIsSideMenuOpen={setIsSideMenuOpen} />}
                </div>
            </div>
        </header>
    )
}