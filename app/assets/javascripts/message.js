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
            //data-idが反映されるようにしている
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
            //同様に、data-idが反映されるようにしている
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
            //同様に、data-idが反映されるようにしている
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

  // $(".current-group_name").on("click", function(e) {
  //   e.preventDefault();
  //   var last_message_id = $('.message:last').data('id');
  //   var $dir = location.href.split("/");  
  //   var $dir2 = $dir[$dir.length -2];
  //   var url = "/groups/" + $dir2 + "/api/messages" 
  //   console.log(url)
  //   //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //   $.ajax({
  //     //ルーティングで設定した通りのURLを指定
  //     url: url,
  //     //ルーティングで設定した通りhttpメソッドをgetに指定
  //     type: 'GET',
  //     dataType: 'json',
  //     //dataオプションでリクエストに値を含める
  //     data: {id: last_message_id},
  //   })
  //   .done(function(message) {
  //     console.log(message)
  //     debugger
  //     // var insertHTML = '';
  //     // $.each(message, function(i, message){
  //     //   var html = buildMessageHTML(message)
  //     //   $(".messages").append(html)
  //     // })
  //     console.log('success');
  //   })
  //   .fail(function() {
  //     debugger
  //     console.log('error');
  //   });
  // });

  var reloadMessages = function() {
    
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('id')
    var last_message_id = $('.message:last').data('id');
    var $dir = location.href.split("/");  
    var $dir2 = $dir[$dir.length -2];
    var url = "/groups/" + $dir2 + "/api/messages" 
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: url,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'GET',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
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
  // $(".current-group_name").on("click", function(e) {
  //   e.preventDefault
  //   var reloadMessages = function() {
    
  //     //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //     last_message_id = $('.message:last').data('id')
  //     console.log(last_message_id)
  //     var last_message_id = $('.message:last').data('id');
  //     var $dir = location.href.split("/");  
  //     var $dir2 = $dir[$dir.length -2];
  //     var url = "/groups/" + $dir2 + "/api/messages" 
  //     $.ajax({
  //       //ルーティングで設定した通りのURLを指定
  //       url: url,
  //       //ルーティングで設定した通りhttpメソッドをgetに指定
  //       type: 'get',
  //       dataType: 'json',
  //       //dataオプションでリクエストに値を含める
  //       data: {id: last_message_id}
  //     })
  //     .done(function(messages) {
  //       console.log(messages)
  //       var insertHTML = '';
  //        $.each(messages, function(index, message) {
          
  //         var html = buildMessageHTML(message) + insertHTML
  //         console.log(html)
  //         $('.messages').append(html);
  //       })
  //      })
  //     .fail(function() {
  //       console.log('error');
  //     });
  //   };
  //     setInterval(reloadMessages, 5000);
  //     location.reload();

  // })
})
