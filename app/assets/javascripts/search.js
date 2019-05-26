$(function(){
  var search_list = $("#user-search-result")
  var chat_member_list = $("#chat-group-users")
  function appendUser(user) {
    var html =`
  <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <a class="add_button" data-user-id=${user.id} data-user-name=${user.name}>
    追加</a>

  </div>
      `
    search_list.append(html);
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
  <div id="chat-group-users">
    <div class="chat-group-user clearfix" id="chat-group-user-22">
      <input class="chat-group-users__input" name="chat_group[user_ids][]" type="hidden" value="22">
      <p class="chat-group-current-user__name">
        ${member_name}<a class="delete_button" data-user-id=${member_id} data-user-name=${member_name}>削除</a>
      </p>
    </div>
  </div>`
  chat_member_list.append(html)
  }

  function removeMember(member_name, member_id){
    `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
  <input name='group[user_ids][]' type='hidden' value=${member_name}>
  <p class='chat-group-user__name'>${member_name}</p>
  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
</div>`
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
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendUser(user);
      $(document).on("click", ".add_button", function () {
        $(this).parent().remove()
      })
     })
    }
    else {
      appendErrMsgToHTML("一致するユーザー名はありません")
     }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
      location.reload();
    });
   });
   $(document).on("click", ".add_button", function () {
    var chat_member_name = $(this).attr("data-user-name")
    var chat_member_id = $(this).attr("data-user-id")
    appendMember(chat_member_name,chat_member_id);
    $(this).parent().remove()
   });
   $(document).on("click", ".delete_button", function(){
     var chat_member = $(this).attr("data-user-name")
     var chat_member_id = $(this).attr("data-user-id")
     removeMember(chat_member, chat_member_id)
     $(this).parent().remove()
     });
});
