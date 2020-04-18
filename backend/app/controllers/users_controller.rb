class UsersController < ApplicationController
    def index 
        users = User.all 
        render json: UserSerializer.new(users).serializable_hash
    end 


    def create 
        user = User.create(user_params)
        render json: user
    end 


    private

    def user_params
        params.require(:user).permit(:name)
    end
end
