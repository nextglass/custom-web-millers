import map from 'async/map'

import './css/main.css'
import menusTemplate from './templates/menus.hbs'
import delegate from './src/delegate'
import insertAfter from './src/insert-after'

function xhrRequest(url, callback) {
  const auth = btoa(`${process.env.EMAIL}:${process.env.API_KEY}`)
  const xhr = new XMLHttpRequest()

  // Could use fetch here if supporting newer browsers

  xhr.open('GET', url)
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.setRequestHeader('accept', 'application/json')
  xhr.setRequestHeader('authorization', `Basic ${auth}`)
  xhr.onload = () => callback(null, JSON.parse(xhr.response))
  xhr.send()
}

function getMenus(locationId, callback) {
  xhrRequest(`https://business.untappd.com/api/v1/locations/${locationId}/menus`, callback)
}

function getEachMenu(menuId, callback) {
  xhrRequest(`https://business.untappd.com/api/v1/menus/${menuId}?full=true`, callback)
}


const scripts = document.getElementsByTagName('script')
let scriptTag = scripts[scripts.length - 1]

if (!scriptTag) {
  scriptTag = document.getElementById('menu-loader')
}

const locationId = scriptTag.getAttribute('data-location-id')

const div = document.createElement('div')
div.innerHTML = '<div class="u__center"><div>Loading...</div></div>'
insertAfter(scriptTag, div)

function setupScroll() {
  const scrollEl = '[data-behavior="u__scroll"]'
  const onTap = document.querySelector('.u__on-tap')

  let fn = null

  delegate(document, 'mousedown', scrollEl, (event) => {
    event.preventDefault()

    if (event.button === 2) { return }
    const direction = event.target.getAttribute('data-direction')

    const speed = direction === 'down' ? 7 : -7

    function update() {
      onTap.scrollTop += speed
      fn = requestAnimationFrame(update)
    }

    update()
  })

  document.addEventListener('mouseup', (event) => {
    event.preventDefault()
    cancelAnimationFrame(fn)
  })
}

getMenus(locationId, (err, response) => {
  const menus = response.menus
  const menuIds = menus.map(menu => menu.id)

  map(menuIds, getEachMenu, (err, results) => {
    const menusAll = results.map(res => res.menu)

    div.innerHTML = menusTemplate({ menus: menusAll })
    insertAfter(scriptTag, div)
    setupScroll()
  })
})
