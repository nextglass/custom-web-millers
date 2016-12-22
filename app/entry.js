import './css/main.css'
import menusTemplate from './templates/menus.hbs'
import delegate from './src/delegate'
import insertAfter from './src/insert-after'

function postRequest(query, locationId, callback) {
  const auth = btoa(`${process.env.EMAIL}:${process.env.API_KEY}`)

  // Could use fetch here if supporting newer browsers
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json'
  xhr.open('POST', 'https://business.untappd.com/graphql')
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.setRequestHeader('accept', 'application/json')
  xhr.setRequestHeader('authorization', `Basic ${auth}`)

  xhr.onload = () => callback(xhr)

  xhr.send(JSON.stringify({
    query,
    variables: {
      locationId: parseInt(locationId, 10)
    }
  }))
}

const query = `
  query ($locationId: Int!) {
    location(id: $locationId) {
      id
      menus(unpublished: false) {
        edges {
          node {
            id
            name
            sections {
              edges {
                node {
                  id
                  name
                  description
                  items {
                    edges {
                      node {
                        id
                        label_image
                        name
                        brewery
                        rating
                        style
                        brewery_location
                        containers {
                          edges {
                            node {
                              price
                              container_size {
                                name
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const scripts = document.getElementsByTagName('script')
let scriptTag = scripts[scripts.length - 1]

if (!scriptTag) {
  scriptTag = document.getElementById('menu-loader')
}

const locationId = scriptTag.dataset.locationId

const div = document.createElement('div')
div.innerHTML = '<div class="u__center"><div>Loading...</div></div>'
insertAfter(scriptTag, div)

postRequest(query, locationId, (xhr) => {
  const menus = xhr.response.data.location.menus

  div.innerHTML = menusTemplate({ menus })

  insertAfter(scriptTag, div)

  setupScroll()
})

function setupScroll() {
  const scrollEl = '[data-behavior="u__scroll"]'
  const onTap = document.querySelector('.u__on-tap')

  let fn = null

  delegate(document, 'mousedown', scrollEl, (event) => {
    event.preventDefault()

    if (event.button === 2) { return }
    const direction = event.target.dataset.direction

    const speed = direction === 'down' ? 7 : -7

    function update() {
      onTap.scrollTop += speed
      fn = requestAnimationFrame(update)
    }

    update()
  })

  delegate(document, 'mouseup', scrollEl, (event) => {
    event.preventDefault()
    cancelAnimationFrame(fn)
  })
}
