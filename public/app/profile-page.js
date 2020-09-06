
async function clickFollowButton(is_follow, requested_id) {    
    let followButton = document.getElementById('followButton');
  // hide button if same user
  console.log('aaaa');
  console.log(is_follow, requested_id);
  await axios.post('/api/user/follow', { is_follow: !+followButton.value, requested_id: requested_id.toString() });

  if (+followButton.value == 0) {
    followButton.value = 1;
    followButton.innerText = "Following";
  } else if (+followButton.value == 1) {
    followButton.value = 0;
    followButton.innerText = "Follow"
  }
}

async function loadProfile(user_id) {
  let profile = await axios.post('/api/user/profile', {is_posts: true, user_id: user_id.toString()});
  
  profile = profile.data.data;

    $("#content").html(
      $(`<div class="m-2 my-5">
              <article>
                  <div id="header" style="display=inline;">
                      <h2>${profile.first_name} ${profile.last_name ? profile.last_name : '' }</h2>
                      <p>${profile.username}</p>
                      <button id="followButton" class="btn btn-primary" value="${profile.is_follow}" onclick="clickFollowButton(${profile.is_follow},${user_id})">${profile.is_follow ? 'Following':'Follow'}</button>
                  </div>
              </article>
          </div>`)
    );
}
