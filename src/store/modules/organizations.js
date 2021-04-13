import {
  SET_PROJECT_LIST,
  SET_ORGANIZATION_JOBS,
  SET_EDUCATIONS,
  SET_TUPOKSI_LIST
} from '../mutation-types'
import { GroupwareAPI } from '../../lib/axios'
import _orderBy from 'lodash/orderBy'

export const state = () => ({
  projects: [],
  jobs: [],
  educations: [],
  listOfTupoksi: []
})

export const getters = {
  listOfProjects (state) {
    const arr = Array.isArray(state.projects) ? state.projects.map(p => ({
      name: p.projectName,
      id: p._id
    })) : []
    return _orderBy(arr, ['name'], ['asc'])
  }
}

export const mutations = {
  [SET_PROJECT_LIST] (state, projects) {
    state.projects = projects
  },
  [SET_ORGANIZATION_JOBS] (state, jobs) {
    state.jobs = jobs
  },
  [SET_EDUCATIONS] (state, educations) {
    state.educations = educations
  },
  [SET_TUPOKSI_LIST] (state, list) {
    state.listOfTupoksi = list
  }
}

export const actions = {
  fetchListOfTupoksi ({ state, commit }) {
    if (!Array.isArray(state.listOfTupoksi) || !state.listOfTupoksi.length) {
      return GroupwareAPI.get('/tupoksi-jabatan/by-user')
        .then(r => r.data.results)
        .then(arr => commit(SET_TUPOKSI_LIST, arr))
        .catch(e => commit(SET_TUPOKSI_LIST, []))
    }
    return state.listOfTupoksi
  },
  fetchProjects ({ state, commit }) {
    if (!Array.isArray(state.projects) || !state.projects.length) {
      return GroupwareAPI.get('/project/', {
        params: {
          pageSize: 200
        }
      })
        .then(r => r.data.results)
        .then(projects => {
          commit(SET_PROJECT_LIST, projects)
        })
        .catch(e => {
          commit(SET_PROJECT_LIST, [])
        })
    }
    return state.projects
  },
  fetchEducations ({ state, commit }, { fresh = false } = {}) {
    const educations = [
      'Diploma',
      'S1',
      'S2',
      'S3'
    ]
    if (!state.educations || !state.educations.length || fresh) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit(SET_EDUCATIONS, educations)
          resolve(state.educations)
        }, 0)
      })
    } else {
      return state.educations
    }
  },
  fetchJobs ({ state, commit }, { fresh = false } = {}) {
    // mock data
    const jobs = [
      'Koordinator Umum',
      'Koordinator Pengembangan IT',
      'Koordinator Analisis',
      'Koordinator Data',
      'Koordinator Implementasi dan Pengelolaan',
      'Product Manager/System Analyst',
      'Business Analyst',
      'Back End Developer',
      'Front End Developer',
      'Mobile Engineer',
      'UX Researcher',
      'UI Designer',
      'Software QA',
      'Network Engineer',
      'DevOps/SRE Engineer',
      'Security Engineer',
      'Data Analyst',
      'Data Engineer',
      'Business Intelligence Developer',
      'Data Entry',
      'Content Strategist',
      'Graphic Designer',
      'Training Officer',
      'IT Helpdesk',
      'Technical Writer',
      'Project Officer',
      'Content Writer',
      'Monitoring Officer',
      'Administrasi',
      'Tim Paparan Gubernur'
    ].sort()

    if (!state.jobs || !state.jobs.length || fresh) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit(SET_ORGANIZATION_JOBS, jobs)
          resolve(state.jobs)
        }, 0)
      })
    } else {
      return Promise.resolve(state.jobs)
    }
  }
}
