<template>
  <div class="events container">
    <!-- Sección de Películas -->
    <div class="movies">
      <h2 class="subtitle is-3">Películas</h2>
      <swiper :slides-per-view="4" :space-between="30" navigation>
        <swiper-button-prev class="swiper-button-prev"></swiper-button-prev>
        <swiper-button-next class="swiper-button-next"></swiper-button-next>
        <swiper-slide v-for="movie in movies" :key="movie.id_pelicula">
          <CinemaCard :event="movie" />
        </swiper-slide>
      </swiper>
    </div>

    <!-- Sección de Cartelera -->
    <div class="billboard">
      <h2 class="subtitle is-3">Observa Nuestra Cartelera del Día de Hoy</h2>
      <swiper :slides-per-view="4" :space-between="30" navigation>
        <swiper-button-prev class="swiper-button-prev"></swiper-button-prev>
        <swiper-button-next class="swiper-button-next"></swiper-button-next>
        <swiper-slide v-for="event in events" :key="event.id_cartelera">
          <CinemaCard :event="event" />
        </swiper-slide>
      </swiper>
    </div>

    <!-- Sección de Próximos Estrenos -->
    <div class="next-premieres">
      <h2 class="subtitle is-3">Próximos Estrenos</h2>
      <swiper :slides-per-view="4" :space-between="30" navigation>
        <swiper-button-prev class="swiper-button-prev"></swiper-button-prev>
        <swiper-button-next class="swiper-button-next"></swiper-button-next>
        <swiper-slide v-for="premiere in premieres" :key="premiere.id_cartelera">
          <CinemaCard :event="premiere" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, SwiperButtonPrev, SwiperButtonNext } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';
import CinemaCard from './CinemaCard.vue';

SwiperCore.use([Navigation]);

export default {
  name: 'CinemaList',
  components: {
    Swiper,
    SwiperSlide,
    SwiperButtonPrev,
    SwiperButtonNext,
    CinemaCard
  },
  data() {
    return {
      movies: [],
      events: [],
      premieres: [],
    };
  },
  async created() {
    try {
      const [moviesResponse, eventsResponse, premieresResponse] = await Promise.all([
        fetch('http://localhost:3000/api/movies'),
        fetch('http://localhost:3000/api/cartelera/type/Cartelera'),
        fetch('http://localhost:3000/api/cartelera/type/Próximo estreno')
      ]);

      this.movies = await moviesResponse.json();
      this.events = await eventsResponse.json();
      this.premieres = await premieresResponse.json();
      
      console.log('Movies:', this.movies);
      console.log('Events:', this.events);
      console.log('Premieres:', this.premieres);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  },
  methods: {
    goToMovieDetails(id, type) {
      this.$router.push({ name: 'MovieDetails', params: { id }, query: { type } }).catch(error => {
        console.error('Redirection to MovieDetails failed:', error);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.events {
  margin-top: 50px;
  text-align: center;
  color: #fff; 
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
  color: #fffefe; 
  margin-bottom: 20px;
}

.swiper-button-prev,
.swiper-button-next {
  color: #fff; 
}

.swiper-button-prev::before,
.swiper-button-next::before {
  font-size: 20px; 
}

.swiper-button-next {
  right: 10px; 
}
</style>
