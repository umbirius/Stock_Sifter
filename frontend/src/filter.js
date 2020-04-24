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