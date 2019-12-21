import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'

ReactDOM.render(<Root />, document.getElementById('root'))

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
    })
}
