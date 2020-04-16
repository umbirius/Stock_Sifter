class StocksController < ApplicationController
    def index 
        stocks = Stock.all 
        render json: StockSerializer.new(stocks).serializable_hash
    end 
end
