# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts("Seeding database for environment: #{ENV['RAILS_ENV'] || 'development'}")

[
  {
    'name' => 'Ada Camino',
    'address' => 'Rykestrasse 48',
    'postal_code' => '10123',
    'city' => 'Berlin'
  },
  {
    'name' => 'Ahmed Ozim',
    'address' => 'Murray st. 84',
    'postal_code' => '50167',
    'city' => 'London'
  },
  {
    'name' => 'Andrea Flora',
    'address' => 'Kastanienallee 5',
    'postal_code' => '10435',
    'city' => 'Berlin'
  },
  {
    'name' => 'Boris Blume',
    'address' => 'Danzigerstr. 186',
    'postal_code' => '10543',
    'city' => 'Berlin'
  },
  {
    'name' => 'Cleo Fortuna',
    'address' => 'via Plinio 15',
    'postal_code' => '20312',
    'city' => 'Milano'
  },
  {
    'name' => 'Dania Porter',
    'address' => 'via Bergamo 51',
    'postal_code' => '40354',
    'city' => 'Monza'
  },
  {
    'name' => 'Eva Floss',
    'address' => 'Bancroft Rd.',
    'postal_code' => '50345',
    'city' => 'London'
  },
  {
    'name' => 'Flo Gierz',
    'address' => 'via Cavallotti 98',
    'postal_code' => '40738',
    'city' => 'Monza'
  },
  {
    'name' => 'Stefano Semplice',
    'address' => 'via Padova 20',
    'postal_code' => '20115',
    'city' => 'Milano'
  },
  {
    'name' => 'Simone Ramirez',
    'address' => 'Schlesisches Str. 20',
    'postal_code' => '10312',
    'city' => 'Berlin'
  },
  {
    'name' => 'Zacinto Boulanger',
    'address' => 'Eton Ave. 7',
    'postal_code' => '50798',
    'city' => 'London'
  }
].each do |contact_data|
  Contact.create!(contact_data) if Contact.where(contact_data).count == 0
end
