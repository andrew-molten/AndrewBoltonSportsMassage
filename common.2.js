'use strict'

// Navigation
const nav = document.querySelector('.nav')
const navLinks = document.querySelector('.nav__links')
const btnBookOnline = document.querySelector('.book-online')
const headerLogo = document.querySelector('.header-logo')
const topNav = document.getElementById('topNav')
const $cookiesBanner = document.querySelector('.cookies-banner')
const $cookiesBannerButton = $cookiesBanner.querySelector('button')
const header = document.querySelector('.main-header')
const logoBars = document.querySelector('.logo-bars')
const icon = document.querySelector('.icon')
const headerBookNow = document.querySelector('#book-online-head')
const stickyBookNow = document.querySelector('#sticky-book-now-btn')
const bookOnlineBottom = document.querySelector('#Book-online-bottom')
const urgentBanner = document.querySelector('.urgent-banner')

// function changeUrgentBanner() {
//   urgentBanner.innerHTML = ''
//   const firstDisplayDate = new Date('03/09/2024').getTime()
//   const displayDate = new Date('03/16/2024').getTime()
//   const endDate = new Date('18/07/24').getTime()
//   const todaysDate = new Date().getTime()

//   const firstMessage =
//     'I will be closed between March 18 & July 18 while I study web development'
//   const secondMessage = 'Closed until July 18 while I study web development'

//   if (todaysDate > displayDate && todaysDate < endDate) {
//     urgentBanner.innerHTML = `<h5>${secondMessage}</h5>`
//   } else if (todaysDate > firstDisplayDate && todaysDate < endDate) {
//     urgentBanner.innerHTML = `<h5>${firstMessage}</h5>`
//   }
// }

// changeUrgentBanner()

const minimizeNavBar = function () {
  topNav.classList.remove('responsive')
  headerLogo.classList.remove('responsive')
  nav.classList.remove('responsive')
  nav.style.transition = 'all 0.9s ease-out'
  navLinks.style.transition = 'transform 0.9s ease-out, visibility 0.9s'
}

const expandNavBar = function () {
  topNav.classList.add('responsive')
  headerLogo.classList.add('responsive')
  nav.classList.add('responsive')
  nav.style.transition = 'all 1s ease'
  navLinks.style.transition = 'transform 1s ease, visibility 1s'
}

function navBarAction() {
  if (topNav.className === 'nav__links') {
    expandNavBar()
  } else {
    minimizeNavBar()
  }
}

window.addEventListener('resize', function (e) {
  const viewWidth = e.currentTarget.innerWidth
  if (viewWidth > 950) {
    nav.style.height = 'auto'
    nav.style.transition = 'none'
    navLinks.style.transition = 'none'
  }
  if (viewWidth <= 950) {
    minimizeNavBar()
  }
})

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this
      }
    })
  }
}
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

// Cookies
const getCookie = (name) => {
  const value = ' ' + document.cookie
  // console.log("value", `==${value}==`);
  const parts = value.split(' ' + name + '=')
  return parts.length < 2 ? undefined : parts.pop().split(';').shift()
}

const setCookie = function (name, value, expiryDays, domain, path, secure) {
  const exdate = new Date()
  exdate.setHours(
    exdate.getHours() + (typeof expiryDays !== 'number' ? 365 : expiryDays) * 24
  )
  document.cookie =
    name +
    '=' +
    value +
    ';expires=' +
    exdate.toUTCString() +
    ';path=' +
    (path || '/') +
    (domain ? ';domain=' + domain : '') +
    (secure ? ';secure' : '')
}

;(() => {
  $cookiesBannerButton.addEventListener('click', () => {
    $cookiesBanner.remove()
  })
})()

const cookieName = 'cookiesBanner'
const hasCookie = getCookie(cookieName)

if (!hasCookie) {
  $cookiesBanner.classList.remove('hidden')
}

$cookiesBannerButton.addEventListener('click', () => {
  setCookie(cookieName, 'closed')
  $cookiesBanner.remove()
})

//Google Tag manging for cliniko
var dataLayer = window.dataLayer || (window.dataLayer = [])

window.addEventListener('message', receiveMessage)

function createDataLayer() {}

function receiveMessage(e) {
  if (typeof e.data !== 'string') return

  if (e.data.search('cliniko-bookings-page:schedule') > -1) {
    dataLayer.push({
      event: 'clinikoBookingSchedule',
    })
  }

  if (e.data.search('cliniko-bookings-page:patient') > -1) {
    dataLayer.push({
      event: 'clinikoBookingDetails',
    })
  }

  if (e.data.search('cliniko-bookings-page:confirmed') > -1) {
    dataLayer.push({
      event: 'clinikoBookingCompleted',
    })
  }
}

let prevScrollY
let newScrollY

window.onscroll = function () {
  prevScrollY = newScrollY
  newScrollY = window.scrollY
  // checkSticky()

  if (!stickyBookNow) return

  if (colorCounter < 125) {
    changeColors(colorOne)
    // console.log("color One " + colorOne);
    changeColors(colorTwo)
    // console.log("color Two " + colorTwo);
    changeColors(colorThree)
    // console.log("color Three " + colorThree);
  }
  if (colorCounter >= 125) {
    reverseChangeColors(colorOne)
    // console.log("color One " + colorOne);
    reverseChangeColors(colorTwo)
    // console.log("color Two " + colorTwo);
    reverseChangeColors(colorThree)
    // console.log("color Three " + colorThree);
  }

  colorCounter++
  if (colorCounter === 250) colorCounter = 0
  // console.log(colorCounter);

  changePercentages(percentage)
  // console.log(percentage);
  stickyBookNow.style.backgroundImage = `linear-gradient(60deg,rgb(${colorOne[0]},${colorOne[1]} , ${colorOne[2]}) ${percentage[0]}%,rgb(${colorTwo[0]},${colorTwo[1]} , ${colorTwo[2]}) ${percentage[1]}%,rgb(${colorThree[0]},${colorThree[1]} , ${colorThree[2]}) ${percentage[2]}%)`
  if (bookOnlineBottom)
    bookOnlineBottom.style.backgroundImage = `linear-gradient(60deg,rgb(${colorOne[0]},${colorOne[1]} , ${colorOne[2]}) ${percentage[0]}%,rgb(${colorTwo[0]},${colorTwo[1]} , ${colorTwo[2]}) ${percentage[1]}%,rgb(${colorThree[0]},${colorThree[1]} , ${colorThree[2]}) ${percentage[2]}%)`
  if (headerBookNow)
    headerBookNow.style.backgroundImage = `linear-gradient(60deg,rgb(${colorOne[0]},${colorOne[1]} , ${colorOne[2]}) ${percentage[0]}%,rgb(${colorTwo[0]},${colorTwo[1]} , ${colorTwo[2]}) ${percentage[1]}%,rgb(${colorThree[0]},${colorThree[1]} , ${colorThree[2]}) ${percentage[2]}%)`
}

let colorOne = [2, 41, 238]
let colorTwo = [20, 168, 173]
let colorThree = [4, 154, 27]
let percentage = [-15, 50, 120]
let percentageCounter = 0
let colorCounter = 0

const changePercentages = function (percentages) {
  if (percentageCounter < 40) {
    increasePercentages(percentages)
  }
  if (percentageCounter > 40) {
    decreasePercentages(percentages)
  }
  percentageCounter++
  if (percentageCounter === 80) percentageCounter = 0
}

const increasePercentages = function (percentages) {
  percentages[0] += 1
  percentages[1] += 0.5
  percentages[2] += 1
}
const decreasePercentages = function (percentages) {
  percentages[0] -= 1
  percentages[1] -= 0.5
  percentages[2] -= 1
}

const reverseChangeColors = function (color) {
  if (color[0] > 2 && color[1] === 2) {
    color[0]--
  }
  if (color[0] < 21) {
    color[1]++
  }
}

const changeColors = function (color) {
  if (color[1] > 2) color[1]--
  else if (color[0] < 254) color[0]++
  else if (color[2] > 2) color[2]--
  else if (color[1] < 254) {
    color[1]++
  } else if (color[0] > 2) {
    color[0]--
  } else if (color[2] < 254) color[2]++
}

// const checkSticky = function () {
//   // console.log(newScrollY)
//   // if (newScrollY > 0) {
//   // header.classList.add('sticky')
//   // headerLogo.classList.add('smaller-width')
//   // headerBookNow.classList.add('smaller-button')
//   // nav.classList.add('relative')
//   // }
//   // if (newScrollY === 0) {
//   //   header.classList.remove('sticky')
//   //   headerLogo.classList.remove('smaller-width')
//   //   headerBookNow.classList.remove('smaller-button')
//   // }
//   // if (newScrollY === 0) nav.classList.remove('relative')
// }
