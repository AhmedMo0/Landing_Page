/**
 * Define Global Variables
 * 
*/

let sections = document.querySelectorAll('section');
let ul = document.querySelector('#navbar__list');
let main = document.querySelector('main');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// TODO: building navbar
function modifyNav(){

    sections = document.querySelectorAll('section');

    
    sections.forEach(element => {


        let a = document.createElement('a');
        a.classList.add('menu__link');
        a.href = "#" + element.getAttribute('id');

        let li = document.createElement('li');
        a.innerHTML = element.getAttribute('data-nav');

        li.appendChild(a);
        ul.appendChild(li);

    });

}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/





// TODO: to show sections in navbar if it's found before adding it dynamically
modifyNav();





// TODO: create an observer to detect any added or removed section

let observer = new MutationObserver(
    function(mutations) {
        mutations.forEach(function(mutation) {
        
            let newN = mutation.addedNodes;
            let removedN = mutation.removedNodes;

            if(newN.length)
            {
                ul.innerHTML = "";
                modifyNav();
            }
            else if(removedN.length)
            {
                ul.innerHTML = "";
                modifyNav();
            }
    
            
            
        });    
    }
);
    
    
// TODO: listening to the main tag to detect any modifications
observer.observe(main, {childList: true} );



/**
 * End Main Functions
 * Begin Events
 * 
*/


// Scroll to section on link be clicked

// TODO: listen to nav links
ul.addEventListener("click", function(e){

    e.preventDefault();
    let sectionId =  e.target.getAttribute('href');
    let targetSection = document.querySelector(sectionId);
    targetSection.scrollIntoView({behavior: "smooth"});

});


// Add class 'active' to section when near top of viewport

// TODO: Set sections and Links as active
function whoIsActive()
{
    sections.forEach(element => {
        
        let rect = element.getBoundingClientRect();
        let top = rect.top;
        let bottom = rect.bottom;
        let boxHeight = element.offsetHeight;
        
        if((top - ul.offsetHeight) < 5 && (bottom - ul.offsetHeight) > 12)
        {
  
            
            let activeLink = ul.querySelector(`[href = '#${element.id}']`);
            activeLink.classList.add("active-link");

            element.classList.add("active-class");
            
        }
        else
        {
            let activeLink = ul.querySelector(`[href = '#${element.id}']`);
            activeLink.classList.remove("active-link");

            element.classList.remove("active-class");
        }

    });
}



// listener of viewport scroll

document.addEventListener("scroll", whoIsActive);


// hide navbar if scrolling is stopped
// and  scroll to button

let scrolling;
let header = document.querySelector('.page__header');

window.addEventListener('scroll', function(){

    window.clearTimeout(scrolling);
    if(header.classList.contains('hide') )
        {
            header.classList.remove('hide');
        }

    scrolling = setTimeout(function(){
        if(window.scrollY)
        {
            header.classList.add("hide");
        }

    }, 1500);


    
    // TODO: show scroll up button

    let arr = document.querySelector(".arrow");

    if(window.scrollY >= document.body.offsetHeight -500 )
    {
        arr.style.visibility = "visible";
        
        arr.addEventListener('click', function(){

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        console.log('in the bottom');
    }
    else
    {
        arr.style.visibility= "hidden";
    }
}, false);


