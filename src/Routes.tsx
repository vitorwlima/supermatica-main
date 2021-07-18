import React, { Fragment, lazy, Suspense } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Loader } from './components'

const routesConfig = [
  {
    path: '/',
    component: lazy(() => import('./views/Home')),
  },
  {
    path: '/login',
    component: lazy(() => import('./views/Login')),
  },
  {
    path: '/contato',
    component: lazy(() => import('./views/Contato')),
  },
]

const renderRoutes = (routes: any) =>
  routes ? (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Switch>
          {routes.map((route: any, i: number) => {
            const Guard = route.guard ? route.guard : Fragment

            const Component = route.component

            return (
              <Route
                exact
                key={i}
                path={route.path}
                render={(props): JSX.Element => (
                  <Guard>
                    <>
                      <Component {...props} />
                    </>
                  </Guard>
                )}
              />
            )
          })}
        </Switch>
      </BrowserRouter>
    </Suspense>
  ) : null

function Routes() {
  return renderRoutes(routesConfig)
}

export default Routes
