let newsArray = [];
let commentData = {};

function getCurrentUserName() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        return currentUser.username;
    } else {
        return 'Anonymous';
    }
}

function insertUserNameInHeader() {
    const userNameElement = document.getElementById('user-name');
    userNameElement.textContent = getCurrentUserName();
}

document.addEventListener('DOMContentLoaded', function() {
    insertUserNameInHeader();
});


function toggleAddNewsForm() {
    const form = document.getElementById('addNewsForm');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

function addNews() {
    let title = document.getElementById('newsTitle').value;
    let fileInput = document.getElementById('newsImageURL');
    let imageURL = '';

    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();

        reader.onload = function(e) {
            imageURL = e.target.result;
            saveNews(title, imageURL);
        };

        reader.readAsDataURL(file);
    } else {
        alert("Please select an image.");
    }
    document.getElementById('addNewsForm').style.display = 'none';
}

function saveNews(title, imageURL) {
    let content = document.getElementById('newsContent').value;
    let date = new Date().toISOString();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!title || !imageURL || !content) {
        alert("Please fill in all fields.");
        return;
    }

    const newsObject = {
        title: title,
        imageURL: imageURL,
        content: content,
        date: date,
        author: currentUser ? currentUser.username : 'Anonymous', 
        comments: [] 
    };

    newsArray.push(newsObject);
    displayNews();
    saveData();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageURL = e.target.result;
        document.getElementById('previewImage').src = imageURL;
    };

    reader.readAsDataURL(file);
}

document.getElementById('imageUpload');

function displayNews() {
    const container = document.getElementById('newsContainer');
    container.innerHTML = '';

    
    newsArray.forEach((news, index) => { 
        const dateWithoutTime = new Date(news.date).toLocaleDateString('en-US');

        const newsHTML = `
            <div class="news" id="news-${index}">

                <button class="deleteButton" onclick="deleteNews(${index})"><i class = "fa fa-trash"></i></button>

                <h2>${news.title}</h2>
                <h3><i class="fa fa-user" aria-hidden="true"></i>Author: ${news.author}</h3>
                <h4>Added on: ${dateWithoutTime}</h4>
                <img src="${news.imageURL}" alt="News Image">
                    <div class="content-container">
                        <p>${news.content}</p>
                    </div>
            
                <div class ="buton-container">
                
                    <button class="commentButton" onclick="toggleCommentForm(${index})">Add Comment</button>
                    <button class="readComment" onclick="toggleComments(${index})">Read Comments</button>
                    <span class="counter" id="commentCountElement-${index}"></span>
                </div>

                    <div class ="commentHere-container" id="commentForm-${index}" style="display: none;">
                        <textarea id="commentText-${index}" placeholder="Type your comment here" style="width: 100%; height: 150px;"></textarea>
                        <button class="commentButton" onclick="addComment(${index})">Submit Comment</button>
                    </div>

                <div id="comments-${index}" style="display: none;"></div>
            </div>
        `;
        container.insertAdjacentHTML('afterbegin', newsHTML);
        displayComments(index);

        
        const commentCount = news.comments.length;
        const commentCountElement = document.getElementById(`commentCountElement-${index}`);
        commentCountElement.textContent = ` (${commentCount})`;
    });
}

function addComment(newsIndex) {
    const commentTextarea = document.getElementById(`commentText-${newsIndex}`);
    const commentText = commentTextarea.value.trim();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  

    if (!commentText) {
        alert("Enter your comment.");
        return;
    }

    const commentObject = {
        text: commentText,
        author: currentUser ? currentUser.username : 'Anonymous' 
    };

    const news = newsArray[newsIndex];
    news.comments.push(commentObject);
    displayComments(newsIndex);
    commentTextarea.value = '';

    const commentForm = document.getElementById(`commentForm-${newsIndex}`);
    commentForm.style.display = 'none';
    const addCommentButton = document.querySelector(`#news-${newsIndex} .commentButton`);
    addCommentButton.style.display = 'inline-block';
    const readCommentsButton = document.querySelector(`#news-${newsIndex} .readComment`);
    readCommentsButton.style.display = 'inline-block';

    updateCommentCount(newsIndex);
    saveData();
}




function updateCommentCount(newsIndex) {
    const news = newsArray[newsIndex];
    const commentCount = news.comments.length;
    const commentCountElement = document.getElementById(`commentCountElement-${newsIndex}`);
    commentCountElement.textContent = ` (${commentCount})`;
}

function toggleCommentForm(newsIndex) {
    const commentForm = document.getElementById(`commentForm-${newsIndex}`);
    if (commentForm.style.display === 'none' || commentForm.style.display === '') {
        commentForm.style.display = 'block';
    } else {
        commentForm.style.display = 'none';
    }
}

function toggleComments(newsIndex) {
    const commentsSection = document.getElementById(`comments-${newsIndex}`);
    const commentForm = document.getElementById(`commentForm-${newsIndex}`);
    const readCommentsButton = document.querySelector(`#news-${newsIndex} .readComment`);

    if (commentsSection.style.display === 'none' || commentsSection.style.display === '') {
        displayComments(newsIndex);
        commentsSection.style.display = 'block';
        commentForm.style.display = 'none';
        readCommentsButton.textContent = `Hide Comments`;
    } else {
        commentsSection.style.display = 'none';
        commentForm.style.display = 'none';
        readCommentsButton.textContent = 'Read Comments';
    }
}

function displayComments(newsIndex) {
    const commentsSection = document.getElementById(`comments-${newsIndex}`);
    commentsSection.innerHTML = '';

    const news = newsArray[newsIndex];
    news.comments.forEach(comment => {
        const commentHTML = `
            <div class="comment">
                <h3><i class="fa fa-user" ></i>Author: ${comment.author}</h3>
                <button class="deletеCommentButton" onclick="deleteComment(${newsIndex}, ${news.comments.indexOf(comment)})"><i class = "fa fa-trash"></i></button>
                <p>${comment.text}</p>
                
            </div>

        `;
        commentsSection.insertAdjacentHTML('beforeend', commentHTML);
    });

    commentsSection.classList.add('comments-container');
}

function deleteNews(newsIndex) {
    const news = newsArray[newsIndex];
    const isConfirmed = confirm(`Are you sure you want to delete the news titled "${news.title}"?`);
    
    if (isConfirmed) {
        newsArray.splice(newsIndex, 1);
        displayNews();
        saveData();
    }
}

function deleteComment(newsIndex, commentIndex) {
    const news = newsArray[newsIndex];
    const comment = news.comments[commentIndex];
    const isConfirmed = confirm(`Are you sure you want to delete this comment by ${comment.author}?`);
    
    if (isConfirmed) {
        news.comments.splice(commentIndex, 1);
        displayComments(newsIndex);
        updateCommentCount(newsIndex);
        saveData();
    }
}

function saveData() {
    const commentsToSave = {};
    newsArray.forEach((news, index) => {
        commentsToSave[index] = news.comments;
    });
    localStorage.setItem("newsData", JSON.stringify(newsArray));
    localStorage.setItem("commentData", JSON.stringify(commentsToSave));
}

function loadData() {
    const storedData = localStorage.getItem('newsData');
    if (storedData) {
        newsArray = JSON.parse(storedData);
        displayNews();
    }

    const storedComments = localStorage.getItem('commentData');
    if (storedComments) {
        commentData = JSON.parse(storedComments);
        restoreComments();
    }
}

function restoreComments() {
    for (const newsIndex in commentData) {
        newsArray[newsIndex].comments = commentData[newsIndex];
    }
    displayNews();
}

document.addEventListener('DOMContentLoaded', function() {
    loadData();
});
