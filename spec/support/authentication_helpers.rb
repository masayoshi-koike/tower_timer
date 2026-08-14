module AuthenticationHelpers
  # user.password relies on the plain-text value FactoryBot assigned still
  # being held in memory on the object (has_secure_password never persists it).
  def login_as(user)
    post "/user_sessions", params: { email: user.email, password: user.password }
  end
end
