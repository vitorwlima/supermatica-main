import React, { Fragment, lazy, Suspense } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { AuthGuard, GuestGuard, Loader } from './components'

const routesConfig = [
  {
    guard: AuthGuard,
    path: '/',
    component: lazy(() => import('./views/Home')),
  },
  {
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('./views/Login')),
  },
  {
    guard: GuestGuard,
    path: '/cadastro',
    component: lazy(() => import('./views/Register')),
  },
  {
    guard: GuestGuard,
    path: '/confirmar-conta/:token',
    component: lazy(() => import('./views/AccountConfirm')),
  },
  {
    guard: AuthGuard,
    path: '/conta',
    component: lazy(() => import('./views/Account')),
  },
  {
    guard: AuthGuard,
    path: '/contato',
    component: lazy(() => import('./views/Contato')),
  },
  {
    guard: AuthGuard,
    path: '/exercicios/:slug',
    component: lazy(() => import('./views/Exercises')),
  },
  {
    guard: AuthGuard,
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
