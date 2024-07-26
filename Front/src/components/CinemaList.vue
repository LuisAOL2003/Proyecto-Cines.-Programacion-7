<template>
  <div class="events container">
    <h2 class="subtitle is-3">Observa Nuestra Cartelera del Día de Hoy</h2>
    <div class="columns is-multiline">
      <div v-for="event in events" :key="event.id" class="column is-one-quarter">
        <router-link :to="'/event/' + event.id">
          <EventCard :event="event" />
        </router-link>
      </div>
    </div>

    <!-- Nueva sección de Próximos estrenos con más separación -->
    <div class="next-premieres">
      <h2 class="subtitle is-3">Próximos Estrenos</h2>
      <div class="columns is-multiline">
        <div v-for="event in premieres" :key="event.id" class="column is-one-quarter">
          <router-link :to="'/event/' + event.id">
            <EventCard :event="event" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/CinemaCard';

export default {
  name: 'EventsList',
  components: {
    EventCard,
  },
  data() {
    return {
      events: [
        {
          id: 1,
          name: 'Star Wars',
          category: 'Science Fiction',
          description: 'A long time ago in a galaxy far, far away...',
          featuredImage: 'URL_DE_LA_IMAGEN_1',
          location: 'Cinema 1',
          date: '2024-07-14',
          time: '19:00',
        },
        {
          id: 2,
          name: 'John Wick',
          category: 'Action',
          description: 'An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
          featuredImage: 'URL_DE_LA_IMAGEN_2',
          location: 'Cinema 2',
          date: '2024-07-15',
          time: '20:00',
        },
        {
          id: 3,
          name: 'My Little Pony',
          category: 'Animation',
          description: 'A magical adventure with your favorite ponies.',
          featuredImage: 'URL_DE_LA_IMAGEN_3',
          location: 'Cinema 3',
          date: '2024-07-16',
          time: '10:00',
        },
      ],
      premieres: [
        {
          id: 4,
          name: 'Spider-Man: No Way Home',
          category: 'Superhero',
          description: 'Spider-Man faces his greatest challenge yet.',
          featuredImage: 'URL_DE_LA_IMAGEN_4',
          location: 'Cinema 4',
          date: '2024-07-17',
          time: '18:00',
        },
        {
          id: 5,
          name: 'Avatar 2',
          category: 'Science Fiction',
          description: 'Return to the world of Pandora.',
          featuredImage: 'URL_DE_LA_IMAGEN_5',
          location: 'Cinema 5',
          date: '2024-07-18',
          time: '21:00',
        },
        {
          id: 6,
          name: 'Jurassic World: Dominion',
          category: 'Adventure',
          description: 'Dinosaurs walk the Earth once more.',
          featuredImage: 'URL_DE_LA_IMAGEN_6',
          location: 'Cinema 6',
          date: '2024-07-19',
          time: '17:00',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.events {
  margin-top: 100px;
  text-align: center;
  color: #fff; /* Color de texto claro para fondos oscuros */
}

.next-premieres {
  margin-top: 50px;
  color: #fff; /* Color de texto claro para fondos oscuros */
}
</style>