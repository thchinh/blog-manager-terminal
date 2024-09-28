const fs = require('fs');
const path = require('path');

// Path to the JSON file containing the data
const dataFilePath = path.join(__dirname, '../data/posts.json');

// Read data from the JSON file
function readData() {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
}

// Write data to file JSON
function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Display the list of posts
function displayPosts() {
  const data = readData();
  console.table(data.posts);
}

// Add a new post
function addPost(post) {
  const data = readData();
  post.id = data.posts.length + 1; // Auto-incrment for id
  data.posts.push(post);
  writeData(data);
  console.log('Bài viết mới đã được thêm.');
}

// Update a post
function editPost(id, updatedPost) {
  const data = readData();
  const postIndex = data.posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    console.log('Không tìm thấy bài viết với ID này.');
    return;
  }
  data.posts[postIndex] = { ...data.posts[postIndex], ...updatedPost };
  writeData(data);
  console.log('Bài viết đã được cập nhật.');
}

// Delete a post
function deletePost(id) {
  const data = readData();
  const updatedPosts = data.posts.filter((post) => post.id !== id);
  if (updatedPosts.length === data.posts.length) {
    console.log('Không tìm thấy bài viết với ID này.');
    return;
  }
  data.posts = updatedPosts;
  writeData(data);
  console.log('Bài viết đã được xóa.');
}

// Filter post by the category
function filterByTopic(topic) {
  const data = readData();
  const filteredPosts = data.posts.filter((post) => post.topic === topic);
  console.table(filteredPosts);
}

// Arrange post by date
function sortByDate(order = 'asc') {
  const data = readData();
  const sortedPosts = data.posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
  console.table(sortedPosts);
}

// Search post by keyword
function searchPosts(keyword) {
  const data = readData();
  const filteredPosts = data.posts.filter(
    (post) => post.title.includes(keyword) || post.content.includes(keyword)
  );
  console.table(filteredPosts);
}

module.exports = {
  displayPosts,
  addPost,
  editPost,
  deletePost,
  filterByTopic,
  sortByDate,
  searchPosts,
};
