let ep = 'https://apiumum.herokuapp.com/officials/'

xhr = (method, ep) => {
  return new Promise((resolve, reject) => {
    const xmlHttpRequest = new XMLHttpRequest()
    xmlHttpRequest.open(method, ep, true)
    xmlHttpRequest.onload = () => {
      if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        resolve(JSON.parse(xmlHttpRequest.responseText))
      }
      else {
        reject(JSON.parse(xmlHttpRequest.responseText))
      }
    }
    xmlHttpRequest.onerror = () => {
      reject(JSON.parse(xmlHttpRequest.responseText))
    }
    xmlHttpRequest.send()
  })
}

let officials = {}
xhr('GET', ep)
  .then((data) => {
    for (i in data) {
      officials[data[i]._id] = data[i].name
    }
  })
  .catch((err) => {
    console.log(err)
  })

xhr('GET', ep + 'events')
  .then((data) => {
    for (i in data) {
      let dt = new Date(data[i].dateTime)

      // console.log(data[i])
      let tr = document.createElement('tr')
      document.getElementById('content').appendChild(tr)

      // dateTime
      let dateTime = document.createElement('td')
      dateTime.setAttribute('class', 'dateTime')
      tr.appendChild(dateTime)

      // date
      let date = document.createElement('div')
      date.setAttribute('class', 'date')
      date.innerHTML = dt.getDate()
      dateTime.appendChild(date)

      // time
      let time = document.createElement('div')
      time.setAttribute('class', 'time')
      time.innerHTML = 
        dt.getHours() + ':' +
        ('0' + dt.getMinutes()).slice(-2)
      dateTime.appendChild(time)

      // place
      let place = document.createElement('td')
      place.innerHTML = data[i].place
      tr.appendChild(place)

      // description
      let description = document.createElement('td')
      description.innerHTML = data[i].description
      tr.appendChild(description)
    }
  })
  .catch((err) => {
    console.log(err)
  })

// (() => {
//   console.log('fetching data')
//   xhr('GET', ep)
//     .then((data) => {
//       console.log(data)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })()