 // Mock Data for Blog Posts
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with HTML5 Semantic Elements",
        excerpt: "Learn how to use the new semantic elements in HTML5 to create more meaningful and accessible web pages.",
        category: "html",
        author: "John Doe",
        date: "May 12, 2023",
        readTime: "5 min read",
        image: "https://source.unsplash.com/random/600x400/?html"
    },
    {
        id: 2,
        title: "CSS Grid vs Flexbox: When to Use Which",
        excerpt: "A comprehensive guide to understanding the differences between CSS Grid and Flexbox and when to use each layout system.",
        category: "css",
        author: "Jane Smith",
        date: "May 8, 2023",
        readTime: "7 min read",
        image: "https://source.unsplash.com/random/600x400/?css"
    },
    {
        id: 3,
        title: "Modern JavaScript Features You Should Know",
        excerpt: "Explore the latest JavaScript features including optional chaining, nullish coalescing, and more.",
        category: "javascript",
        author: "Mike Johnson",
        date: "May 5, 2023",
        readTime: "10 min read",
        image: "https://source.unsplash.com/random/600x400/?javascript"
    },
    {
        id: 4,
        title: "The Principles of Good UI/UX Design",
        excerpt: "Learn the fundamental principles that every designer should follow to create intuitive and user-friendly interfaces.",
        category: "uiux",
        author: "Sarah Williams",
        date: "April 28, 2023",
        readTime: "8 min read",
        image: "https://source.unsplash.com/random/600x400/?design"
    },
    {
        id: 5,
        title: "Responsive Web Design Best Practices",
        excerpt: "Essential techniques and strategies for creating websites that look great on all devices.",
        category: "css",
        author: "David Brown",
        date: "April 22, 2023",
        readTime: "6 min read",
        image: "https://source.unsplash.com/random/600x400/?responsive"
    },
    {
        id: 6,
        title: "Building Accessible Web Applications",
        excerpt: "How to ensure your web applications are accessible to all users, including those with disabilities.",
        category: "html",
        author: "Emily Davis",
        date: "April 18, 2023",
        readTime: "9 min read",
        image: "https://source.unsplash.com/random/600x400/?accessibility"
    },
    {
        id: 7,
        title: "React Hooks: A Complete Guide",
        excerpt: "Master React Hooks with this comprehensive guide covering useState, useEffect, and custom hooks.",
        category: "javascript",
        author: "Robert Wilson",
        date: "April 15, 2023",
        readTime: "12 min read",
        image: "https://source.unsplash.com/random/600x400/?react"
    },
    {
        id: 8,
        title: "CSS Animations for Beginners",
        excerpt: "Learn how to create smooth and performant animations using pure CSS.",
        category: "css",
        author: "Lisa Taylor",
        date: "April 10, 2023",
        readTime: "5 min read",
        image: "https://source.unsplash.com/random/600x400/?animation"
    }
];

// DOM Elements
const blogGrid = document.getElementById('blog-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const themeToggle = document.querySelector('.theme-toggle');
const scrollTopBtn = document.querySelector('.scroll-top');
const searchInput = document.querySelector('.search-box input');

// Initialize the blog
function initBlog() {
    displayPosts(blogPosts);
    setupEventListeners();
}

// Display posts in the grid
function displayPosts(posts) {
    blogGrid.innerHTML = '';
    
    if (posts.length === 0) {
        blogGrid.innerHTML = '<p class="no-posts">No posts found matching your criteria.</p>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-card';
        postElement.innerHTML = `
            <div class="card-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="card-content">
                <span class="category ${post.category}">${post.category.toUpperCase()}</span>
                <h3>${post.title}</h3>
                <div class="card-meta">
                    <span class="author">By ${post.author}</span>
                    <span class="date">${post.date}</span>
                </div>
                <p class="card-excerpt">${post.excerpt}</p>
                <div class="card-footer">
                    <span class="read-time">${post.readTime}</span>
                    <button class="bookmark-btn" data-id="${post.id}">
                        <i class="far fa-bookmark"></i>
                    </button>
                </div>
            </div>
        `;
        blogGrid.appendChild(postElement);
    });
    
    // Add event listeners to bookmark buttons
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.addEventListener('click', toggleBookmark);
    });
}

// Filter posts by category
function filterPosts(category) {
    if (category === 'all') {
        displayPosts(blogPosts);
        return;
    }
    
    const filteredPosts = blogPosts.filter(post => post.category === category);
    displayPosts(filteredPosts);
}

// Search posts by keyword
function searchPosts(keyword) {
    if (!keyword) {
        displayPosts(blogPosts);
        return;
    }
    
    const searchedPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(keyword.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(keyword.toLowerCase())
    );
    displayPosts(searchedPosts);
}

// Toggle bookmark
function toggleBookmark(e) {
    const btn = e.currentTarget;
    btn.classList.toggle('active');
    btn.innerHTML = btn.classList.contains('active') ? 
        '<i class="fas fa-bookmark"></i>' : 
        '<i class="far fa-bookmark"></i>';
    
    const postId = btn.getAttribute('data-id');
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    if (btn.classList.contains('active')) {
        if (!bookmarks.includes(postId)) {
            bookmarks.push(postId);
        }
    } else {
        bookmarks = bookmarks.filter(id => id !== postId);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Toggle mobile menu
function toggleMenu() {
    navList.classList.toggle('active');
    hamburger.innerHTML = navList.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
}

// Toggle theme
function toggleTheme() {
    document.body.setAttribute('data-theme', 
        document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    
    themeToggle.innerHTML = document.body.getAttribute('data-theme') === 'dark' ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
    
    localStorage.setItem('theme', document.body.getAttribute('data-theme'));
}

// Check scroll position for scroll-to-top button
function checkScroll() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Setup event listeners
function setupEventListeners() {
    // Category filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterPosts(button.getAttribute('data-category'));
        });
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMenu);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Scroll events
    window.addEventListener('scroll', checkScroll);
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchPosts(e.target.value);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && !e.target.closest('.hamburger')) {
            navList.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    themeToggle.innerHTML = savedTheme === 'dark' ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
}

// Initialize bookmarks from localStorage
function initBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.forEach(id => {
        const btn = document.querySelector(`.bookmark-btn[data-id="${id}"]`);
        if (btn) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-bookmark"></i>';
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initBlog();
    initBookmarks();
});
