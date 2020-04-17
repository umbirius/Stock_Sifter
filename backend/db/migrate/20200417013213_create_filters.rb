class CreateFilters < ActiveRecord::Migration[5.2]
  def change
    create_table :filters do |t|
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
      t.timestamps
    end
  end
end
