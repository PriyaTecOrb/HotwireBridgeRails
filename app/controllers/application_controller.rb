class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  before_action :turbo_native!

  private

  def turbo_native!
    response.set_header("Turbo-Visit-Control", "reload")
  end

end
