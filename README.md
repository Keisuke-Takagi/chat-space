# README
# Chat-spaceでのDB設計
---
##  usersテーブル
| columns  | type  |  Options |
|---|---|---|
|  mail_address | string  |  null: false |
| name |string| null: true |
### Association
- has_many :messages
- has_many :groups through: :group_users
- has_many :group_users
- add_index :users, [:name, :mail_address]
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text| text |null: false |
| image| integer| | 
| user_id| integer | null: false|

### Association
- belongs_to :user
- add_index :messages, [:text, :image]
## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name | string |null: false |

### Association
- has_many :users through: :group_users
- has_many :group_users
## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id | references  | null: false, foreign_key: true |
|user_id| references  | null: false, foreign_key: true |
### Association
- belongs_to :user
- belongs_to :group