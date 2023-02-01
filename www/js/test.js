document.addEventListener("deviceready", checkPermissions, false);

function checkPermissions(){
  window.ContactsX.hasPermission(loadContacts, handleError);
}

// load contacts from phone
function loadContacts() {
  contactlist.innerHTML = ""
  window.ContactsX.find( showContacts, handleError, {
    fields: {
      phoneNumbers: true
    },
    baseCountryCode : 'GB'
  });
}

// show contacts list
function showContacts(contacts){
  for(let i=0; i<contacts.length; i++){
    console.log(contacts[i])
    contactlist.append(createLi(contacts[i]))
    $(contactlist).listview("refresh")
  }
}

// error handling
function handleError(error){
  console.log(error)
}

// handle left swipe ( deletion )
function handleLeftSwipe(id){
  window.ContactsX.delete(id,
    () => {
      contactlist.innerHTML = ""
      loadContacts()
     },
    handleError
    );
}

// handle right swipe ( edition )
function handleRightSwipe(contact){
  identity.value = contact.id
  firstName.value = contact.firstName
  familyName.value = contact.familyName
  phone.value = contact.phoneNumbers[0].value
  location.hash = "#new"  
}

// handle right swipe ( edition )
function handleClick(contact){
  let data = document.getElementById("data")
  data.setAttribute("data-donnee", JSON.stringify(contact))
  refreshData()
  location.hash = "#details"
}

// handle adding a contact
function handleCreate(){
  let id = identity.value
  let data = {
    firstName: firstName.value,
    familyName: familyName.value,
    phoneNumbers: [{
      type: "mobile",
      value: phone.value 
    }]
  }
  if(id) data['id'] = id

  window.ContactsX.save(
    data,
    loadContacts,
    handleError
  );
  createForm.reset()
  if(id) location.hash = "home"
}

// refresh the detail data
function refreshData(){
  let data = document.getElementById("data")
  let donnee = JSON.parse(data.getAttribute("data-donnee"))
  document.getElementById("prenom").innerHTML = donnee.firstName
  document.getElementById("nom").innerHTML = donnee.familyName
  document.getElementById("telephone").innerHTML = donnee.phoneNumbers[0].value
}

function createLi(contact){
  const element = document.createElement('li')
  element.innerHTML =  `
                <li>
                  <div class="flex justify-between items-center">
                    <div class="flex space-x-3 items-center">
                      <div class="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                        <image src="./images/contact-1.jpeg" class="object-contain"/>
                      </div>
                      <div class="text-xs flex flex-col">
                        <span class="font-semibold">${ contact.firstName } ${ contact.familyName }</span>
                        <span>${ contact.phoneNumbers[0].value }</span>
                      </div>
                    </div>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 01-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 016.126 3.537zM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 010 .75l-1.732 3.001c-.229.396-.76.498-1.067.16A5.231 5.231 0 016.75 12c0-1.362.519-2.603 1.37-3.536zM10.878 17.13c-.447-.097-.623-.608-.394-1.003l1.733-3.003a.75.75 0 01.65-.375h3.465c.457 0 .81.408.672.843a5.252 5.252 0 01-6.126 3.538z" />
                        <path fill-rule="evenodd" d="M21 12.75a.75.75 0 000-1.5h-.783a8.22 8.22 0 00-.237-1.357l.734-.267a.75.75 0 10-.513-1.41l-.735.268a8.24 8.24 0 00-.689-1.191l.6-.504a.75.75 0 10-.964-1.149l-.6.504a8.3 8.3 0 00-1.054-.885l.391-.678a.75.75 0 10-1.299-.75l-.39.677a8.188 8.188 0 00-1.295-.471l.136-.77a.75.75 0 00-1.477-.26l-.136.77a8.364 8.364 0 00-1.377 0l-.136-.77a.75.75 0 10-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 00-1.3.75l.392.678a8.29 8.29 0 00-1.054.885l-.6-.504a.75.75 0 00-.965 1.149l.6.503a8.243 8.243 0 00-.689 1.192L3.8 8.217a.75.75 0 10-.513 1.41l.735.267a8.222 8.222 0 00-.238 1.355h-.783a.75.75 0 000 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 10.513 1.41l.735-.268c.197.417.428.816.69 1.192l-.6.504a.75.75 0 10.963 1.149l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 101.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.771a.75.75 0 101.477.26l.137-.772a8.376 8.376 0 001.376 0l.136.773a.75.75 0 101.477-.26l-.136-.772a8.19 8.19 0 001.294-.47l.391.677a.75.75 0 101.3-.75l-.393-.679a8.282 8.282 0 001.054-.885l.601.504a.75.75 0 10.964-1.15l-.6-.503a8.24 8.24 0 00.69-1.191l.735.268a.75.75 0 10.512-1.41l-.734-.268c.115-.438.195-.892.237-1.356h.784zm-2.657-3.06a6.744 6.744 0 00-1.19-2.053 6.784 6.784 0 00-1.82-1.51A6.704 6.704 0 0012 5.25a6.801 6.801 0 00-1.225.111 6.7 6.7 0 00-2.15.792 6.784 6.784 0 00-2.952 3.489.758.758 0 01-.036.099A6.74 6.74 0 005.251 12a6.739 6.739 0 003.355 5.835l.01.006.01.005a6.706 6.706 0 002.203.802c.007 0 .014.002.021.004a6.792 6.792 0 002.301 0l.022-.004a6.707 6.707 0 002.228-.816 6.781 6.781 0 001.762-1.483l.009-.01.009-.012a6.744 6.744 0 001.18-2.064c.253-.708.39-1.47.39-2.264a6.74 6.74 0 00-.408-2.308z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </li>
            `
  $(element).on('swipeleft', () => handleLeftSwipe(contact.id))
  $(element).on('swiperight', () => handleRightSwipe(contact))
  element.addEventListener('click', () => handleClick(contact))
  return element
}

function edit_contact(){
  let data = document.getElementById("data")
  let donnee = JSON.parse(data.getAttribute("data-donnee"))
  createForm.reset()
  handleRightSwipe(donnee)
}

function delete_contact(){
  let data = document.getElementById("data")
  let donnee = JSON.parse(data.getAttribute("data-donnee"))
  handleLeftSwipe(donnee.id)
  loadContacts()
  location.hash = "#home"
}

