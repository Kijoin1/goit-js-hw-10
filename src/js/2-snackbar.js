import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form')
const input = document.querySelector('[name="delay"]')
const inputFulfilled = document.querySelector('[value="fulfilled"]')
const inputRejected = document.querySelector('[value="rejected"]')


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    let delay = input.value
    console.log(delay)
    let value;

    if (inputFulfilled.checked) {
        value = true
    }
    if (inputRejected.checked) {
        value = false
    }

function promiseGenerator(delay, value) {
    const promise = createPromise(delay, value)
    promise.then(() => fulfilled(delay)).catch(() => rejected(delay))
}

promiseGenerator(delay, value)
console.log(value)
})


function fulfilled(delay) {
return iziToast.show({
    color: 'blue',
    title: `✅ Fulfilled promise in ${delay}ms`,
    image: '/src/img/water_cat.jpg',
    titleColor: 'black',
});
}

function rejected(delay){
return iziToast.show({
    color: 'red',
    title: `❌ Rejected promise in ${delay}ms`,
    image: '/src/img/fire_cat.jpg',
    titleColor: 'black',
});
}

function createPromise(delay, value) {
    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
            if (value) resolve();
            else reject();
        }, delay)
    });
    return promise;
}