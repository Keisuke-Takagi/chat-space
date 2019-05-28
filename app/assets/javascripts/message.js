$(function() {
  $('.messages').animate({
    scrollTop: $('.messages')[0].scrollHeight}, '0');
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
          if (message.content && message.image.url) {
            var html = '<div class="message" data-id=' + message.id + '>' +
              '<div class="upper-info">' +
                '<div class="upper-info__user">' +
                  message.user_name +
                '</div>' +
                '<div class="upper-info__date">' +
                  message.created_at +
                '</div>' +
              '</div>' +
              '<div class="lower-message">' +
                '<p class="message__text">' +
                  message.content +
                '</p>' +
                '<img src="' + message.image.url + '" class="lower-message__image" >' +
              '</div>' +
            '</div>'
            $('.messages').animate({
              scrollTop: $('.messages')[0].scrollHeight}, '0');
          } else if (message.content) {
            var html = '<div class="message" data-id=' + message.id + '>' +
              '<div class="upper-info">' +
                '<div class="upper-info__user">' +
                  message.user_name +
                '</div>' +
                '<div class="upper-info__date">' +
                  message.created_at +
                '</div>' +
              '</div>' +
              '<div class="lower-message">' +
                '<p class="message__text">' +
                  message.content +
                '</p>' +
              '</div>' +
            '</div>'
            $('.messages').animate({
              scrollTop: $('.messages')[0].scrollHeight}, '0');
          } else if (message.image.url) {
            var html = '<div class="message" data-id=' + message.id + '>' +
              '<div class="upper-info">' +
                '<div class="upper-info__user">' +
                  message.user_name +
                '</div>' +
                '<div class="upper-info__date">' +
                  message.created_at +
                '</div>' +
              '</div>' +
              '<div class="lower-message">' +
                '<img src="' + message.image.url + '" class="lower-message__image" >' +
              '</div>' +
            '</div>'
            $('.messages').animate({
              scrollTop: $('.messages')[0].scrollHeight}, '0');
          };
          return html;
        };
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
    last_message_id = $('.message:last').data('id')
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
       $.each(messages, function(index, message) {
        console.log(message)
        var html = buildMessageHTML(message) + insertHTML
        console.log(html)
        $('.messages').append(html);
      })
     })
    .fail(function() {
      console.log('error');
    });
  };
  $(function() {
      setInterval(reloadMessages, 5000);
    });
})

