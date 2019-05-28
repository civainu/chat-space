$(document).on("turbolinks:load", function() {

  function buildMessage(message) {
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message__text" data-message-id='${message.id}' >
    <div class="upper-info">
    <div class="upper-info__user">
    ${message.user_name}
    </div>
    <div class="upper-info__date">
    ${message.created_at}
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
    })
  })

  var reloadMessages = function() {
    var last_message_id = $('.message__text').last().data('message-id');
    // console.log(last_message_id);
    var group_id = $('.main-header').last().data('group-id');
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(data) {
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(data, function(i, message) {
        var insertHTML = buildMessage(message)
              //メッセージが入ったHTMLを取得
          $('.message__text').append(insertHTML);
          $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight+100}, "fast");
      })
    })
    //メッセージを追加
    .fail(function() {
      alert('自動更新に失敗しました')
    });
}
  setInterval(reloadMessages, 5000); 
});
