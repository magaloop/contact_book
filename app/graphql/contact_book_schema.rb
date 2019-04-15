# frozen_string_literal: true

class ContactBookSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
end
