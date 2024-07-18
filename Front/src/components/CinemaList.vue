<template>
  <div class="events container">
    <!-- Sección de Películas -->
    <div class="movies">
      <h2 class="subtitle is-3">Películas</h2>
      <swiper :slides-per-view="4" :space-between="30" navigation>
        <swiper-button-prev class="swiper-button-prev"></swiper-button-prev>
        <swiper-button-next class="swiper-button-next"></swiper-button-next>
        <swiper-slide v-for="movie in movies" :key="movie.id">
          <div class="movie-card" :style="{ backgroundColor: movie.color }">
            <h2 class="title is-4 has-text-black">{{ movie.name }}</h2>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Sección de Cartelera -->
    <div class="billboard">
      <h2 class="subtitle is-3">Observa Nuestra Cartelera del Día de Hoy</h2>
      <swiper :slides-per-view="4" :space-between="30" navigation>
        <swiper-button-prev class="swiper-button-prev"></swiper-button-prev>
        <swiper-button-next class="swiper-button-next"></swiper-button-next>
        <swiper-slide v-for="event in events" :key="event.id">
          <div class="movie-card" :style="{ backgroundColor: event.color }">
            <h2 class="title is-4 has-text-black">{{ event.name }}</h2>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Sección de Próximos Estrenos -->
    <div class="next-premieres">
      <h2 class="subtitle is-3">Próximos Estrenos</h2>
      <swiper :slides-per-view="4" :space-between="30" navigation>
        <swiper-button-prev class="swiper-button-prev"></swiper-button-prev>
        <swiper-button-next class="swiper-button-next"></swiper-button-next>
        <swiper-slide v-for="premiere in premieres" :key="premiere.id">
          <div class="movie-card" :style="{ backgroundColor: premiere.color }">
            <h2 class="title is-4 has-text-black">{{ premiere.name }}</h2>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, SwiperButtonPrev, SwiperButtonNext } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

export default {
  name: 'CinemaList',
  components: {
    Swiper,
    SwiperSlide,
    SwiperButtonPrev,
    SwiperButtonNext,
  },
  data() {
    return {
      movies: [
        { id: 1, name: 'Movie 1', color: '#ff0000' },
        { id: 2, name: 'Movie 2', color: '#00ff00' },
        { id: 3, name: 'Movie 3', color: '#0000ff' },
        { id: 4, name: 'Movie 4', color: '#ffff00' },
        { id: 5, name: 'Movie 5', color: '#ff00ff' },
        { id: 6, name: 'Movie 6', color: '#00ffff' },
      ],
      events: [
        { id: 1, name: 'Event 1', color: '#ff0000' },
        { id: 2, name: 'Event 2', color: '#00ff00' },
        { id: 3, name: 'Event 3', color: '#0000ff' },
        { id: 4, name: 'Event 4', color: '#ffff00' },
        { id: 5, name: 'Event 5', color: '#ff00ff' },
        { id: 6, name: 'Event 6', color: '#00ffff' },
      ],
      premieres: [
        { id: 1, name: 'Premiere 1', color: '#ff0000' },
        { id: 2, name: 'Premiere 2', color: '#00ff00' },
        { id: 3, name: 'Premiere 3', color: '#0000ff' },
        { id: 4, name: 'Premiere 4', color: '#ffff00' },
        { id: 5, name: 'Premiere 5', color: '#ff00ff' },
        { id: 6, name: 'Premiere 6', color: '#00ffff' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.events {
  margin-top: 50px;
  text-align: center;
  color: #fff; /* Color de texto claro para fondos oscuros */
}

.movie-card {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
}

.movies,
.billboard,
.next-premieres {
  margin-bottom: 50px;
}

.subtitle,
.title {
  color: #fffefe; /* Cambio de color del texto a negro */
  margin-bottom: 20px;
}

.swiper-button-prev,
.swiper-button-next {
  color: #fff; /* Color de las flechas de navegación */
}

.swiper-button-prev::before,
.swiper-button-next::before {
  font-size: 20px; /* Tamaño de la flecha */
}

.swiper-button-next {
  right: 10px; /* Ajuste de posición de la flecha siguiente */
}
</style>









