<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <nav :class="['sidebar bg-light text-dark', { 'sidebar-open': isSidebarOpen || isDesktop }]">
      <div class="d-flex justify-content-between align-items-center p-4">
        <button class="btn btn-outline-dark d-md-none" @click="toggleSidebar">
          <i class="bi bi-x-lg"></i> 
        </button>
      </div>
      <sidebar />
      
    </nav>

    <!-- Main content -->
    <div class="main-content flex-grow-1">
      <!-- Navbar (Only for Mobile) -->
      <nav class="navbar navbar-dark bg-light d-md-none">
        <button class="btn btn-outline-dark" @click="toggleSidebar">
          <i class="bi bi-list"></i> 
        </button>
        <navbar />
      </nav>

      <div class="container mt-3">
        <slot />
      </div>
    </div>

   
    <div v-if="isSidebarOpen && !isDesktop" class="overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isSidebarOpen = ref(false);
const isDesktop = ref(false); 

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const updateScreenSize = () => {
  if (typeof window !== "undefined") {
    isDesktop.value = window.innerWidth >= 768;
    if (isDesktop.value) isSidebarOpen.value = true; 
  }
};

onMounted(() => {
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<style scoped>
/* Sidebar styles */
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: -250px; 
  background-color: #f8f9fa; 
  overflow-y: auto;
  transition: left 0.3s ease-in-out;
  z-index: 1050; 
}

.sidebar-open {
  left: 0 !important;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5); 
  z-index: 1040; 
}

/* Main content */
.main-content {
  flex-grow: 1;
  width: 100%;
}

/* Desktop adjustments */
@media (min-width: 768px) {
  .sidebar {
    left: 0 !important;
  }

  .overlay {
    display: none;
  }

  .main-content {
    margin-left: 250px; 
  }
}
</style>
