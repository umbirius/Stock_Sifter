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