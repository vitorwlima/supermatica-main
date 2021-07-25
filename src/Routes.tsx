import React, { Fragment, lazy, Suspense } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
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
    path: '/cadastro',
    component: lazy(() => import('./views/Register')),
  },
  {
    path: '/conta',
    component: lazy(() => import('./views/Account')),
  },
  {
    path: '/contato',
    component: lazy(() => import('./views/Contato')),
  },
  {
    path: '/exercicios/:slug',
    component: lazy(() => import('./views/Exercises')),
  },
  {
    path: '/exercicios/:slug/:id',
    component: lazy(() => import('./views/Exercise')),
  },
  {
    path: '/404',
    component: lazy(() => import('./views/NotFound')),
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
          <Redirect to='/404' />
        </Switch>
      </BrowserRouter>
    </Suspense>
  ) : null

function Routes() {
  return renderRoutes(routesConfig)
}

export default Routes
