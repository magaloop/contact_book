# frozen_string_literal: true

class ContactsController < ApplicationController
  def create
    contact = Contact.new(contact_params)
    if contact.save
      render json: contact, status: :created
    else
      render json: { errors: contact.errors }, status: :unprocessable_entity
    end
  end

  def near_duplicates
    # TODO: implement proper near duplicate detection
    render json: Contact.where(contact_params)
  end

  private def contact_params
    params.require(:contact).permit(:name, :address, :postal_code, :city)
  end
end
