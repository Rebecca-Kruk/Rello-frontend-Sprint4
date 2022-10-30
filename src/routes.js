import { Home } from './pages/home.jsx'
import { TemplatePage } from './pages/template-page.jsx'
import { Board } from './pages/board.jsx'
import { TaskDetails } from './cmps/task-details/task-details.jsx'
import { LoginSignup } from './pages/login-signup.jsx'
import { UserProfile } from './pages/user-profile.jsx'

const routes = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: 'template',
        component: <TemplatePage />,
    },
    {
        path: 'board/:boardId',
        component: <Board />,
        nestedRoute: {
            path: 'group/:groupId/task/:taskId',
            component: <TaskDetails />,
        }
    },
    {
        path: 'login',
        component: <LoginSignup />,
    },
    {
        path: 'user/:id',
        component: <UserProfile />,
    }
]

export default routes