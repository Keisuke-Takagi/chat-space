$(function() {
//   function buildHTML(comment) {
//   var html = `.form__mask
//   = f.text_field :content, class: 'form__message', placeholder: 'type a message'
//   .form__mask__image
//     = f.label :image, class: 'form__mask__image' do
//       = fa_icon 'picture-o', class: 'icon'
//       = f.file_field :image, class: 'hidden'
// = f.submit 'Send', class: 'form__submit'`
//   return html;
//   }
  $(".form__message").on("keyup", function(e) {
    e.preventDefault();
    var input = $(".form__message");
    var message = input.val();
    console.log(message);
//     $.ajax({
//       type: 'POST',
//       url: '/groups/user_id/messages.json',
//       data: {
//         todo: {
//           content: message
          
//         }
//       },
//       dataType: 'json'
//     })
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