$(function() {
  $('.messages').animate({
    scrollTop: $('.messages')[0].scrollHeight}, '10000');
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = 
  `<div class="message">
    <div class="upper-info">
      <div class="upper-info__user">
        ${message.user_name}
      </div>
      <div class="upper-info__date">
        ${message.date}
      </div>
    </div>
    <div class="lower-meesage">
        <p class="message__text">
          ${content}
        </p>
    </div>
    ${img}
  </div>`
    return html;
    }
      var buildMessageHTML = function(message) {
        var content = message.content ? `${ message.content }` : "";
        var img = message.image_url ? `<img src= ${ message.image_url }>` : "";
        var html = 
        `<div class="message">
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
      $('.messages').animate({
      scrollTop: $('.messages')[0].scrollHeight}, '10000');
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
        var html = buildHTML(data)
        $('.messages').append(html);
        $('.messages').val('');
        location.reload();
        $('.messages').reset()
      })
      .fail(function() {
        alert('情報を入力して下さい');
        location.reload();
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
       $.each(messages, function(index,message) { 
        var html = buildMessageHTML(message) + insertHTML
        $('.messages').append(html);
        location.reload()
      })
     })
    .fail(function() {
      alert('error');
    });
  };
  $(function() {
      setInterval(reloadMessages, 5000);
    });
})