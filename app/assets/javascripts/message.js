$(function() {
  // $('.messages').animate({
  //   scrollTop: $('.messages')[0].scrollHeight}, '0');
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
        //data-idが反映されるようにしている
        var html = '<div class="message" data-id=' + message.id + '>' +
          '<div class="upper-message">' +
            '<div class="upper-message__user-name">' +
              message.user_name +
            '</div>' +
            '<div class="upper-message__date">' +
              message.created_at +
            '</div>' +
          '</div>' +
          '<div class="lower-message">' +
            '<p class="lower-message__content">' +
              message.content +
            '</p>' +
            '<img src="' + message.image.url + '" class="lower-message__image" >' +
          '</div>' +
        '</div>'
      } else if (message.content) {
        //同様に、data-idが反映されるようにしている
        var html = '<div class="message" data-id=' + message.id + '>' +
          '<div class="upper-message">' +
            '<div class="upper-message__user-name">' +
              message.user_name +
            '</div>' +
            '<div class="upper-message__date">' +
              message.created_at +
            '</div>' +
          '</div>' +
          '<div class="lower-message">' +
            '<p class="lower-message__content">' +
              message.content +
            '</p>' +
          '</div>' +
        '</div>'
      } else if (message.image.url) {
        //同様に、data-idが反映されるようにしている
        var html = '<div class="message" data-id=' + message.id + '>' +
          '<div class="upper-message">' +
            '<div class="upper-message__user-name">' +
              message.user_name +
            '</div>' +
            '<div class="upper-message__date">' +
              message.created_at +
            '</div>' +
          '</div>' +
          '<div class="lower-message">' +
            '<img src="' + message.image.url + '" class="lower-message__image" >' +
          '</div>' +
        '</div>'
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
  $(".current-group_name").on("click", function(e) {
    e.preventDefault();
    var last_message_id = $('.message:last').data('id');
    console.log(last_message_id)
  })
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //   $.ajax({
  //     //ルーティングで設定した通りのURLを指定
  //     url: '/groups/:group_id/api/messages',
  //     //ルーティングで設定した通りhttpメソッドをgetに指定
  //     type: 'GET',
  //     dataType: 'json',
  //     //dataオプションでリクエストに値を含める
  //     data: {id: last_message_id}
  //   })
  //   .done(function(messages) {
  //     var insertHTML = '';
  //     $.each(messages, function(i, message){
        
  //     var html = buildMessageHTML(message)
  //     $(".messages").append(html)
  //     })
  //     console.log('success');
  //   })
  //   .fail(function() {
  //     console.log('error');
    // });
});

  