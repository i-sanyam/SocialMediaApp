async function loadProfile(user_id) {
  let profile = await axios.post('/api/user/profile', {user_id: user_id.toString()});
  profile = profile.data.data;
  console.log(profile);
  
    $("#content").append(
      $(`<div class="m-2 my-5">
              <article>
                  <div id="header">
                      <h2>${profile.first_name} ${profile.last_name}</h2>
                      <!-- <h5 class="text-muted"></h5> -->
                      <p>
                          
                      </p>
                  </div>
              </article>
          </div>`)
    );
}
