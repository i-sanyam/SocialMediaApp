async function loadPosts(is_home) {
		let posts = await axios.post('/api/post/get', {
			limit: 25,
			offset: 0,
			home_feed: is_home, // home or explore
		});
		console.log(posts.data)
		posts = posts.data.data;
		console.log(posts); // remove
		for (const post of posts) {
			$("#content").append(
				$(`<div class="m-2 my-5">
                <article>
                    <div id="header">
                        <h2>${post.title}</h2>
                        <h5 class="text-muted">by ${post.first_name}</h5>
                        <p>
                            ${post.text.substr(
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
