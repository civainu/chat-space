#Chat Space  DB設計

##機能概要
- ユーザー登録機能
- 新規チャットグループ作成機能
- メッセージ登録機能
- 画像登録機能
- 複数チャットグループ登録機能

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false,|
|email|string|null false, unique: true|
|password|string|null false|

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

## messegesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## members table

|Column|Type|Options|
|------|----|-------|
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages
