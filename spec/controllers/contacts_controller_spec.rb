# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ContactsController, type: :controller do
  describe '#create' do
    it 'creates a contact and returns it as JSON if valid' do
      expect {
        post :create, params: {
          contact: {
            name: 'Jay Higgs',
            address: 'Neutrino str. 123',
            postal_code: '12345',
            city: 'Geneve'
          }
        }
      }.to change { Contact.count }.by(1)

      expect(response).to have_http_status(:created)
      expect(response.content_type).to eq('application/json')

      expect(JSON.parse(response.body)).to include({
        'name' => 'Jay Higgs',
        'address' => 'Neutrino str. 123',
        'postal_code' => '12345',
        'city' => 'Geneve'
      })
    end

    it 'responds with status Unprocessable Entity and the validation errors as JSON if the contact is invalid' do
      contact_params = { name: 'Jay Higgs' }
      post :create, params: { contact: contact_params }

      expect(response).to have_http_status(:unprocessable_entity)

      expect(response.content_type).to eq('application/json')

      contact = Contact.new(contact_params)
      contact.validate
      expect(response.body).to eq({ errors: contact.errors }.to_json)
    end
  end
end
