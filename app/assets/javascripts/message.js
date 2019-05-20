$(document).on("turbolinks:load", function() {

  function buildMessage(message) {
    var image = message.image ? `<img src= ${ message.image.url }>` : "";
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
})