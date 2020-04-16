# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv' 

csv_text = File.read(Rails.root.join('lib/ticker_seeds.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
    s = Stock.new 
    s.symbol = row['Symbol']
    s.market_cap = row['Market Cap']
    s.sector = row['Sector']
    s.last_price = row['Last Price']
    s.fiftytwo_high = row['52W High']
    s.fiftytwo_low = row['52W Low']
    s.vol = row['Volume']
    s.avg_vol = row['Avg Volume']
    s.rel_vol = row['Relative Volume']
    s.insider_own = row['Insider Own']
    s.inst_own = row['Inst Own']
    s.save
end 
