# frozen_string_literal: true

class Contact < ApplicationRecord
  validates :name, presence: true, length: { minimum: 2 }
  validates :address, presence: true
  validates :postal_code, presence: true
  validates :city, presence: true
end
