# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_18_185010) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "filters", force: :cascade do |t|
    t.string "market_cap"
    t.string "sector"
    t.string "last_price"
    t.string "fiftytwo_high"
    t.string "fiftytwo_low"
    t.string "vol"
    t.string "avg_vol"
    t.string "rel_vol"
    t.string "insider_own"
    t.string "inst_own"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stocks", force: :cascade do |t|
    t.string "symbol"
    t.string "market_cap"
    t.string "sector"
    t.float "last_price"
    t.float "fiftytwo_high"
    t.float "fiftytwo_low"
    t.integer "vol"
    t.integer "avg_vol"
    t.float "rel_vol"
    t.float "insider_own"
    t.float "inst_own"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
