document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');
    const videoContainer = document.querySelector('.video-container');
    const infoContainer = document.querySelector('.container');
    const backgroundPhoto = document.querySelector('body');

    function registerUser(username, email, password) {
        const newUser = { username: username, email: email, password: password };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = 'News.html';
    }

    function loginUser(email, password) {
        const hardcodedUser = { email: 'user1@example.com', password: 'password1' };
        if (email === hardcodedUser.email && password === hardcodedUser.password) {
            window.location.href = 'News.html';
        } else {
            alert('Wrong email or password!');
        }
    }

    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
        infoContainer.style.display = 'none';
        backgroundPhoto.style.backgroundImage = 'url("photos/p13.jpg")';
    });

    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
        videoContainer.style.display = 'none';
        infoContainer.style.display = 'none';
        backgroundPhoto.style.backgroundImage = 'url("photos/p13.jpg")';
    });

    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
        videoContainer.style.display = 'block';
        infoContainer.style.display = 'block';
        backgroundPhoto.style.backgroundImage = 'url("photos/p13.jpg")';
    });

    document.querySelector('.register form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        registerUser(username, email, password);
    });
    document.querySelector('.login form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        loginUser(email, password);
    });
});
