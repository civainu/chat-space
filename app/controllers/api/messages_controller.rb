class Api::MessagesController < ApplicationController
  def index
    User.where(id: )
    => SELECT `users`.* FROM `users` WHERE `users`.`name` = 'hoge'
  end
end
