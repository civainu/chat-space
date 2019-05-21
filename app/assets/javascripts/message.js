$(document).on("turbolinks:load", function() {

  function buildMessage(message) {
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
    <div class="upper-info">
    <div class="upper-info__user">
    ${message.user_name}
    </div>
    <div class="upper-info__date">
    ${message.posted_time}
    </div>
    </div>
    <div class="message__text">
    <p class="lower-message__content">
    ${message.content}
    </p>
    
    </div>
    </div>`
  return html;
  }

$('#new_message').on('submit', function(e) {
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data) {
    var message = buildMessage(data);
    $('.messages').append(message);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
    $('#new_message')[0].reset();
  })
  .fail(function() {
    alert('メッセージの送信に失敗しました');
  })
  .always(function(data){
    $('.form__submit').prop('disabled', false);
 })
})

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
     </div>`
  $('#user-search-result').append(html);
 }
  function addUser(user_id, user_name){
    var html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <input name="chat_group[user_ids][]" type="hidden" value=${user.id}>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">削除</a>
     </div>`
  $('#chat-group-user').append(html);
 }

$('#user-search-field').on("keyup", function(){
  var input = $('#user-search-field').val();
  $.ajax({
    type:  'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json',
  })
  .done(function(users) {
    $('#user-search-result').empty();
    if (users.length !== 0 ) {
    users.forEach(function(user){
      appendUser(user);
    })
    }
    else {
      appendNoUser("一致するユーザーがいません")
    }
  })
  .fail(function(){
    alert('ユーザー検索に失敗しました');
  })
})
})