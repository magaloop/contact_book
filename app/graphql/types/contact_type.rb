# frozen_string_literal: true

class Types::ContactType < Types::BaseObject
  field :name, String, null: false
  field :address, String, null: false
  field :postal_code, String, null: false
  field :city, String, null: false
end
