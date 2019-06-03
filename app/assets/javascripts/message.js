$(document).on('turbolinks:load',(function() {
  
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image.url ? `<img src= ${ message.image.url }>` : "" ;
    var id = message.id
    var html = 
  `<div class="message" data-id ="${id}">
    <div class="upper-info">
      <div class="upper-info__user">
        ${message.user_name}
      </div>
      <div class="upper-info__date">
        ${message.created_at}
      </div>
    </div>
    <div class="lower-meesage">
        <p class="message__text">
          ${content}
        </p>
    </div>
    ${img}
  </div>`
  var id = null;
    return html;
    }
      var buildMessageHTML = function(message) {
        var content = message.content ? `${ message.content }` : "";
        var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
        var id = message.id
        var html = 
        `<div class="message" data-id ="${id}">
        <div class="upper-info">
          <div class="upper-info__user">
            ${message.user_name}
          </div>
          <div class="upper-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-meesage">
            <p class="message__text">
              ${content}
            </p>
        </div>
        ${img}
        </div>
        `
        id = null;
        return html;
      }
    $(".new_message").on("submit", function(e) {
      e.preventDefault();
      var formData = new FormData(this)
      var url = $(this).attr('action')
      $.ajax({
        type: 'POST',
        url: url,
        data: formData, 
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        $('.form__submit').prop('disabled',false)
        var html = buildHTML(data)
        $('.messages').append(html);
        $('.messages').animate({
          scrollTop: $('.messages')[0].scrollHeight}, '10000');
        $('.form__message').val('');
        $('.hidden').val('')
      })
      .fail(function() {
        alert('情報を入力して下さい');
        $('.messages').reset()
      });
  });
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data('id');
    var $dir = location.href.split("/");  
    var $dir2 = $dir[$dir.length -2];
    var url = "/groups/" + $dir2 + "/api/messages" 
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id},
    })
    .done(function(messages) {
      var insertHTML = '';
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight}, '10000');
       $.each(messages, function(index,message) { 
        var html = buildMessageHTML(message) + insertHTML
        $('.messages').append(html);
        last_message_id.splice(0, last_message_id.length);
      })
     })
    .fail(function(){
      alert('通信に失敗しました');
    })
  };
  $(function() {
      setInterval(reloadMessages, 5000);
    });
})
);