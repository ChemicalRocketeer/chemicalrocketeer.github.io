
const removeChildren = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

const injectEmail = ({ href, html }) => whereTo => {
  removeChildren(whereTo)
  whereTo.href = href
  whereTo.innerHTML = html
  whereTo.classList.add('populated')
}

// please don't spam me
fetch('/data/shoot-me-a-web.json')
.then(response => response.json())
.then(({ href, html }) => {
  document.querySelectorAll('.shoot-me-a-web')
    .forEach(injectEmail({ href, html }))
})
