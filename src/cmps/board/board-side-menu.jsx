import { useState } from "react"
import { BoardBgColorList } from "./board-bg-color-list"
import { BoardBgImgList } from "./board-bg-img-list"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLessThan } from "@fortawesome/free-solid-svg-icons"
import { IoCloseOutline } from "react-icons/io5"

export const BoardSideMenu = ({ setIsSideMenuOpen }) => {

    const [openModal, setOpenModal] = useState('main')

    const openBgPicker = (type) => {
        setOpenModal(type)
    }

    return (
        <section className="board-side-menu-container">

            {openModal !== 'main' &&
                <span className="icon-less" onClick={() => setOpenModal('main')}>
                    <FontAwesomeIcon icon={faLessThan} size="2xs" />
                </span>
            }

            <span className="btn-close-menu" onClick={() => setIsSideMenuOpen(false)}><IoCloseOutline /></span>

            {openModal === 'main' &&
                <div className="board-side-menu-content">

                    <div className="menu-header">
                        <h3 className="menu-header-title">Menu</h3>
                    </div>

                    <div className="menu-main-content">
                        <div className="board-background-section">
                            <div className="board-bg-img-tile" onClick={() => openBgPicker('img')}>
                                <div className="img-container" />
                                <div className="bg-tile-title" >Photos</div>
                            </div>

                            <div className="board-bg-color-tile" onClick={() => openBgPicker('color')}>
                                <div className="img-container" />
                                <div className="bg-tile-title">Colors</div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {openModal === 'img' && <BoardBgImgList />}
            {openModal === 'color' && <BoardBgColorList />}
        </section>
    )
}