import styles from './css/main.css'
import menusTemplate from './templates/menus.hbs'

document.addEventListener('DOMContentLoaded', () => {
  const div = document.createElement('div')

  div.innerHTML = menusTemplate({
    styles,
    menus: ['hello']
  })

  document.body.appendChild(div)
})
