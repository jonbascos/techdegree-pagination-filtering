/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const student_list = document.getElementsByClassName('student-list')[0]
const link_list = document.querySelector('.link-list')

/* 
   Create a search field that when used, it will start filtering out the list to only include contacts that have atleast the letters but in.
*/
function search() {
   const h2 = document.getElementsByTagName('h2')[0] 
   const label = document.createElement('label')
   const input = document.createElement('input')
   const button = document.createElement('button')
   const img = document.createElement('img')
   label.className = 'student-search'
   label.setAttribute('for', 'label')
   h2.insertAdjacentElement('afterend', label)
   input.placeholder = 'Search by name...'
   input.id = 'search'
   label.appendChild(input)
   button.type = 'button'
   label.appendChild(button)
   img.src = 'img/icn-search.svg'
   img.alt = 'Search icon'
   button.appendChild(img)

   // Completes search after clicking on Search button
   button.addEventListener('click', (e) => {
      let searchValue = input.value
      console.log('Value of Search: ', searchValue)
      const results = []
      for(let i = 0; i < data.length; i++) {
         const firstName = data[i].name.first.toUpperCase()
         const lastName = data[i].name.last.toUpperCase()
         if(searchValue.toUpperCase() === firstName || searchValue.toUpperCase() === lastName) {
            results.push(data[i])
         } 
      }
      input.value = ''
      if(results.length > 0) {
         showPage(results, 1)
         addPagination(results)
      } else {
         student_list.innerHTML = ''
         link_list.innerHTML = ''
         student_list.insertAdjacentHTML('beforeend', '<h2>No results found</h2>')
      }
   })

   // Completes search with each key-up
   input.addEventListener('keyup', (e) => {
      let searchValue = (e.target.value).toUpperCase()
      const results = []
      for(let i = 0; i < data.length; i++) {
         let firstName = data[i].name.first.toUpperCase()
         let lastName = data[i].name.last.toUpperCase()
         if(firstName.includes(searchValue) || lastName.includes(searchValue)) {
            results.push(data[i])
         }
         if(results.length > 0) {
            showPage(results, 1)
            addPagination(results)
         }
         // console.log('From within keyup: ', results)
      }
      if(results.length === 0) {
         student_list.innerHTML = ''
         link_list.innerHTML = ''
         student_list.insertAdjacentHTML('beforeend', '<h2>No results found</h2>')
      }
   })
}

// showPage() initially displays all of the students in the list and keeps track of how many pages of 9 there are.
function showPage(list, page){
   let startIndex = (page * 9) - 9
   let endIndex = page * 9

   student_list.innerHTML = ''

   //Loops through the list of students and creates the dynamic content
   for(let i = 0; i < list.length; i++){
      let sourceList = list[i]
      if(i >= startIndex && i < endIndex) {
         student_list.insertAdjacentHTML('beforeend', `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src=${sourceList.picture.thumbnail} alt="Profile Picture">
           <h3>${sourceList.name.first} ${sourceList.name.last}</h3>
           <span class="email">${sourceList.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${sourceList.registered.date}</span>
         </div>
       </li>
         `)
      }
   }
}

// addPagination() creates and adds the correct number of page buttons for pagination
function addPagination(list) {
   let numberOfPages = Math.ceil(list.length / 9)
   // console.log('List length: ', list.length)
   // console.log('Number of pages: ', numberOfPages)

   // const link_list = document.querySelector('.link-list')
   const li = document.createElement('li')
   const button = document.createElement('button')
   button.type = 'button'
   link_list.innerHTML = ''

   // inserts the buttons into the DOM
   for(let i = 1; i <= numberOfPages; i++) {
      link_list.insertAdjacentHTML('beforeend', `
         <li>
            <button type='button'>${i}</button>
         </li>
      `)
   }

   // Assign the first <li> the class .active
   // const first_page = link_list.firstElementChild.firstElementChild
   const first_page_button = link_list.getElementsByTagName('button')[0]
   
   // Checks to make sure the page 1 button is not undefined.
   if(first_page_button != undefined) {
      first_page_button.className = 'active'
   } 
   
   // Waits for click and then changes the class for the button that was clicked
   link_list.addEventListener('click', (e) => {
      
      // Checks to see if a <button> was clicked
      if(e.target.type === 'button') {
         let pages = document.getElementsByTagName('button')
         // If the button is not the current button, set the className to '' to remove styling
         // but add the className 'active' to the clicked button
         for(let i = 0; i < pages.length; i++) {
            if(pages[i].textContent != e.target.textContent) {
                  pages[i].className = ''
                  e.target.className = 'active'
            }  
        }
        showPage(list, e.target.textContent)
      }
   })
}

// Call functions

showPage(data, 1)
search()
addPagination(data)