
// Load DOM
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  grabStocks();
  createTableHeader(stockTable)

  reset.addEventListener("click", () => {
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


let page = 1;
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

// Render by active Filter

function renderTableRows(stocks) {
  let tbody
  if (!!(document.querySelector("#tickers > tbody"))) {
    tbody = document.querySelector("#tickers > tbody")
    let newTbody = document.createElement("tbody")
    tbody.parentNode.replaceChild(newTbody, tbody)
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

    let backBtn
    let nextBtn
    let length
  if (!(document.getElementById("next")) && !(document.getElementById("back"))){
    backBtn = document.createElement("button")
    backBtn.setAttribute("id", "back")
    backBtn.innerText = "Last Page"
    document.querySelector("#tickers").appendChild(backBtn)
    nextBtn = document.createElement("button")
    nextBtn.setAttribute("id", "next")
    nextBtn.innerText = "Next Page"
    document.querySelector("#tickers").appendChild(nextBtn)
    length = document.querySelectorAll("#tickers > tbody > tr").length
    backBtn.disabled = true
    if (Math.ceil(length % 10) == 1) {
      nextBtn.disabled = true
    }
  
    backBtn.addEventListener('click', () => {
      event.stopImmediatePropagation()
      if (page > 1) {
  
        let currentPage = document.querySelectorAll(`.page${page}`)
        for (item of currentPage) {
          item.style.display = "none"
        }
  
        let backPage = document.querySelectorAll(`.page${page - 1}`)
        for (item of backPage) {
          item.style.display = "table-row"
        }
        if (page < Math.ceil(length % 10)) {
          nextBtn.disabled = false
        }
        page--
      }
    })
  
    nextBtn.addEventListener('click', () => {
      event.stopImmediatePropagation()
      if (page < 5) {
        let currentPage = document.querySelectorAll(`.page${page}`)
        for (item of currentPage) {
          item.style.display = "none"
        }
  
        let nextPage = document.querySelectorAll(`.page${page + 1}`)
        for (item of nextPage) {
          item.style.display = "table-row"
        }
        if (page > 1) {
          backBtn.disabled = false
        }
        if (page > 4) {
          nextBtn.disabled = true
        }
        page++
      }
    })
  }


}


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




class Stock {
  constructor(symbol, market_cap, sector, last_price, fiftytwo_high, fiftytwo_low,
    vol, avg_vol, rel_vol, insider_own, inst_own) {
    this.symbol = symbol;
    this.market_cap = market_cap;
    this.sector = sector;
    this.last_price = last_price;
    this.fiftytwo_high = fiftytwo_high;
    this.fiftytwo_low = fiftytwo_low;
    this.vol = vol;
    this.avg_vol = avg_vol;
    this.rel_vol = rel_vol;
    this.insider_own = insider_own;
    this.inst_own = inst_own;
  }

  static get allStocks() {
    return stocks
  }

  static filterStocks(filterParams) {
    let filter = filterParams
    let filteredStocks = stocks
    switch (filter.price) {
      case "any":
        break;

      case "sub1":
        filteredStocks = filteredStocks.filter(stock => stock.last_price < 1)
        break;

      case "sub5":
        filteredStocks = filteredStocks.filter(stock => stock.last_price < 5)
        break;

      case "sub10":
        filteredStocks = filteredStocks.filter(stock => stock.last_price < 10)
        break;

      case "sub20":
        filteredStocks = filteredStocks.filter(stock => stock.last_price < 20)
        break;

      case "sub50":
        filteredStocks = filteredStocks.filter(stock => stock.last_price < 50)
        break;

      case "over1":
        filteredStocks = filteredStocks.filter(stock => stock.last_price > 1)
        break;

      case "over5":
        filteredStocks = filteredStocks.filter(stock => stock.last_price > 5)
        break;

      case "over10":
        filteredStocks = filteredStocks.filter(stock => stock.last_price > 10)
        break;

      case "over20":
        filteredStocks = filteredStocks.filter(stock => stock.last_price > 20)
        break;

      case "over50":
        filteredStocks = filteredStocks.filter(stock => stock.last_price > 50)
        break;

      case "1-to-5":
        filteredStocks = filteredStocks.filter(stock => stock.last_price >= 1 && stock.last_price < 5)
        break;

      case "5-to-10":
        filteredStocks = filteredStocks.filter(stock => stock.last_price >= 5 && stock.last_price < 10)
        break;

      case "10-to-20":
        filteredStocks = filteredStocks.filter(stock => stock.last_price >= 10 && stock.last_price < 20)
        break;

      case "20-to-50":
        filteredStocks = filteredStocks.filter(stock => stock.last_price >= 20 && stock.last_price < 50)
        break;

      case "50-to-100":
        filteredStocks = filteredStocks.filter(stock => stock.last_price >= 50 && stock.last_price < 100)
        break;

    }

    switch (filter.volume) {
      case "any":
        break;

      case "sub100k":
        filteredStocks = filteredStocks.filter(stock => stock.vol < 100000)
        break;

      case "sub500k":
        filteredStocks = filteredStocks.filter(stock => stock.vol < 500000)
        break;

      case "sub1m":
        filteredStocks = filteredStocks.filter(stock => stock.vol < 1000000)
        break;

      case "over100k":
        filteredStocks = filteredStocks.filter(stock => stock.vol > 100000)
        break;

      case "over500k":
        filteredStocks = filteredStocks.filter(stock => stock.vol > 500000)
        break;

      case "over1m":
        filteredStocks = filteredStocks.filter(stock => stock.vol > 1000000)
        break;

      case "over5m":
        filteredStocks = filteredStocks.filter(stock => stock.vol > 5000000)
        break;

      case "over10m":
        filteredStocks = filteredStocks.filter(stock => stock.vol > 10000000)
        break;

      case "over20m":
        filteredStocks = filteredStocks.filter(stock => stock.vol > 20000000)
        break;
    }

    switch (filter.avgVolume) {
      case "any":
        break;

      case "sub100k":
        filteredStocks = filteredStocks.filter(stock => stock.avg_vol < 100000)
        break;

      case "sub500k":
        filteredStocks = filteredStocks.filter(stock => stock.avg_vol < 500000)
        break;

      case "sub1m":
        filteredStocks = filteredStocks.filter(stock => stock.avg_vol < 1000000)
        break;

      case "over100k":
        filteredStocks = filteredStocks.filter(stock => stock.avg_vol > 100000)
        break;

      case "over500k":
        filteredStocks = filteredStocks.filter(stock => stock.avg_vol > 500000)
        break;

      case "over1m":
        filteredStocks = filteredStocks.filter(stock => stock.avg_vol > 1000000)
        break;

      case "over5m":
        filteredStocks = filteredStocks.filter(stock => stock.avg_vol > 5000000)
        break;

      case "over10m":
        filteredStocks = filteredStocks.filter(stock => stock.avg_vol > 10000000)
        break;

      case "over20m":
        filteredStocks = filteredStocks.filter(stock => stock.avg_vol > 20000000)
        break;
    }

    switch (filter.relVolume) {
      case "any":
        break;

      case "sub1":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol < 1)
        break;

      case "sub.75":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol < .75)
        break;

      case "sub.5":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol < .5)
        break;

      case "sub.25":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol < .25)
        break;

      case "over.25":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol > .25)
        break;

      case "over.5":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol > .5)
        break;

      case "over.75":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol > .75)
        break;

      case "over1":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol > 1)
        break;

      case "over2":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol > 2)
        break;

      case "over5":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol > 5)
        break;

      case "over10":
        filteredStocks = filteredStocks.filter(stock => stock.vol / stock.avg_vol > 10)
        break;

    }

    switch (filter.sector) {
      case "any":
        break;

      case "basic-materials":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Basic Materials")
        break;

      case "communications":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Communications")
        break;

      case "consumer-disc":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Consumer Discretionary")
        break;

      case "consumer-staples":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Consumer Staples")
        break;

      case "energy":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Energy")
        break;

      case "financial":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Financial")
        break;

      case "healthcare":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Healthcare")
        break;

      case "industrials":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Industrials")
        break;

      case "IT":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Information Technology")
        break;

      case "real-estate":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Real Estate")
        break;

      case "utilities":
        filteredStocks = filteredStocks.filter(stock => stock.sector === "Utilities")
        break;

    }

    switch (filter.marketCap) {
      case "any":
        break;

    }

    switch (filter.fiftytwoWeekHigh) {

      case "any":
        break;

      case "under5":
        filteredStocks = filteredStocks.filter(stock => stock.last_price <= stock.fiftytwo_high * .95)
        break;

      case "under20":
        filteredStocks = filteredStocks.filter(stock => stock.last_price <= stock.fiftytwo_high * .8)
        break;

      case "under50":
        filteredStocks = filteredStocks.filter(stock => stock.last_price <= stock.fiftytwo_high * .5)
        break;

      case "under90":
        filteredStocks = filteredStocks.filter(stock => stock.last_price <= stock.fiftytwo_high * .9)
        break;

    }

    switch (filter.fiftytwoWeekLow) {

      case "any":
        break;

      case "over5":
        filteredStocks = filteredStocks.filter(stock => stock.last_price >= stock.fiftytwo_low * 1.05)
        break;

      case "over20":
        filteredStocks = filteredStocks.filter(stock => stock.last_price >= stock.fiftytwo_low * 1.2)
        break;

      case "over50":
        filteredStocks = filteredStocks.filter(stock => stock.last_price >= stock.fiftytwo_low * 1.5)
        break;

      case "over90":
        filteredStocks = filteredStocks.filter(stock => stock.last_price >= stock.fiftytwo_low * 1.9)
        break;
    }

    switch (filter.insiderOwn) {
      case "any":
        break;
    }

    switch (filter.instOwn) {
      case "any":
        break;
    }

    return filteredStocks
  }

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


// Filter Class
class Filter {
  constructor(filter) {
    this.id = filter.id;
    this.name = filter.name;
    this.price = filter.last_price;
    this.volume = filter.vol;
    this.avgVolume = filter.avg_vol;
    this.relVolume = filter.rel_vol;
    this.sector = filter.sector;
    this.marketCap = filter.market_cap;
    this.fiftytwoWeekHigh = filter.fiftytwo_high;
    this.fiftytwoWeekLow = filter.fiftytwo_low;
    this.insiderOwn = filter.insider_own;
    this.instOwn = filter.inst_own;
    this.userId = filter.user_id
  }

  // logs active filter values to pass as argument from Filter class
  static filterParams() {
    let searchIds = ['price', 'volume', 'avg-volume', 'rel-volume', 'sector',
      'market-cap', '52-week-high', '52-week-low', 'insider-own', 'inst-own']
    let params = []
    for (let id of searchIds) {
      params.push(document.getElementById(id).selectedOptions[0].value)
      // console.log(id)
    }
    let formattedParams = new Object
    formattedParams.price = params[0];
    formattedParams.volume = params[1];
    formattedParams.avgVolume = params[2];
    formattedParams.relVolume = params[3];
    formattedParams.sector = params[4];
    formattedParams.marketCap = params[5];
    formattedParams.fiftytwoWeekHigh = params[6];
    formattedParams.fiftytwoWeekLow = params[7];
    formattedParams.insiderOwn = params[8];
    formattedParams.instOwn = params[9]
    return formattedParams
  }

  static resetFilter() {
    let searchIds = ['price', 'volume', 'avg-volume', 'rel-volume', 'sector',
      'market-cap', '52-week-high', '52-week-low', 'insider-own', 'inst-own']
    for (let id of searchIds) {
      document.getElementById(id).value = "any"
    }
  }

  static newfilter(id) {
    let filterParams = Filter.filterParams()
    let form = document.getElementById("create-filter")
    document.querySelector(".popup-filter").style.display = "flex";

    document.querySelector("#close-filter").addEventListener("click", () => {
      document.querySelector(".popup-filter").style.display = "none";
    })

    form.addEventListener("submit", function (e) {
      e.preventDefault()
      e.stopImmediatePropagation()

      fetch('http://localhost:3000/filters', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(
          {
            filter: {
              name: e.target.elements[0].value,
              market_cap: filterParams.marketCap,
              sector: filterParams.sector,
              last_price: filterParams.price,
              fiftytwo_high: filterParams.fiftytwoWeekHigh,
              fiftytwo_low: filterParams.fiftytwoWeekLow,
              vol: filterParams.volume,
              avg_vol: filterParams.avgVolume,
              rel_vol: filterParams.relVolume,
              insider_own: filterParams.insiderOwn,
              inst_own: filterParams.insiderOwn,
              user_id: id
            }
          }
        )
      })
        .then(response => response.json())
        .then(function (json) {
          console.log(json)
          let newFilter = new Filter(json)
          form.reset()
          newFilter.appendFilter()
          document.querySelector(".popup-filter").style.display = "none";
        })

    })
  }

  appendFilter() {
    let filters = document.getElementById("load-filter")
    let option = document.createElement("option")
    option.text = this.name
    option.value = this.name.replace(/\s/g, '-')
    option.setAttribute("id", this.id)
    filters.appendChild(option)
    filters.value = option.value

  }

  static loadFilter(id) {
    fetch('http://localhost:3000/filters')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let filterVals = data.data.find(filter => filter.attributes.id == id).attributes
        document.getElementById("market-cap").value = filterVals.market_cap
        document.getElementById("sector").value = filterVals.sector
        document.getElementById("price").value = filterVals.last_price
        document.getElementById("52-week-high").value = filterVals.fiftytwo_high
        document.getElementById("52-week-low").value = filterVals.fiftytwo_low
        document.getElementById("volume").value = filterVals.vol
        document.getElementById("avg-volume").value = filterVals.avg_vol
        document.getElementById("rel-volume").value = filterVals.rel_vol
        document.getElementById("insider-own").value = filterVals.insider_own
        document.getElementById("inst-own").value = filterVals.inst_own
      })
      .then(() => {
        renderTableRows(Stock.filterStocks(Filter.filterParams()))
      });
  }

  static deleteFilter() {
    let loadOptions = document.querySelector("#load-filter");

    fetch(`http://localhost:3000/filters/${loadOptions.selectedOptions[0].id}`, {
      method: "DELETE"
    })
    loadOptions.remove(loadOptions.selectedIndex);
  }

}

class User {
  constructor(user) {
    this.name = user.name
    this.id = user.id
  }

  static setCurrentUser(user) {
    currentUser = user
  }

  static currentUser() {
    return currentUser
  }

  static createOrAccessUser() {
    let form = document.getElementById("user-sign-up-log-in")
    document.querySelector(".popup-user").style.display = "flex";

    document.querySelector(".close").addEventListener("click", () => {
      document.querySelector(".popup-user").style.display = "none";
    })

    form.addEventListener("submit", function (e) {
      e.preventDefault()
      e.stopImmediatePropagation()
      fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(
          {
            user: {
              name: e.target.elements[0].value
            }
          }
        )
      })
        .then(response => {
          return response.json()
        })
        .then(user => {
          let newUser = new User(user)
          User.setCurrentUser(newUser)
          newUser.loadFilters()
          console.log(newUser)
          console.log(user)
          logInOrSignUp.style.display = "none";
          document.querySelector(".popup-user").style.display = "none";
          logOut.style.display = "flex"
        })
        .then(() => {

          let filterLoadTable = document.getElementById("set-load-filter")
          let thead = filterLoadTable.createTHead();
          let row = thead.insertRow()
          let h4 = document.createElement("h4")
          h4.innerHTML = `  Current User: ${currentUser.name}`
          row.appendChild(h4)

        })

    })




  }

  static logOut() {
    currentUser = undefined
    logInOrSignUp.style.display = "flex";
    logOut.style.display = "none"
    let userDisplay = document.querySelector("#set-load-filter > thead")
    userDisplay.remove()
    let loadOptions = document.querySelector("#load-filter")
    loadOptions.options.length = 0
    let option = document.createElement("option")
    loadOptions.appendChild(option)
    option.value = "none"
    option.text = "None"

  }

  loadFilters() {
    fetch('http://localhost:3000/filters')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let filterSelection = document.getElementById("load-filter")
        let userFilters = data.data.filter(filter => filter.attributes.user_id === this.id)
        for (let filter of userFilters) {
          let option = document.createElement("option")
          option.value = filter.attributes.name
          option.text = filter.attributes.name
          option.setAttribute("id", filter.attributes.id)
          filterSelection.appendChild(option)

        }
        filterSelection.value = "none"
      })
  }
}



// Reset Filter 







