class CreateLists < ActiveRecord::Migration[5.0]
  def change
    create_table :lists do |t|
      t.string :title, default: "New Title"
      t.string :description, default: "New Description"
      t.references :board, foreign_key: true

      t.timestamps
    end
  end
end
