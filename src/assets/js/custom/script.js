// Links
let pageLinks = document.getElementsByClassName('page-link');
let pageLinkWrappers = document.getElementsByClassName('page-link-wrapper');

// Home parts
let homeLinkParts = document.getElementsByClassName('home-link-anim');
let homeTitleParts = document.getElementsByClassName('home-title-anim');

// Page parts
let pizzarPageParts = document.getElementsByClassName('pizzar-page-anim');
let enargyPageParts = document.getElementsByClassName('enargy-page-anim');
let socarbanPageParts = document.getElementsByClassName('socarban-page-anim');
let facarPageParts = document.getElementsByClassName('facar-page-anim');

// Initialisation stuff
let currentPage = 'home';
let nextPage = 'home';
let nextPageWrapper = document.getElementById(currentPage);
let lastPageWrapper = document.getElementById(currentPage);
let modal = document.getElementById('modal');
let video = document.getElementById('video');

init()

function init(){
  setupLinks();
}

/**
 * Hides the page elements within the current page
 * @param {String} page   the page to hide
 * @returns {void}
 */
function hidePage(page) {

  hidePageWrapper();

  switch (page) {
    case 'home':
      hideSection( homeTitleParts );
      hideSection( homeLinkParts );
      break;
    case 'pizzar':
      hideSection( pizzarPageParts );
      break;
    case 'enargy':
      hideSection( enargyPageParts );
      break;
    case 'socarban':
      hideSection( socarbanPageParts );
      break;
    case 'facar':
      hideSection( facarPageParts );
      break;
    default:
  }

  // Prevent the link doing what it does
  if( window.event ){
    window.event.preventDefault();
  }
}

/**
 * Shows the page elements within the current page
 * @param {String} page   the page to hide
 * @returns {void}
 */
function showPage(page) {

  showPageWrapper();

  switch (page) {
    case 'home':
      revealSection( homeTitleParts );
      revealSection( homeLinkParts );
      break;
    case 'pizzar':
      revealSection( pizzarPageParts );
      video.src = "https://www.youtube.com/embed/w6ffL3PJ2Og"
      break;
    case 'enargy':
      revealSection( enargyPageParts );
      video.src = "https://www.youtube.com/embed/wZ4t0nwmOIQ"
      break;
    case 'socarban':
      revealSection( socarbanPageParts );
      video.src = "https://www.youtube.com/embed/TgWibgp2NwM"
      break;
    case 'facar':
      revealSection( facarPageParts );
      video.src = "https://www.youtube.com/embed/JDaLg7G8rH0"
      break;
    default:

  }

  // Prevent the link doing what it does
  if( window.event ){
    window.event.preventDefault();
  }
}


/**
 * Hides the page wrapper within the current page
 * @returns {void}
 */
function hidePageWrapper() {
  lastPageWrapper.classList.add('anim--fadeOut', 'anim--delay-14');
  lastPageWrapper.classList.remove('anim--fadeIn');

  window.setTimeout( function() {
    lastPageWrapper.classList.add('page-hidden');
  }, 2000);
}

/**
 * Shows the page wrapper within the current page
 * @returns {void}
 */
function showPageWrapper() {
  nextPageWrapper.classList.remove('page-hidden', 'anim--fadeOut', 'anim--delay-14');
  nextPageWrapper.classList.add('anim--fadeIn');
}


/**
 * Adds the animation and delay classes to reveal
 * page elements consecutively
 * @param {Array} parts   the parts to reveal
 * @returns {void}
 */
function revealSection( parts ){
  let length = parts.length
  for(let i = 0; i < length; i++) {
    let part = parts[i];
    part.classList.add('anim--fadeIn', 'anim--delay-' + (i+1) );
    part.classList.remove('anim--fadeOut', 'anim--delay-' + (length-i) );

    if( part.classList.contains( 'anim--fadeOutSlowly' ) ) {
      part.classList.remove('anim--fadeOutSlowly');
    }
    if( part.classList.contains( 'anim--fadeOutMove' ) ) {
      part.classList.remove('anim--fadeOutMove');
    }
  }
}


/**
 * Adds the animation and delay classes to remove
 * page elements consecutively backwards
 * @param {Array} parts   the parts to hide
 * @returns {void}
 */
function hideSection( parts ){
  let length = parts.length

  for(let i = 0; i < length; i++) {
    let part = parts[i];

    console.log(part);
    if( part.classList.contains( 'js-' + nextPage ) ){
      if( part.classList.contains('arrow') ) {
        console.log('dfgdfgfdg');
        part.classList.remove('anim--fadeIn', 'anim--delay-' + (i+1) );
        part.classList.add('anim--fadeOutMove');
      } else {
        console.log('ggg');
        part.classList.remove('anim--fadeIn', 'anim--delay-' + (i+1) );
        part.classList.add('anim--fadeOutSlowly', 'anim--delay-' + (length-i) );
      }
    } else {
      part.classList.remove('anim--fadeIn', 'anim--delay-' + (i+1) );
      part.classList.add('anim--fadeOut', 'anim--delay-' + (length-i) );
    }
  }
}

/**
 * Home link
 * @returns {void}
 */
function home() {

  nextPage = 'home'
  switchPage();
  // Prevent the link doing what it does
  window.event.preventDefault();
}

/**
 * Handles the switching of pages
 * @param {String} nextPage   the page to switch to
 * @returns {void}
 */
function switchPage() {

  if(nextPage !== currentPage){
    lastPageWrapper = document.getElementById(currentPage);
    nextPageWrapper = document.getElementById(nextPage);

    // hide the content
    hidePage( currentPage );

    // Show the correct content
    window.setTimeout( function() {
      showPage( nextPage );
    }, 2000);

    // Update current page var
    currentPage = nextPage;
  }
}

function openVideo(video){
  modal.classList.remove('modal-hidden');
  modal.classList.add('anim--fadeIn', 'modal-show');
}

function closeVideo(video){
  modal.classList.add('modal-hidden');
  modal.classList.remove('anim--fadeIn', 'modal-show');
}

/**
 * Sets up the event listeners on the links
 * @returns {void}
 */
function setupLinks() {
  for(let i = 0; i < pageLinks.length; i++) {
    let pageLink = pageLinks[i];

    pageLink.addEventListener("click", function() {

      // Prevent the link doing what it does
      window.event.preventDefault();

      // Get the href so we can show the correct details
      nextPage = pageLink.getAttribute('href');

      switchPage();

      // // Prevent the link doing what it does
      // window.event.preventDefault();
    })
  }
}
