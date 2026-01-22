class ProfilesController < ApplicationController
  def show
    @user = User.find_by_id(params[:id])
    respond_to do |format|
      format.html # This should render show.html.erb
      format.json {
        render json: {
          name: @user.username,
          email: @user.email,
          avatar_url: "https://i.pravatar.cc/300"
        }
      }
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    
    if @user.update(user_params)
      redirect_to profile_path(@user)
      # redirect_to welcome_path(), notice: "Profile updated successfully!"
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :email)
  end
end
