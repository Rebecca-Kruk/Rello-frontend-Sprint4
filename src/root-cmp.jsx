import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'
import './assets/styles/main.scss'

export class RootCmp extends React.Component {

    render() {
        return (
            <div className="app">
                <Routes>
                    {routes.map(route => {
                        const nestedRoute = route.nestedRoute

                        return (
                            <Route key={route.path}
                                exact={true}
                                element={route.component}
                                path={route.path}
                            >
                                {nestedRoute &&
                                    <Route key={nestedRoute.path}
                                        exact={true}
                                        element={nestedRoute.component}
                                        path={nestedRoute.path}
                                    />
                                }
                            </Route>
                        )
                    })}
                </Routes>
            </div>
        )
    }
}


