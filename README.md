#Chat Space  DB設計

##機能概要
- ユーザー登録機能
- 新規チャットグループ作成機能
- メッセージ登録機能
- 画像登録機能
- 複数チャットグループ登録機能

##usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null false|
|email|string|null false, unique: true|
|password|string|null false|

##messegesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: true|

##groupテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: true|
