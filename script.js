
const BASE_URL = `https://2024-03-06.currency-api.pages.dev/v1/currencies`;

const userInput = document.querySelector(".userInput input");
const convertBtn = document.querySelector("#convert");
const outputPara = document.querySelector("#output");
const dropDowns = document.querySelectorAll(".currency-div select");
const fromCurrency = document.querySelector("#from");
const toCurrency = document.querySelector("#to");


// Adding the country currency in the option of select menu
for (let select of dropDowns) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;

        if (select.id === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        }
        else if(select.id === "to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }
        
        select.append(newOption);
    }

    select.addEventListener('change', (element) => {
        updateFlag(element.target);
    })
}


// Function for updating the flag.
function updateFlag(element){
    
    let img = element.parentElement.lastElementChild;
    img.src = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`;

}


async function updateExchangeRate(){
    let userInputValue = userInput.value;

    if (userInputValue === "" || userInputValue <= 0) {
        userInputValue = 1;
        userInput.value = "1";
    }

    response = await fetch(`${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`);
    
    data = await response.json();
    
    rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    
    totalRate = rate * userInputValue;

    outputPara.innerText = `${userInputValue} ${fromCurrency.value} = ${totalRate.toFixed(3)} ${toCurrency.value}`;
}


convertBtn.addEventListener('click', () => {
    updateExchangeRate();
})

window.addEventListener('load', () => {
    updateExchangeRate();
})