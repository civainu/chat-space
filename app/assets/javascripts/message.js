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
    var html = buildMessage(data);
    $('.messages').append(html);
    $('.form__submit').prop('disabled', false);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
    $('#new_message')[0].reset();
  })
  .fail(function() {
    alert('メッセージの送信に失敗しました');
  })
  .always(function(){
    $(".input-box__button").removeAttr("disabled");
  });
})

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
     </div>`
  $('#user-search-result').append(html);
 }

 function appendNoUser(user) {
  var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name"> 一致するユーザーがいません </p>
              </div>`
  $('#user-search-result').append(html);
}
  function addUser(user_id, user_name){
    var html = `<div class="chat-group-user clearfix js-chat-member" data-user-id="${user_id}">
                  <p class="chat-group-user__name">${user_name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
                  <input name="group[user_ids][]" type="hidden" id="group_user_ids" value="${user_id}">
                </div>`
     console.log(html);
  $('#chat-group-users').append(html);
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
$('#user-search-result').on("click",".chat-group-user__btn--add",function(){
  var user_id = $(this).data('user-id')
  var user_name = $(this).data('user-name')
  addUser(user_id,user_name);
  $(this).parent().remove();
 })

$('.chat-group-form__field').on("click",".chat-group-user__btn--remove", function(){
  $(this).parent().remove();
})
})
