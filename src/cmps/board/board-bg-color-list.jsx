import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateBoard } from "../../store/board/board.actions"

export const BoardBgColorList = () => {

    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()

    const setBoardBg = (type, value) => {

        if (type === 'url') {
            board.style.bgColor = null
            board.style.imgUrl = value
        }
        else if (type === 'color') {
            board.style.imgUrl = null
            board.style.bgColor = value
        }

        dispatch(updateBoard(board))
    }


    return (
        <section className="board-side-menu-content">
            <div className="menu-header">
                <h3 className="bg-picker-title">Colors</h3>
            </div>

            <div className="bg-options-container">
                <ul className="board-bg-color-list">
                    {boardService.getBoardBackground('color').map((bgColor, idx) => {
                        return <li
                            key={idx}
                            className="board-bg-color-preview"
                            style={{ background: `${bgColor}` }}
                            onClick={() => setBoardBg('color', bgColor)}
                        />
                    })}
                </ul>
            </div>
        </section>
    )
}