'use strict'

import axios from 'axios'
import config from '../config'

const params = {
  per_page: 20,
  page: 1
}

function backgrounds () {
  return new Promise(function (resolve, reject) {
    axios
      .request({
        url: '/backgrounds',
        baseURL: config.baseURL,
        method: 'get',
        params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(reject)
  })
}

function objects () {
  return new Promise(function (resolve, reject) {
    axios
      .request({
        url: '/objects',
        baseURL: config.baseURL,
        method: 'get',
        params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(reject)
  })
}

function models () {
  return new Promise(function (resolve, reject) {
    axios
      .request({
        url: '/models',
        baseURL: config.baseURL,
        method: 'get',
        params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(reject)
  })
}

function relatedObjects (element) {
  return new Promise(function (resolve, reject) {
    axios
      .request({
        url: `/objects/${element.id}/related`,
        baseURL: config.baseURL,
        method: 'get',
        params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(reject)
  })
}

function relatedModels (element) {
  return new Promise(function (resolve, reject) {
    axios
      .request({
        url: `/models/${element.id}/related`,
        baseURL: config.baseURL,
        method: 'get',
        params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(reject)
  })
}

function loadFirstPhotos () {
  const promises = []
  promises.push(backgrounds())
  promises.push(objects())
  promises.push(models())
  return Promise.all(promises)
}

const api = {
  models,
  objects,
  backgrounds,
  loadFirstPhotos,
  relatedObjects,
  relatedModels
}

export default api
