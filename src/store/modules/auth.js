import addHours from 'date-fns/addHours'
import * as types from '../mutation-types'
import { GroupwareAPI, setToken } from '../../lib/axios'
import { setTokenInCookie, setRefreshTokenInCookie } from '../../lib/js-cookie'
import { getIdFromUrl, googleDriveUrl } from '../../lib/string'
// state
export const state = {
  loading: true,
  user: null
}

// getters
export const getters = {
  loading: state => state.loading,
  user: state => state.user,
  check: state => state.user !== null,
  isInitialized: state => state.loading
}

// mutations
export const mutations = {
  [types.AUTH_LOADING] (state) {
    state.loading = true
  },

  [types.AUTH_INITIALIZED] (state) {
    state.loading = false
  },

  [types.SET_USER] (state, { user }) {
    state.user = user
  },

  [types.UNAUTHENTICATED] (state) {
    state.loading = false
    state.user = null
  }
}

export const actions = {
  async onLoginSuccess ({ commit, dispatch }, { token, expiredAt, refreshToken }) {
    if (token) {
      setToken(token)
      setTokenInCookie(token, {
        expires: addHours(new Date(), 24)
      })
      setRefreshTokenInCookie(refreshToken)
      await dispatch('getUserProfile')
    } else {
      await dispatch('onLoginFailed')
    }
  },
  onLoginFailed ({ commit }) {
    setToken(null)
    setTokenInCookie(null)
    setRefreshTokenInCookie(null)
    commit(types.UNAUTHENTICATED)
  },
  async loginUsingUsernameAndPassword ({ commit, dispatch }, { username, password }) {
    await GroupwareAPI.post('/auth/login/', {
      username,
      password
    }).then(r => r.data)
      .then(({ auth_token: token, exp: expiredAt, refresh_token: refreshToken }) => {
        return dispatch('onLoginSuccess', {
          token,
          expiredAt,
          refreshToken
        })
      })
      .catch((err) => {
        dispatch('onLoginFailed')
        throw err
      })
    commit(types.AUTH_INITIALIZED)
  },
  async login ({ commit, dispatch }) {
    if (!window.GAuth) {
      return
    }
    commit(types.AUTH_LOADING)
    const authCode = await window.GAuth.getAuthCode()
    await GroupwareAPI.post(`social/google-oauth2/`, {
      access_token: authCode
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.data)
      .then(({ auth_token: token, exp: expiredAt, refresh_token: refreshToken }) => {
        return dispatch('onLoginSuccess', {
          token,
          expiredAt,
          refreshToken
        })
      })
      .catch((err) => {
        dispatch('onLoginFailed')
        throw err
      })
      .finally(() => {
        commit(types.AUTH_INITIALIZED)
      })
  },
  async getUserProfile ({ state, commit }) {
    if (!state.user) {
      await GroupwareAPI.get('/user/info')
        .then(r => r.data.data)
        .then(profile => {
          let urlPhoto
          const uri = getIdFromUrl(profile.photo)
          if (uri) {
            urlPhoto = `${googleDriveUrl}${uri}&sz=w{{200}}-h{{100}}`
          }
          commit(types.SET_USER, {
            user: {
              ...profile,
              name: profile.nama_lengkap,
              jabatan: profile.jabatan,
              email: profile.email,
              photo: urlPhoto
            }
          })
        })
    }
    return state.user
  },
  async logout () {
    if (!window.GAuth) {
      return
    }
    await window.GAuth.signOut()
    setToken(null)
    setTokenInCookie(null)
    setRefreshTokenInCookie(null)
    await window.location.reload()
  }
}
