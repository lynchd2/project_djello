class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.string :title, default: "New Title Description"
      t.string :description, default: "New Card Description"
      t.references :list, foreign_key: true

      t.timestamps
    end
  end
end
