<template>
    <div class="home">
      <NavAdmin />
      <section class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Bienvenido A la Pagina Oficial de CineCity</h1>
            <h2 class="subtitle">
              Administra tus peliculas favoritas y sus horarios
            </h2>
            <div class="button-block">
              <button class="button is-dark" @click="addMovie">
                Agregar Película
              </button>
              <button class="button is-dark" @click="addSchedule">
                Asignar Funcion
              </button>
            </div>
          </div>
        </div>
      </section>
      <EventsList />
    </div>
  </template>
  
  <script>
  import EventsList from '../components/CinemaList';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AdminRegistered',
    components: {
      EventsList,
    },
    setup() {
      const router = useRouter();
  
      function addMovie() {
        router.push('/movie-create'); // Redirige a la vista de creación de películas
      }
  
      function addSchedule() {
        console.log('Agregar Horario');
        // Implementa la lógica para agregar horario aquí
      }
  
      return {
        addMovie,
        addSchedule,
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .home {
    .hero {
      text-align: center;
      background-image: url('https://media.timeout.com/images/101720689/1024/576/image.webp');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      height: 400px; // Ajusta la altura según sea necesario
      display: flex;
      align-items: center;
      justify-content: center;
  
      .hero-body {
        padding: 20px;
  
        .title {
          text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
          font-size: 2.5rem;
          padding: 20px 0;
  
          @media (min-width: 768px) {
            font-size: 4rem;
          }
  
          @media (min-width: 1024px) {
            font-size: 5rem;
          }
        }
  
        .subtitle {
          text-shadow: 4px 4px 4px rgba(255, 255, 255, 0.7);
          font-size: 1.5rem;
  
          @media (min-width: 768px) {
            font-size: 2rem;
          }
  
          @media (min-width: 1024px) {
            font-size: 2.5rem;
          }
        }
  
        .button-block {
          display: flex;
          justify-content: center;
          gap: 20px; /* Agrega espacio entre los botones */
          margin-top: 20px;
  
          .button {
            font-size: 1.25rem; /* Aumenta el tamaño de la fuente */
            padding: 15px 30px; /* Aumenta el padding */
  
            @media (min-width: 768px) {
              font-size: 1.5rem; /* Aumenta el tamaño de la fuente en pantallas más grandes */
              padding: 15px 30px; /* Aumenta el padding en pantallas más grandes */
            }
  
            @media (min-width: 1024px) {
              font-size: 1.75rem; /* Aumenta el tamaño de la fuente en pantallas aún más grandes */
              padding: 15px 30px; /* Aumenta el padding en pantallas aún más grandes */
            }
          }
        }
      }
    }
  }
  </style>
  