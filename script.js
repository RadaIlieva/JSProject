document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');
    const text = document.querySelector('.textarea');
    const driverImage = document.querySelector('.drivers-image');
    const backgroundPhoto = document.querySelector('body');

    function registerUser(username, email, password) {
        if (username.length < 4) {
            alert("Username must be at least 4 characters.");
            return;
        }
    
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
            alert("Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit.");
            return;
        }
    
        const newUser = { username: username, email: email, password: password };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = 'News.html';
    }
    
    function validateEmail(email) {
        return email.includes('@');
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
        driverImage.style.display = 'none';
    });

    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
        text.style.position = 'absolute';
        text.style.left = '200px';
        driverImage.style.display = 'none';
    });

    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
        text.style.display = 'block';
        driverImage.style.display = 'block';
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
