<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Bienvenido A la Pagina Oficial de CineCity</h1>
          <h2 class="subtitle">
            Asegurate de Comprar tus entradas hoy!
          </h2>
          <div class="button-block">
            <button @click="goToLogin" class="button is-xl is-dark">
              Inicia Sesion para comprar tus boletos: 
            </button>
          </div>
        </div>
      </div>
    </section>
    <EventsList />
  </div>
</template>

<script>
import EventsList from '../components/CinemaList.vue';

export default {
  name: 'home',
  components: {
    EventsList,
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    }
  }
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
        margin-top: 20px;

        .button {
          font-size: 1rem;
          padding: 10px 20px;

          @media (min-width: 768px) {
            font-size: 1.5rem;
            padding: 15px 30px;
          }

          @media (min-width: 1024px) {
            font-size: 2rem;
            padding: 20px 40px;
          }
        }
      }
    }
  }
}
</style>
