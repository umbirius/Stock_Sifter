class FilterSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :market_cap, :sector, :last_price, :fiftytwo_high, 
    :fiftytwo_low, :vol, :avg_vol, :rel_vol, :insider_own, :inst_own, :user_id
  belongs_to :user
end

