let followButton;
function clickFollowButton(is_follow) {
  // hide button if same user
  if (is_follow == 0) {
    followButton.value = 1;
    followButton.innerText = "Following";
  } else if (is_follow == 1) {
    followButton.value = 0;
    followButton.innerText = "Follow"
  }
  console.log('I am clicked', is_follow);
}
async function loadProfile(user_id) {
  let profile = await axios.post('/api/user/profile', {user_id: user_id.toString()});
  profile = profile.data.data;
  console.log(profile);
  
    $("#content").append(
      $(`<div class="m-2 my-5">
              <article>
                  <div id="header" style="display=inline;">
                      <h2>${profile.first_name} ${profile.last_name}</h2>
                      <p>${profile.username}</p>
                      <button id = "followButton" class = "btn btn-primary" onclick="clickFollowButton(value)" value='0'>Follow</button>
                  </div>
              </article>
          </div>`)
    );
    followButton = document.getElementById('followButton');
}
