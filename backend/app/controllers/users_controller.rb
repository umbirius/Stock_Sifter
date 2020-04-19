class UsersController < ApplicationController
    def index 
        users = User.all 
        render json: UserSerializer.new(users).serializable_hash
    end 


    def create 
        if User.find_by(:name => user_params[:name])
            @user = User.find_by(:name => user_params[:name])
            redirect_to "/users/#{@user.id}"
        else
            @user = User.create(user_params)
            render json: @user  
        end
    end 

    def show
        @user = User.find_by(:id => params[:id].to_i)
        render json: @user
    end

    private

    def user_params
        params.require(:user).permit(:name)
    end
end
