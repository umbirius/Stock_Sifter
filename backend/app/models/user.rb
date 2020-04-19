class User < ApplicationRecord
    has_many :filters
    validates :email, uniqueness: true
end
