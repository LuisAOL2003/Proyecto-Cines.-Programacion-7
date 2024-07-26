<!-- Footer.vue -->
<template>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Cinecity</strong> by <a href="#">Your Company</a>. All rights reserved.
        </p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped lang="scss">
  .footer {
    background-color: #2c3e50; /* Fondo oscuro para mejorar contraste */
    padding: 1rem 0;
    color: #ffffff; /* Texto blanco */
    .content {
      p {
        margin: 0;
        font-weight: bold;
        a {
          color: #d88d00;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  </style>
  