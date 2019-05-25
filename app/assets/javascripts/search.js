$(function(){
  var search_list = $(".edit_group")
  
  function appendUser(user) {
    var html =``
  }

  function appendErrMsgToHTML(msg) {
    var html = ``
  }

  $(".edit_group").on("keyup", function() {
    var input = $(".user-search-field.chat-group-form__input").val();
    
      $.ajax({
        type: 'GET',
        url: '/users/search',
        data: { keyword: input},
        dataType: 'json'
      })
    .done(function(users){
      console.log(users)
      $(".user-search-field.chat-group-form__input").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendUser(user);
        
     })
    }
    else {
      appendErrMsgToHTML("一致するユーザー名はありません")
     }
    })
    .fail(function(){
      alert('映画検索に失敗しました');
    })
   })
  })






