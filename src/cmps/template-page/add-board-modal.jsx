import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { boardService } from "../../services/board.service"
import { useForm } from "../../hooks/useForm"
import { addBoard } from "../../store/board/board.actions"
import { IoCloseOutline } from "react-icons/io5"

export const AddBoardModal = ({ toggleAddBoardModal }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const newBoard = useSelector(state => state.boardModule.board)

    const [board, handleChange, setBoard] = useForm({
        title: '',
        style: {
            imgUrl: boardService.getBackground('url')[2],
            bgColor: null
        }
    })

    useEffect(() => {
        if (newBoard) {
            console.log('board:', newBoard)
            navigate(`/board/${newBoard._id}`)
        }
    }, [newBoard])

    const onAddBoard = (ev) => {
        ev.preventDefault()
        dispatch(addBoard(board))
    }

    const setBoardBg = (type, value) => {
        let imgUrl
        let bgColor

        if (type === 'url') {
            imgUrl = value
            bgColor = null
        } else if (type === 'color') {
            bgColor = value
            imgUrl = null
        }

        setBoard(prevBoard => ({ ...prevBoard, style: { imgUrl, bgColor } }))
    }

    const setDisplayImgCover = () => {
        let style = {}

        if (board.style.imgUrl) {
            style = {
                backgroundImage: `url(${board.style.imgUrl})`
            }
        } else {
            style = {
                backgroundColor: board.style.bgColor
            }
        }

        return style
    }

    return (
        <section className="add-board-modal">
            <div className="add-board-modal-title-container">
                <h5 className="add-board-modal-title">Create board</h5>

                <button onClick={toggleAddBoardModal} className="btn-close-add-board-modal">
                    <IoCloseOutline />
                </button>
            </div>

            <div className="add-board-modal-content">
                <div className="board-display-img-container">
                    <div className="board-display-img" style={setDisplayImgCover()}>
                        <img
                            src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                            alt="board-displat-image"
                        />
                    </div>
                </div>

                <div className="bg-picker-container">
                    <div className="bg-picker-title">Background</div>

                    <ul className="bg-img-list">
                        {boardService.getBackground('url').map((bgImgUrl, idx) => {
                            return <li key={idx} className="bg-img-preview" onClick={() => setBoardBg('url', bgImgUrl)}>
                                <img className="img-preview" src={`${bgImgUrl}`} />
                            </li>
                        })}
                    </ul>

                    <ul className="bg-color-list">
                        {boardService.getBackground('color').map((bgColor, idx) => {
                            return <li key={idx} className="bg-color-preview" style={{ background: `${bgColor}` }}
                                onClick={() => setBoardBg('color', bgColor)}>
                            </li>
                        })}
                    </ul>
                </div>

                <form onSubmit={onAddBoard}>
                    <label className="add-board-title" htmlFor="title">
                        Board title
                        <span className="asterisk">*</span>
                    </label>

                    <input
                        className="add-board-input-title"
                        name="title"
                        id="title"
                        value={board.title}
                        onChange={handleChange}
                        autoFocus
                    >
                    </input>
                    <p className="require-title"> 👋 Board title is required</p>

                    <button className={board.title ? "btn-add-board" : "btn-disabled"}>
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}