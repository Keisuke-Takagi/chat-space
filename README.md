# README
# Chat-spaceでのDB設計
---
##  usersテーブル
| columns  | type  |  Options |
|---|---|---|
| name |string| null: true, index:true |
### Association
- has_many :messages
- has_many :groups through: :group_users
- has_many :group_users
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text| text | |
| image| string| | 
| user| reference | null: false, foreign_key: true|
| group| reference |null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name | string |null: false |

### Association
- has_many :messages
- has_many :users through: :group_users
- has_many :group_users
## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group | references  | null: false, foreign_key: true |
|user| references  | null: false, foreign_key: true |
### Association
- belongs_to :user
- belongs_to :group