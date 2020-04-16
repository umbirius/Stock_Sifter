class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
       t.string :symbol
       t.string :market_cap
       t.string :sector
       t.float :last_price
       t.float :fiftytwo_high
       t.float :fiftytwo_low
       t.integer :vol
       t.integer :avg_vol
       t.float :rel_vol 
       t.float :insider_own
       t.float :inst_own
      t.timestamps
    end
  end
end
