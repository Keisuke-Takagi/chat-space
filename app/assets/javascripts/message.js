$(function() {
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
    $(".new_message").on("submit", function(e) {
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight}, 'fast');
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
        console.log(html)
        $('.messages').append(html);
        $('.messages').val('');

      })
      .fail(function() {
        return alert('error');
      });
    });
    });

  