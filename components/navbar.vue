<template>
    <nav class="navbar  px-3 py-2 ">
      <div class="container-fluid d-flex justify-content-end  align-items-center">
        <div class="d-flex justify-content-between gap-4 align-items-center"> 
            <span  class="tour">Take a tour</span>
            <div class="d-flex align-items-center">
            <button class="btn position-relative me-3">
                <i class="bi bi-envelope fs-5"></i>
                <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>
            <button class="btn me-3">
                <i class="bi bi-bell fs-5"></i>
            </button>
            <img src="/profile-img.png" alt="User Avatar" class="rounded-circle" width="40" height="40" />
            </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style>
    .tour {
        color: rgba(56, 47, 144, 0.6); 
        font-size: 18px;
        font-weight: 900;
    }

  </style>
  