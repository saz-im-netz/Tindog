import { dogs } from "/data.js";
import { Dog } from "/Dog.js";


let currentDog = getNewDog();

document.addEventListener("click", function(e){
    
    if(e.target.id === 'dislike-btn' || e.target.id === 'dislike-img'){
        
        handleSwipeBtnClick('.disliked', 'reject');
        
    }
    else if(e.target.id === 'like-btn' || e.target.id === 'like-img'){
        
        handleSwipeBtnClick('.liked', 'accept');
        
    }
    else if( e.target.id === 'menu-icon'){
        handleMenuBtnClick();
    }
    else if(e.target.id === 'close-btn'){
        if( !document.querySelector('.liked-modal').classList.contains('hidden') ){
            document.querySelector('.liked-modal').classList.add('hidden');
        }
    }
    else if(e.target.id === 'restart-btn'){
        restart();
    }
     
})


function handleSwipeBtnClick(logoReference, btnReference){
    document.querySelector(logoReference).classList.remove('hidden');
    document.querySelector('.'+btnReference).classList.add(`${btnReference}-background`);
    dogs.map( dog => {
        if(currentDog.name === dog.name){
            dog.hasBeenSwiped = true;
        } 
    })
            
    if(logoReference === '.liked'){
        dogs.map( dog => {
            if(currentDog.name === dog.name){
                dog.hasBeenLiked = true;
            } 
        })
    }
    
    setTimeout( () => {
        document.querySelector(logoReference).classList.add('hidden');
        document.querySelector('.'+btnReference).classList.remove(`${btnReference}-background`);
        renderNewDog();
    }, 500)
    
}

function handleMenuBtnClick(){
    document.querySelector('.liked-modal').classList.remove('hidden');
    renderLikedDogs();
}

function renderNewDog(){
    currentDog = getNewDog();
    if(Object.keys(currentDog).length === 0){
        document.querySelector('.profile').innerHTML = `
            <div class="no-more-dogs">
                no more dogs to swipe ...
            </div>
            <button class="selection" id="menu-icon"> See your selection </button>
            
            <div class="restart-container">
                Not satisfied with your selection?               
            </div>
            <button id="restart-btn" class="restart-btn">
                Start again
            </button>
            
        `; 
        document.querySelector('.btn-container').innerHTML = "";
        document.querySelector('.menu').innerHTML = "";
    }
    else{
       render();
    }
}

function restart(){
    dogs.forEach( dog => {
        dog.hasBeenLiked = false;
        dog.hasBeenSwiped = false;
    })
    currentDog = getNewDog();
    document.querySelector('.btn-container').innerHTML = `
        <div id="dislike-btn" class="swipe-btn reject">
            <img id="dislike-img" src="images/icon-cross.png">
        </div>
        <div id="like-btn" class="swipe-btn accept">
            <img id="like-img" src="images/icon-heart.png">
        </div>
    `;
    document.querySelector('.menu').innerHTML = `<i id="menu-icon" class="fa-solid fa-bars"></i>`;
    render();
}

function renderLikedDogs(){
    const likedDogsArray = dogs.filter( dog => dog.hasBeenLiked === true );
    const allLikedDogsHtml = likedDogsArray.map( dog => getLikedDogHtml(dog)).join('');
    document.querySelector('.liked-dogs-list').innerHTML = allLikedDogsHtml;
}

function getLikedDogHtml(dog){
    const { name, avatar, age } = dog;
    return `
        <div class="liked-dog-item">
            <img class="profile-pic-liked" src="${avatar}">
            <div>
                <h2>${name}</h2>
                <h2>${age}</h2>
            </div>
        </div>
    `
}

function getNewDog(){
    const newDogsArray = dogs.filter( dog => dog.hasBeenSwiped === false );
    const nextDogData = newDogsArray[Math.floor(Math.random()*newDogsArray.length)];
    return nextDogData ? new Dog(nextDogData) : {};
}

function render(){
    document.querySelector('.profile').innerHTML = currentDog.getDogHtml();
}

render();