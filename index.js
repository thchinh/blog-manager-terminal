const readlineSync = require('readline-sync');
const {
  displayPosts,
  addPost,
  editPost,
  deletePost,
  filterByTopic,
  sortByDate,
  searchPosts,
} = require("./utils/functions");

function showMenu() {
  console.log(`
    ==========================
    1. Display the list of post
    2. Add a new post
    3. Update a post
    4. Delete a post
    5. Filter post by category
    6. Arrange by updating date
    7. Search by multiple keyword
    0. Exit
    ==========================
    `);
}

function main() {
  let running = true;
  while (running) {
    showMenu();
    const choice = readlineSync.question("Choose the function: ");
    switch (choice) {
      case "1":
        displayPosts();
        break;
      case "2":
        const newPost = {
          title: readlineSync.question("Input title: "),
          content: readlineSync.question("Input content: "),
          topic: readlineSync.question("Input category: "),
          author: readlineSync.question("Input author: "),
          date: new Date().toISOString().split("T")[0],
        };
        addPost(newPost);
        break;
      case "3":
        const editId = parseInt(
          readlineSync.question("Input id of post need to update: ")
        );
        const updatedPost = {
          title: readlineSync.question("Input new title: "),
          content: readlineSync.question("Input new content: "),
          topic: readlineSync.question("Input new category: "),
          author: readlineSync.question("Input new author: "),
        };
        editPost(editId, updatedPost);
        break;
      case "4":
        const deleteId = parseInt(
          readlineSync.question("Input id of post need to delete: ")
        );
        deletePost(deleteId);
        break;
      case "5":
        const topic = readlineSync.question("Input category need to filter: ");
        filterByTopic(topic);
        break;
      case "6":
        const order = readlineSync.question("Arrange post by date (asc/desc): ");
        sortByDate(order);
        break;
      case "7":
        const keyword = readlineSync.question("Input keyword need to search: ");
        searchPosts(keyword);
        break;
      case "0":
        running = false;
        break;
      default:
        console.log("Your choose is invalid, please try again");
    }
  }
}

main();
