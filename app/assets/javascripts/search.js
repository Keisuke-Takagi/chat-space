$(function(){
  $(".edit_group").on("keyup", function() {
    var input = $(".user-search-field.chat-group-form__input").val();
    console.log(input)
      // $.ajax({
      //   type: 'GET',
      //   url: '/users/search',
      //   data: { keyword: input},
      //   dataType: 'json'
      // })
    // .done(function(users){
    
    //   if (users.length !== 0) {
    //     users.forEach(function(user){
        
      
    //     appendUser(user);
    //  })
    // }
    // else {
    //   appendErrMsgToHTML("一致するユーザー名はありません")
    //  }
    // })
    // .fail(function(){
    //   alert('映画検索に失敗しました');
    // })
  //  })
  })
})





