export default function delegate(el, evt, sel, handler) {
  el.addEventListener(evt, function on(event) {
    let t = event.target
    while (t && t !== this) {
      if (t.matches(sel)) {
        handler.call(t, event)
      }
      t = t.parentNode
    }
  })
}
