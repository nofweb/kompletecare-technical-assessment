<template>
    <div > 
      <ul class="nav flex-column mt-4 py-4">
        <li v-for="(item, index) in menuItems" :key="index" class="nav-item mb-2">
          <a href="#" class="nav-link" :class="{ active: item.active }">
            <i :class="item.icon + ' me-2'"></i>
            {{ item.label }}
          </a>
        </li>
        <hr />
        <li v-for="(item, index) in settingsItems" :key="'settings-' + index" class="nav-item mb-2">
          <a href="#" class="nav-link">
            <i :class="item.icon + ' me-2'"></i>
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const menuItems = [
    { label: "Dashboard", icon: "bi bi-grid-fill", active: true },
    { label: "Profile", icon: "bi bi-person", active: false },
    { label: "Services", icon: "bi bi-box", active: false },
    { label: "Medical Records", icon: "bi bi-clipboard", active: false },
    { label: "Care Wallet", icon: "bi bi-wallet2", active: false },
    { label: "Messages", icon: "bi bi-chat-left-text", active: false },
    { label: "Resources", icon: "bi bi-journal-bookmark", active: false },
  ];
  
  const settingsItems = [
    { label: "Account Settings", icon: "bi bi-gear" },
    { label: "Contact Support", icon: "bi bi-life-preserver" },
    { label: "Logout", icon: "bi bi-box-arrow-right" },
  ];
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    height: 100vh;
  }
  
  .nav-link {
    color: #A0A0A0;
  }
  
  .nav-link.active {
    color: white !important;
    height: 56px;
    display: flex;
    align-items: center;
    background-color: #2A36A4 !important;
    border-radius: 5px;
  }
  
  .nav-link:hover {
    color: #0d6efd;
  }
  </style>
  