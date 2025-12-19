
const videos = [
  {
    id: 1,
    title: "Building a Modern Web Application with React and TypeScript",
    channel: "Tech Tutorials",
    channelInitial: "channel1",
    duration: "15:32",
    views: "1.2M views",
    uploadedAt: "2 days ago",
    category: "learning",
    thumbnail: "images/thumb1.png"
  },
  {
    id: 2,
    title: "Amazing Nature Documentary - Wildlife in the Amazon Rainforest",
    channel: "Nature Channel",
    channelInitial: "channel2",
    duration: "45:21",
    views: "5.8M views",
    uploadedAt: "1 week ago",
    category: "all",
    thumbnail: "images/thumb2.png"
  },
  {
    id: 3,
    title: "Learn Guitar in 30 Days - Complete Beginner Course",
    channel: "Music Masters",
    channelInitial: "channel3",
    duration: "2:15:44",
    views: "892K views",
    uploadedAt: "3 weeks ago",
    category: "music",
    thumbnail: "images/thumb3.png"
  },
  {
    id: 4,
    title: "Top 10 Gaming Moments of 2024 - Epic Compilation",
    channel: "Gaming Zone",
    channelInitial: "channel4",
    duration: "22:18",
    views: "3.4M views",
    uploadedAt: "5 days ago",
    category: "gaming",
    thumbnail: "images/thumb4.png"
  },
  {
    id: 5,
    title: "Cooking the Perfect Steak - Chef's Secret Recipe Revealed",
    channel: "Culinary Arts",
    channelInitial: "channel5",
    duration: "12:45",
    views: "2.1M views",
    uploadedAt: "1 day ago",
    category: "cooking",
    thumbnail: "images/thumb5.png"
  },
  {
    id: 6,
    title: "Breaking News: Latest Updates from Around the World Today",
    channel: "Global News",
    channelInitial: "channel6",
    duration: "8:30",
    views: "4.7M views",
    uploadedAt: "3 hours ago",
    category: "news",
    thumbnail: "images/thumb6.png"
  },
  {
    id: 7,
    title: "Fitness Challenge - 30 Day Body Transformation Journey",
    channel: "Fit Life",
    channelInitial: "channel7",
    duration: "18:22",
    views: "1.8M views",
    uploadedAt: "4 days ago",
    category: "sports",
    thumbnail: "images/thumb7.png"
  },
  {
    id: 8,
    title: "Travel Vlog: Exploring the Streets of Tokyo at Night",
    channel: "Wanderlust",
    channelInitial: "channel8",
    duration: "28:15",
    views: "956K views",
    uploadedAt: "2 weeks ago",
    category: "all",
    thumbnail: "images/thumb8.png"
  },
  {
    id: 9,
    title: "The Science of Sleep - Why We Need 8 Hours Every Night",
    channel: "Science Explained",
    channelInitial: "channel9",
    duration: "16:48",
    views: "2.3M views",
    uploadedAt: "6 days ago",
    category: "learning",
    thumbnail: "images/thumb9.png"
  },
  {
    id: 10,
    title: "DIY Home Renovation - Transform Your Living Room on a Budget",
    channel: "Home Makeover",
    channelInitial: "channel10",
    duration: "35:12",
    views: "1.5M views",
    uploadedAt: "1 week ago",
    category: "all",
    thumbnail: "images/thumb10.png"
  },
  {
    id: 11,
    title: "Stand-Up Comedy Special - Laugh Out Loud Moments",
    channel: "Comedy Central",
    channelInitial: "channel11",
    duration: "58:30",
    views: "7.2M views",
    uploadedAt: "3 days ago",
    category: "all",
    thumbnail: "images/thumb11.png"
  },
  {
    id: 12,
    title: "Electric Cars Explained - The Future of Transportation",
    channel: "Auto Weekly",
    channelInitial: "channel12",
    duration: "24:56",
    views: "1.1M views",
    uploadedAt: "5 days ago",
    category: "learning",
    thumbnail: "images/thumb12.png"
  }
];


const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const videoGrid = document.getElementById('videoGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryBar = document.getElementById('categoryBar');


let sidebarExpanded = window.innerWidth >= 1280;
let currentCategory = 'all';
let searchQuery = '';


function init() {
  updateSidebarState();
  renderVideos();
  setupEventListeners();
}


function updateSidebarState() {
  if (sidebarExpanded && window.innerWidth > 768) {
    sidebar.classList.add('expanded');
    mainContent.classList.add('sidebar-expanded');
  } else {
    sidebar.classList.remove('expanded');
    mainContent.classList.remove('sidebar-expanded');
  }
}


function toggleSidebar() {
  sidebarExpanded = !sidebarExpanded;
  updateSidebarState();
}


function renderVideos() {
  let filteredVideos = [...videos];

 

  
  if (currentCategory !== 'all') {
    filteredVideos = filteredVideos.filter(video => 
      video.category === currentCategory || video.category === 'all'
    );
  }

  
  if (filteredVideos.length === 0) {
    videoGrid.innerHTML = `
      <div class="no-results">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <h3>No results found</h3>
        <p>Try different keywords or remove search filter</p>
      </div>
    `;
    return;
  }

  
  videoGrid.innerHTML = filteredVideos.map(video => `
    <a href="#" class="video-card" data-id="${video.id}">
      <div class="thumbnail-container">
        <img 
          class="thumbnail" 
          src="${video.thumbnail}" 
          alt="${video.title}"
          loading="lazy"
        >
        <span class="duration-badge">${video.duration}</span>
      </div>
      <div class="video-info">
 <img class="channel-avatar" src="channel-images/${video.channelInitial}.png" alt="channel avatar">

        <div class="video-details">
          <h3 class="video-title">${video.title}</h3>
          <p class="channel-name">${video.channel}</p>
          <p class="video-meta">${video.views} · ${video.uploadedAt}</p>
        </div>
      </div>
    </a>
  `).join('');
}


function setupEventListeners() {
  
  menuBtn.addEventListener('click', toggleSidebar);

  
  searchBtn.addEventListener('click', performSearch);

  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  
  categoryBar.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) {
      
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      
      
      currentCategory = chip.dataset.category;
      renderVideos();
    }
  });

  
  window.addEventListener('resize', handleResize);

  
 

  
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}


function performSearch() {
  searchQuery = searchInput.value;
  renderVideos();
}


function handleResize() {
  if (window.innerWidth >= 1280) {
    sidebarExpanded = true;
  } else if (window.innerWidth < 768) {
    sidebarExpanded = false;
  }
  updateSidebarState();
}


document.addEventListener('DOMContentLoaded', init);
