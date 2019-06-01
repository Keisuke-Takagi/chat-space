$(function(){
  var chat_member_list = $("#chat-group-users")
  function appendUser(user) {
  var html =`
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="add_button" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
    </div> `
    $("#user-search-result").append(html);
  }
  function appendErrMsgToHTML(msg) {
  var html = `
    <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${msg}</p>
    </div>`
  search_list.append(html)
  }
  function appendMember(member_name, member_id){
  var html = `
    <div class="chat-group-user clearfix" id="chat-group-user-${member_id}">
      <input class="chat-group-users__input" name="group[user_ids][]" type="hidden" value="${member_id}">
      <p class="chat-group-current-user__name">
        ${member_name}
      </p>
      <div class="delete_button" data-user-id=${member_id} data-user-name=${member_name}>削除</div>
    </div>`
  chat_member_list.append(html)
  }
  function removeMember(member_name, member_id){
  var html =`
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${member_name}</p>
      <div class="add_button" data-user-id=${member_id} data-user-name=${member_name}>
      追加</div>
    </div>`
    $("#user-search-result").append(html)
  }
  $("#user-search-field.chat-group-form__input").on("keyup", function() {
    var input = $("#user-search-field.chat-group-form__input").val();
      $.ajax({
        type: 'GET',
        url: '/users/search',
        data: { keyword: input},
        dataType: 'json'
      })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendUser(user);
      })
      }else {
      appendErrMsgToHTML("一致するユーザー名はありません")
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
   });
   $(document).on("click", ".add_button", function () {
    var chat_member_name = $(this).data("user-name")
    var chat_member_id = $(this).data("user-id")
    appendMember(chat_member_name,chat_member_id);  
    $(this).parent().remove()
   });
   $(document).on("click", ".delete_button", function(){
     var chat_member = $(this).data("user-name")
     var chat_member_id = $(this).data("user-id")
     removeMember(chat_member, chat_member_id)
     $(this).parent().remove()
     });
   $(".a_delete_button").on("click", function(){
     $(this).parent().remove()
    });
});
