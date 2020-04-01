console.log('Client side js file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => { //e for event
    e.preventDefault() //prevent refreshing page to let function runs
    const location = search.value
    const url = '/weather?address='+ encodeURIComponent(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent=(data.error)
        }
        else {
            messageOne.textContent= data.location 
            messageTwo.textContent= data.forecast
        }
    })
})
})

