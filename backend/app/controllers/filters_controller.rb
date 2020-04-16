class FiltersController < ApplicationController
    def index 
        filters = Filter.all 
        render json: FilterSerializer.new(filters).serializable_hash
    end 
end
