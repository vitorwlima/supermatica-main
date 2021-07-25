import { createContext, ReactNode, useState, useEffect } from 'react'
import { setAccessToken } from '../AuthenticationToken'
import api from '../services/api'

interface IUserContextProviderProps {
  children: ReactNode
}

interface IUser {
  name: string
  email: string
  password: string
  admin: boolean
}

interface IUserContext {
  user: IUser | undefined
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
}

export const UserContext = createContext({} as IUserContext)

export const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await api.get('/refresh-token')
      setAccessToken(data.token)
      setUser(data.user)
    }
    getUser()
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
