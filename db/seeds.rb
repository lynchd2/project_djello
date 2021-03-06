# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Board.destroy_all
List.destroy_all
Card.destroy_all
puts "Getting Master User"
user = User.first
3.times do |num|
  puts "Creating board #{num} of 3"
  board = user.boards.create(title: "New Board #{num}")
  10.times do |num2|
    puts "Creating list #{num2} of 30"
    list = board.lists.create(title: "New Title #{num2}", description: "New Description #{num2}")
    puts "List #{num2} created"
    3.times do |num3|
      list.cards.create(title: "New Card Title", description: "New Card Description")
    end
    puts "Cards created"
  end
  puts "Board #{num} created with 10 lists"
end

puts "All done!"
