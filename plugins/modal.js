Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop () {}

function _createModalFooter (buttons = []) {
    if(buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add("btn")
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop
        
        wrap.appendChild($btn)
    })
    
    return wrap
}

function _createModal (options) {
    const defaultWidth = '600px'
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="overlay-modal" data-close = true>
        <div class="modal-window style = "width: ${options.width} || defaultWidth">
            <div class="modal-header">
                <span class="modal-title">${options.title || 'Окно'}</span>
                ${options.closable? `<span class="modal-close" data-close = true>&times;</span>` : ''}
            </div>
            <div class="modal-body" data-content>
                ${options.content || ''}
            </div>
        </div>
    </div>
  `)

    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}




modalWindow = function (options) {
    const $modal = _createModal(options)
    const animationSpeed = 200
    let closing = false
    let destroyed = false

    const modalMethod = {
        open() {
            if(destroyed) {
                return console.log('modal is destroyed');
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setInterval(() => {
                $modal.classList.remove('hide')
                closing = false
            }, animationSpeed)
        },

    }

    const listener = event => {
        if(event.target.dataset.close) {
            modalMethod.close()
        }
    }

    $modal.addEventListener('click', listener)
    return  Object.assign(modalMethod, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })

}

