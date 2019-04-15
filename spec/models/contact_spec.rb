require 'rails_helper'

RSpec.describe Contact, type: :model do
  let(:valid_attributes) do
    {
      name: 'Some Name',
      address: 'Nice street 123',
      postal_code: '12345',
      city: 'Milano'
    }
  end

  [:name, :address, :postal_code, :city].each do |attr|
    it "validates presence of #{attr}" do
      contact = Contact.new(valid_attributes)
      contact.send(:"#{attr}=", nil)
      expect(contact).not_to be_valid
      expect(contact.errors[attr]).to be_present
    end
  end

  it 'is valid when all attributes are set correctly' do
    contact = Contact.new(valid_attributes)
    expect(contact).to be_valid
  end
end
