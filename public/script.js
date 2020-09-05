
$('form.createPost').on('submit', async (event) => {
  event.preventDefault();
  if ($('form input:text').length == 0) {
    console.log("empty");
    return;
  }
  return;
  await axios.post('/api/post/create', {
    text: $('input.createPost').text,
    access_token: "gsgegsr",
  })
  .then(d => console.log(d.data))
  .catch(d => console.log(d.data));
})