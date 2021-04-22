const inputBox = document.querySelector("#inputBox"),
    form       = document.querySelector("form"),
    wrapper    = document.querySelector(".lists-wrapper"),
    clearBtn   = document.querySelector(".btn-clear"),
    voiceBtn   = document.querySelector(".voice")

let speechRecognition = window.webkitSpeechRecognition,
                voice = new speechRecognition()
voice.lang       = 'en-Us'
voice.continuous = false

function renderer (array) {
    wrapper.innerHTML = null
    let sorted = array.sort(function(a, b) {
        let textA = a.text.toUpperCase()
        let textB = b.text.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
    for (let element of sorted) {
        let list         = document.createElement('li')
        let span         = document.createElement('span')
        let time         = document.createElement('time')
        let removeButton = document.createElement('button')

        list.classList.add('list')
        removeButton.classList.add('remove-btn')

        span.innerText         = element.text
        time.innerText         = element.time
        removeButton.innerText = '-'

        list.appendChild(span)
        list.appendChild(time)
        list.appendChild(removeButton)
        wrapper.appendChild(list)

        removeButton.onclick = () => {
            list.remove()
        }
    }
}
renderer(users)

form.onsubmit = (event) => {
    event.preventDefault()
    let date = new Date()

    text = inputBox.value
    time = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())

    users.push({text, time})
    // window.localStorage.setItem('users', JSON.stringify(users))
    renderer(users)

    inputBox.value = ''
}

clearBtn.onclick = () => {
    let lists = document.querySelectorAll('li')
    for (let list of lists) {
        list.remove()
    }
}

voiceBtn.onclick = () => {
    voice.start()
    inputBox.placeholder = 'Listening ... '
    voice.onresult = (event) => {
        let result = event.results[0][0].transcript
        let date = new Date()

        text = result
        time = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())

        users.push({text, time})
        // window.localStorage.setItem('users', JSON.stringify(users))
        renderer(users)
    }   
    voice.onspeechend = function() {
        voice.stop()
        inputBox.placeholder = 'Add your new todo'
    }
}