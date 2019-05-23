$(function() {
    // function buildHTML(comment) {
    // var html = ``
    // return html;
    // }
    $(".form__submit").on("click", function(e) {
      e.preventDefault();
      var input = $(".form__message");
      var message = input.val();
      console.log(message);
      $.ajax({
        type: 'POST',
        url: location.href,
        data: {
          message: {
            content: message
            
          }
        },
        dataType: 'json'
      })
  //     .done(function(data){
  //       var html = buildHTML(data)
  //       $('.messages').append(html);
  //       $('.meeage__text')
  //     })
  //     .fail(function() {
  //       return alert('error');
  //     });
    });
  });