export class Dog{
    constructor(data){
        Object.assign(this, data);
    }

    getDogHtml(){
        const { name, avatar, age, bio } = this;
        return `
            <img class="profile-pic" src="${avatar}">
            <div class="profile-text">
                <h1>${name}, ${age}</h1>
                <p>${bio}</p>
            </div>
        `
    }
   
}
