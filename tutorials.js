
let inputBox = document.getElementById('inputDiv')
let urlArray = []
let urlList = document.getElementById('myLinks')
let saveTabBtn = document.getElementById('saveTabBtn')
let saveUrlBtn = document.getElementById('saveUrlBtn')
let deleteBtn = document.getElementById('deletBtn')


const createUrlList = (myArray) => {
    let myList = ""
    for(let i = 0; i < myArray.length; i++) {
        myList += `<li><a target=_blank href=${myArray[i]}>${myArray[i]}</a></li>`
    }
    urlList.innerHTML = myList
    localStorage.setItem('myUrl', JSON.stringify(myArray))
    inputBox.value = ""
}

let storedData = JSON.parse(localStorage.getItem('myUrl'));
if(storedData) {
    urlArray = storedData
    createUrlList(urlArray)
} 

saveUrlBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if(inputBox.value){
            urlArray.push(inputBox.value)
            createUrlList(urlArray)   
        } else {
        }
})

saveTabBtn.addEventListener('click', () => {
    chrome.tabs.query(
        {active: true, currentWindow: true}, (tabs) => {
    urlArray.push(tabs[0].url)
    localStorage.setItem('myUrl', JSON.stringify(urlArray))
    createUrlList(urlArray)
})
})

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear()
    urlArray = []
    createUrlList(urlArray)
})

