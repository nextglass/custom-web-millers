import './css/main.css'
import menusTemplate from './templates/menus.hbs'

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

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
div.innerHTML = '<h3>Loading...</h3>'
insertAfter(scriptTag, div)

postRequest(query, locationId, (xhr) => {
  const menus = xhr.response.data.location.menus

  div.innerHTML = menusTemplate({ menus })

  insertAfter(scriptTag, div)
})
