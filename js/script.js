/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page){
   let startIndex = (page * 9) - 9
   let endIndex = page * 9
   const student_list = document.getElementsByClassName('student-list')[0]

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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function paginationButtons(list) {
   let numberOfPages = Math.ceil(list.length / 9)

   const link_list = document.querySelector('.link-list')
   link_list.innerHTML = ''

   for(let i = 1; i <= numberOfPages; i++) {
      link_list.insertAdjacentHTML('beforeend', `
         <li>
            <button type='button'>${i}</button>
         </li>
      `)
   }

   // Assign the first <li> the class .active
   const first_page = link_list.firstElementChild.firstElementChild
   first_page.className = 'active'

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
        showPage(data, e.target.textContent)
      }
   })
}


// Call functions

showPage(data, 1)

paginationButtons(data)