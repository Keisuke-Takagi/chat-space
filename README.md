# README
# Chat-spaceでのDB設計
---
##  usersテーブル
| columns  | type  |  Options |
|---|---|---|
|  id |   integer| null: false,  unique: true  |
|  mail_adress | string  |  null: false |
| name |string| null: true |
### Association
- has_many :messages
- has_many :groups through: :group_users
- has_many :group_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id| integer |null: false, unique: true |
|text| text |null: false |
| image| integer| | 
| user_id| integer | null: false|

### Association
- belongs_to :users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id | integer |null: false, unique: true |
|name | string |null: false |

### Association
- has_many :users through: :group_users
- has_many :group_users
## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|id | integer |null: false, unique: true |
|group_id | references  | null: false, foreign_key: true |
|user_id| references  | null: false, foreign_key: true |
### Association
- belongs_to :user
- belongs_to :group
- 