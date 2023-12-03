const API = "https://fsa-puppy-bowl.herokuapp.com/api/2310"
const allDogs = document.querySelector("#allDogs")
const singleDog = document.querySelector("#singleDog")
let puppies = []

async function getAllpups() {
    const response = await fetch(API + "/players")
    const data = await response.json()
    puppies = data.data.players
    console.log(puppies)
    render()
}

async function render() {
    const dogList = puppies.map((pup) => {
        return `<a href=#${pup.name} class="pupItem"> ${pup.name} </a>`
    })

    const name = window.location.hash.slice(1)
    const currentPup = puppies.find((pup) => {
        return pup.name === name
    })

    allDogs.innerHTML = currentPup ? "" : "<h1> All of the Players<h1>" + `<div class="pupContainer"> 
    ${dogList.join("")} </div>`

    if(currentPup) {
        console.log(currentPup)
        allDogs.innerHTML = ""
        singleDog.innerHTML = `
                <h2> Selected Puppy </h2>
                <h3> ${currentPup.name} </h3>
                <img src="${currentPup.imageUrl}" />
                <div><a href="#">Back to all Puppies</a></div>
            `
    } else {
        singleDog.innerHTML = ""
        allDogs.innerHTML = `<div class="pupContainer"> ${dogList.join("")}</div>`
    }
}

window.addEventListener("hashchange", () => {
    render()
})

getAllpups()
