import { defineStore } from 'pinia'

// NOTE: This is a localStorage-backed placeholder so the UI is fully
// functional before Supabase (Phase 3) is wired up. The action signatures
// (login/register/logout) are written to match what a Supabase-auth
// version will look like, so swapping the implementation later means
// changing only the body of these actions, not any component code.

function hash(str) {
  let h = 5381
  for (const c of str) h = (h * 33) ^ c.charCodeAt(0)
  return (h >>> 0).toString(36)
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: JSON.parse(localStorage.getItem('ts_session') || 'null'),
  }),
  getters: {
    isLoggedIn: (state) => !!state.session,
  },
  actions: {
    _getUsers() {
      return JSON.parse(localStorage.getItem('ts_users') || '[]')
    },
    _setUsers(users) {
      localStorage.setItem('ts_users', JSON.stringify(users))
    },
    register({ name, surname, email, password }) {
      const users = this._getUsers()
      const emailNorm = email.trim().toLowerCase()
      if (users.find((u) => u.email === emailNorm)) {
        throw new Error('Email вже зареєстровано')
      }
      const user = {
        id: Date.now().toString(36),
        name,
        surname,
        email: emailNorm,
        passwordHash: hash(password),
        blocked: false,
        createdAt: new Date().toISOString(),
      }
      users.push(user)
      this._setUsers(users)
      this.session = { email: user.email, name: user.name }
      localStorage.setItem('ts_session', JSON.stringify(this.session))
    },
    login({ email, password }) {
      const emailNorm = email.trim().toLowerCase()
      const user = this._getUsers().find(
        (u) => u.email === emailNorm && u.passwordHash === hash(password)
      )
      if (!user) throw new Error('Невірний email або пароль')
      if (user.blocked) throw new Error('Акаунт заблоковано')
      this.session = { email: user.email, name: user.name }
      localStorage.setItem('ts_session', JSON.stringify(this.session))
    },
    logout() {
      this.session = null
      localStorage.removeItem('ts_session')
    },
  },
})
