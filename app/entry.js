import './css/main.css'
import menusTemplate from './templates/menus.hbs'
import './templates/section.hbs'
import './templates/item.hbs'

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function postRequest(query, callback) {

  const auth = btoa(`${process.env.EMAIL}:${process.env.API_KEY}`)

  // Could use fetch here if supporting newer browsers
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json'
  xhr.open('POST', 'http://localhost:3000/graphql')
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.setRequestHeader('accept', 'application/json')
  xhr.setRequestHeader('authorization', `Basic ${auth}`)

  xhr.onload = () => {
    return callback(xhr)
  }

  xhr.send(JSON.stringify({
    query
  }))
}

const query = `
  {
    location(id: 7) {
      id
      menus {
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
                              id
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

postRequest(query, (xhr) => {
  const menus = xhr.response.data.location.menus
  const div = document.createElement('div')

  div.innerHTML = menusTemplate({ menus })

  const scripts = document.getElementsByTagName('script')
  let scriptTag = scripts[scripts.length - 1]

  if (!scriptTag) {
    scriptTag = document.getElementById('menu-loader')
  }

  insertAfter(scriptTag, div)
})
