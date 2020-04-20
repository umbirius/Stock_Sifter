class FiltersController < ApplicationController
    def index 
        filters = Filter.all 
        render json: FilterSerializer.new(filters).serializable_hash
    end 

    def create 
        @filter = Filter.create(filter_params)
        render json: @filter
    end 

    def destroy
        @filter = Filter.find_by(id: params[:id]).destroy
        render json: @filter
    end

    private

    def filter_params
        params.require(:filter).permit(:name, :market_cap, :sector, :last_price, :fiftytwo_high, 
        :fiftytwo_low, :vol, :avg_vol, :rel_vol, :insider_own, :inst_own, :user_id)
    end
end


