# README
# Chat-spaceでのDB設計
---
##  usersテーブル
| id  | mail_adress  |  name | 
|---|---|---|---|
|   1|  1234@mail.com |  name01 |   
|  2| 2234@mail.com  |   name02|   
| 3 |  3234@mail.com |  name02 |   

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
| id  | text  |  image |  user_id
|---|---|---|---|
|  1 | おはよう  |  image01 |   1|
|  2 |   こんにちは| null  |   2|
|  3 |   おやすみ|  null |   1|

|Column|Type|Options|
|------|----|-------|
|id| integer |null: false, unique: true |
|text| text |null: false |
| image| integer| | 
| user_id| integer | null: false|
### Association
- belongs_to :users

## groupsテーブル
|   id|  name |   
|---|---|---|---|
|   1|   野球ずきサークル|   
|   2|  サッカー好きサークル |   
|   3|   バスケ好きサークル|   

|Column|Type|Options|
|------|----|-------|
|id | integer |null: false, unique: true |
|name | string |null: false |

### Association
- has_many :users through: :group_users
- has_many :group_users
## group_usersテーブル

|  id |  group_id |  user_id |
|---|---|---|
| 1  |  1 | 1  |
|   2|  3 |  2 |
|  3 |  3 | 2  |

|Column|Type|Options|
|------|----|-------|
|id | integer |null: false, unique: true |
|group_id | references  | null: false, foreign_key: true |
|user_id| references  | null: false, foreign_key: true |
### Association
- belongs_to :user
- belongs_to :group

