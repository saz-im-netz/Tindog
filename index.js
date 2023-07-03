import { dogs } from "/data.js";
import { Dog } from "/Dog.js";

let workingBtn = true;

let currentDog = getNewDog();


document.addEventListener("click", function(e){
    
    if(e.target.id === 'dislike-btn' || e.target.id === 'dislike-img'){
        if(workingBtn){
            handleSwipeBtnClick('.disliked', 'reject');
        }
    }
    else if(e.target.id === 'like-btn' || e.target.id === 'like-img'){
        if(workingBtn){
            handleSwipeBtnClick('.liked', 'accept');
        }
    }
    else if( e.target.id === 'menu-icon'){
        handleMenuBtnClick();
    }
    else if(e.target.id === 'close-btn'){
        if( !document.querySelector('.liked-modal').classList.contains('hidden') ){
            document.querySelector('.liked-modal').classList.add('hidden')
        }
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
    }, 1500)
    
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
        `; 
        workingBtn = false;
        document.getElementById('like-btn').classList.remove('accept');
        document.getElementById('dislike-btn').classList.remove('reject');
    }
    else{
       render();
    }
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
    const newDogsArray = dogs.filter( (dog) => dog.hasBeenSwiped === false );
    const nextDogData = newDogsArray[Math.floor(Math.random()*newDogsArray.length)];
    return nextDogData ? new Dog(nextDogData) : {};
}

function render(){
    document.querySelector('.profile').innerHTML = currentDog.getDogHtml();
}

render();