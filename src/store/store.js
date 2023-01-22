import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from "redux"
import thunk from "redux-thunk"

import { boardReducer } from "./board/board.reducer.js"
import { userReducer } from "./user/user.reducer.js"
import { systemReducer } from "./system.reducer"

const rootReducer = combineReducers({
    boardModule: boardReducer,
    userModule: userReducer,
    systemModule: systemReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))