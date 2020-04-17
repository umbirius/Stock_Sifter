class FilterSerializer
  include FastJsonapi::ObjectSerializer
  attributes :market_cap, :sector, :last_price, :fiftytwo_high, 
    :fiftytwo_low, :vol, :avg_vol, :rel_vol, :insider_own, :inst_own
end


t.string :market_cap
t.string :sector
t.string :last_price
t.string :fiftytwo_high
t.string :fiftytwo_low
t.string :vol
t.string :avg_vol
t.string :rel_vol 
t.string :insider_own
t.string :inst_own