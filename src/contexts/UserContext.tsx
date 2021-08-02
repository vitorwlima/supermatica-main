import { createContext, ReactNode, useState, useEffect } from 'react'
import { setAccessToken } from '../AuthenticationToken'
import api from '../services/api'

interface IUserContextProviderProps {
  children: ReactNode
}

interface IAnsweredQuestion {
  questionId: string
  correct: boolean
}

interface IUser {
  _id: string
  name: string
  email: string
  admin: boolean
  confirmed: boolean
  answeredQuestions: IAnsweredQuestion[]
}

interface IUserContext {
  user: IUser | undefined
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
  getUser: () => void
}

export const UserContext = createContext({} as IUserContext)

export const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  const [user, setUser] = useState<IUser>()

  const getUser = async () => {
    const { data } = await api.get('/refresh-token')
    setAccessToken(data.token)
    setUser(data.user)
  }

  useEffect(() => {
    getUser()
    setInterval(getUser, 1000 * 60 * 12)
  }, [])

  return <UserContext.Provider value={{ user, setUser, getUser }}>{children}</UserContext.Provider>
}
