# frozen_string_literal: true

class Contact < ApplicationRecord
  validates :name, presence: true, length: { minimum: 2 }
  validates :address, presence: true
  validates :postal_code,
    presence: true,
    format: { with: /\A[a-zA-Z0-9]+\z/ },
    length: { minimum: 4, maximum: 7 }
  validates :city, presence: true
end
