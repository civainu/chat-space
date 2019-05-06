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

|body|text||
|image|string||
|group_id|integer|foreign_key: true|
|user_id|integer|foreign_key: true|

##groupテーブル

|group_id|integer|foreign_key: true|
|user_id|integer|foreign_key: true|
s