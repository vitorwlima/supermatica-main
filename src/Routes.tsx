import React, { Fragment, lazy, Suspense } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { AdminGuard, AuthGuard, GuestGuard, Loader } from './components'

const routesConfig = [
  {
    guard: AuthGuard,
    path: '/conteudos',
    component: lazy(() => import('./views/Conteudos')),
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
    path: '/alterar-senha/:token',
    component: lazy(() => import('./views/ChangePassword')),
  },
  {
    guard: GuestGuard,
    path: '/esqueci-senha',
    component: lazy(() => import('./views/ForgotPassword')),
  },
  {
    guard: GuestGuard,
    path: '/esqueci-senha/:token',
    component: lazy(() => import('./views/ChangeForgottenPassword')),
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
    path: '/conteudos/:slug',
    component: lazy(() => import('./views/ExerciseList')),
  },
  {
    guard: AuthGuard,
    path: '/conteudos/:slug/:id',
    component: lazy(() => import('./views/Exercise')),
  },
  {
    guard: AdminGuard,
    path: '/admin',
    component: lazy(() => import('./views/HomeAdmin')),
  },
  {
    guard: AdminGuard,
    path: '/admin/new',
    component: lazy(() => import('./views/AdminConteudo')),
  },
  {
    guard: AdminGuard,
    path: '/admin/:slug',
    component: lazy(() => import('./views/AdminExerciseList')),
  },
  {
    guard: AdminGuard,
    path: '/admin/:slug/new',
    component: lazy(() => import('./views/AdminExerciseCreate')),
  },
  {
    guard: AdminGuard,
    path: '/admin/:slug/:id',
    component: lazy(() => import('./views/AdminExerciseEdit')),
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
