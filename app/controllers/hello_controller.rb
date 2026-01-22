class HelloController < ApplicationController
  def index
     @users = User.all
  end

  def welcome
  end
end
