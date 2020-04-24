// Load DOM
document.addEventListener('DOMContentLoaded', (event) => {

  save.disabled = true
  deleteBtn.disabled = true
  load.disabled = true

  grabStocks();
  createTableHeader(stockTable)

  reset.addEventListener("click", (event) => {
    Filter.resetFilter()
    renderTableRows(stocks)
    let filters = document.getElementById("load-filter")
    filters.value = "none"
  })

  for (let option of filterOptions) {
    option.addEventListener("change", () => {
      renderTableRows(Stock.filterStocks(Filter.filterParams()))
    })
  }

  logInOrSignUp.addEventListener("click", () => {
    User.createOrAccessUser();
  })

  logOut.addEventListener("click", () => {
    User.logOut();
  })

  save.addEventListener("click", () => {
    Filter.newfilter(currentUser.id);
  })

  load.addEventListener("click", () => {
    let desiredFilter = document.getElementById("load-filter")
    Filter.loadFilter(desiredFilter.selectedOptions[0].id)
  })

  deleteBtn.addEventListener('click', () => {
    Filter.deleteFilter();
  })






});



let stocks = []
let currentUser
let div = document.getElementById('tickers');
let stockTable = document.getElementById("tickers");
let filter = document.getElementById("filter");


const filterOptions = document.getElementsByClassName("filter-option");
const logInOrSignUp = document.getElementById("log-in-or-sign-up");
const logOut = document.getElementById("log-out");

const reset = document.getElementById("reset");
const save = document.getElementById("save");
const load = document.getElementById("load");
const deleteBtn = document.getElementById("delete");



// back.addEventListener('click', () => {

// })



// create table header
function createTableHeader(table) {
  let headers = ["Ticker", "Sector", "Market Cap", "Price", "Volume", "Average Volume"]
  let thead = table.createTHead();
  let row = thead.insertRow();
  let th = document.createElement("th");
  row.appendChild(th);
  th.appendChild(document.createTextNode("Result"))
  for (let header of headers) {
    let th = document.createElement("th");
    th.setAttribute("id", header.replace(/\s/g, ''))
    let text = document.createTextNode(header);
    th.appendChild(text);
    row.appendChild(th);
  }
}
// render table rows
function renderTableRows(stocks) {


  let tbody

  if (!!(document.querySelector("#tickers > tbody"))) {
    oldTbody = document.querySelector("#tickers > tbody")
    tbody = document.createElement("tbody")
    oldTbody.parentNode.replaceChild(tbody, oldTbody)
  } else {
    tbody = document.createElement('tbody');
    // let tfooter = table.createTFoot()
    stockTable.appendChild(tbody);
  }


  for (let i = 0; i < stocks.length; i++) {
    let j = Math.floor(i / 10) + 1

    let stock = (({ symbol, sector, market_cap, last_price, vol, avg_vol }) =>
      ({ symbol, sector, market_cap, last_price, vol, avg_vol }))(stocks[i])
    let row = tbody.insertRow();
    row.setAttribute("class", `page${j}`)
    let cell = row.insertCell();
    let text = document.createTextNode(i + 1);
    cell.appendChild(text);
    for (key in stock) {
      let cell = row.insertCell();
      let text = document.createTextNode(stock[key]);
      cell.appendChild(text);
    }
  }
  let results = document.querySelector("#results")
  results.innerHTML = `${document.querySelectorAll("#tickers > tbody > tr").length} Results`
  let backBtn
  let nextBtn
  let page = 1
  let pages = Math.ceil(document.querySelectorAll("#tickers > tbody > tr").length / 10)




  if (!(document.getElementById('back')) && !(document.getElementById("next"))) {
    let div = document.createElement('div')
    div.setAttribute("id", "scroll-pages")
    backBtn = document.createElement("button")
    backBtn.setAttribute("id", "back")
    backBtn.innerText = "Last Page"
    document.querySelector("#ticker-section").appendChild(div)
    div.appendChild(backBtn)
    nextBtn = document.createElement("button")
    nextBtn.setAttribute("id", "next")
    nextBtn.innerText = "Next Page"
    document.querySelector("#ticker-section").appendChild(nextBtn)
    div.appendChild(nextBtn)
  } else {
    backBtn = document.getElementById('back')
    nextBtn = document.getElementById("next")

  }

  backBtn.disabled = true
  nextBtn.disabled = false

  if (pages <= 1) {
    nextBtn.disabled = true
  }


  backBtn.addEventListener('click', () => {
    if (page <= pages) {

      let currentPage = document.querySelectorAll(`.page${page}`)
      for (item of currentPage) {
        item.style.display = "none"
      }

      let backPage = document.querySelectorAll(`.page${page - 1}`)
      for (item of backPage) {
        item.style.display = "table-row"
      }
      page--
    }
    if (page == 1) {
      backBtn.disabled = true
    } else if (page < pages) {
      nextBtn.disabled = false
    }
    console.log(`${page} of ${pages}`)
  })

  nextBtn.addEventListener('click', () => {
    if (page < pages) {
      let currentPage = document.querySelectorAll(`.page${page}`)
      for (item of currentPage) {
        item.style.display = "none"
      }

      let nextPage = document.querySelectorAll(`.page${page + 1}`)
      for (item of nextPage) {
        item.style.display = "table-row"
      }
      page++
    }
    if (page == pages) {
      nextBtn.disabled = true
    } else if (page > 1) {
      backBtn.disabled = false
    }
    console.log(`${page} of ${pages}`)
  })

}
// inital fetch to get stocks
function grabStocks() {
  fetch('http://localhost:3000/stocks')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        let args = []
        for (key in data.data[i].attributes) {
          args.push(data.data[i].attributes[key])
        }
        stocks.push(new Stock(...args))
      }
    })
    .then(() => {
      renderTableRows(Stock.allStocks.sort(alphaSymbol))
    });
}


// sorts stock ticker by symbol
function alphaSymbol(a, b) {

  const symbolA = a.symbol;
  const symbolB = b.symbol;

  let comparison = 0;
  if (symbolA > symbolB) {
    comparison = 1;
  } else if (symbolA < symbolB) {
    comparison = -1;
  }
  return comparison;
}


