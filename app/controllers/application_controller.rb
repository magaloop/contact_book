# frozen_string_literal: true

class ApplicationController < ActionController::Base
  after_action :set_csrf_cookie

  # Set CSRF token as a cookie, so the JS app can get it
  private def set_csrf_cookie
    cookies['CSRF-Token'] = form_authenticity_token if form_authenticity_token.present?
  end
end
