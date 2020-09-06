async function loadPosts() {
		let posts = await axios.post('/api/post/get', {
			limit: 25,
			offset: 0,
			home_feed: true, // home or explore
		});
		posts = posts.data.data;
		for (const post of posts) {
			// console.log(post);
			$("#content").append(
				$(`<div class="m-2 my-5">
                <article>
                    <div id="header">
                        <h2>${post.title}</h2>
                        <h5 class="text-muted">by ${post.user.username}</h5>
                        <p>
                            ${post.body.substr(
															0,
															200
														)}... <a href="">read more</a>
                        </p>
                    </div>
                </article>
            </div>`)
			);
		}
}
