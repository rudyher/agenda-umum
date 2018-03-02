let ep = 'https://apiumum.herokuapp.com/officials/'
let officials = {}
let months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
  'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
let today = new Date()

for (let i = today.getFullYear(); i < today.getFullYear() + 10; i++) {
  // console.log(i)
  let select = document.getElementById('year')
  let option = document.createElement('option')
  option.setAttribute('value', i)
  option.innerHTML = i
  select.appendChild(option)
}

for (i in months) {
  let select = document.getElementById('month')
  let option = document.createElement('option')
  option.setAttribute('value', i)
  option.innerHTML = months[i]
  select.appendChild(option)
}

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

(getEvents = () => {
  let official = document.getElementById('official').value
  let month = document.getElementById('month').value
  let year = document.getElementById('year').value

  let opts

  // console.log(month)
  if (month == 11) {
    opts =
      '?start=' + year + '-' + (parseInt(month) + 1) +
      '&end=' + (parseInt(year) + 1) + '-' + 1 +
      '&official=' + (official || '5a97ba77afda440014501ed1')
  } else {
    opts =
      '?start=' + year + '-' + (parseInt(month) + 1) +
      '&end=' + year + '-' + (parseInt(month) + 2) +
      '&official=' + (official || '5a97ba77afda440014501ed1')
  }

  console.log(opts)
  xhr('GET', ep + 'events' + opts)
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
})()

xhr('GET', ep)
  .then((data) => {
    let select = document.getElementById('official')

    for (i in data) {
      officials[data[i]._id] = data[i].name

      // set options to officials
      let option = document.createElement('option')
      option.setAttribute('value', data[i]._id)
      option.innerHTML = data[i].name
      select.appendChild(option)
    }
    // console.log(officials)
  })
  .catch((err) => {
    console.log(err)
  })

// xhr('GET', ep + 'events')
//   .then((data) => {
//     for (i in data) {
//       let dt = new Date(data[i].dateTime)

//       // console.log(data[i])
//       let tr = document.createElement('tr')
//       document.getElementById('content').appendChild(tr)

//       // dateTime
//       let dateTime = document.createElement('td')
//       dateTime.setAttribute('class', 'dateTime')
//       tr.appendChild(dateTime)

//       // date
//       let date = document.createElement('div')
//       date.setAttribute('class', 'date')
//       date.innerHTML = dt.getDate()
//       dateTime.appendChild(date)

//       // time
//       let time = document.createElement('div')
//       time.setAttribute('class', 'time')
//       time.innerHTML =
//         dt.getHours() + ':' +
//         ('0' + dt.getMinutes()).slice(-2)
//       dateTime.appendChild(time)

//       // place
//       let place = document.createElement('td')
//       place.innerHTML = data[i].place
//       tr.appendChild(place)

//       // description
//       let description = document.createElement('td')
//       description.innerHTML = data[i].description
//       tr.appendChild(description)
//     }
//   })
//   .catch((err) => {
//     console.log(err)
//   })
