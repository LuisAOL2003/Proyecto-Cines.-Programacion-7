<template>
  <div class="event-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ event.name }}</h1>
          <h2 class="subtitle">
            <strong>Date:</strong> {{ event.date }}
            <br />
            <strong>Time:</strong> {{ event.time }}
          </h2>
        </div>
      </div>
    </section>
    <section class="event-content">
      <div class="container">
        <router-link :to="'/buy-tickets/' + event.id" class="button is-primary buy-button">Comprar boletos</router-link>
        <p class="is-size-4 description">{{ event.description }}</p>
        <p class="is-size-5"><strong>Location:</strong> {{ event.location }}</p>
        <p class="is-size-5"><strong>Category:</strong> {{ event.category }}</p>
        <div class="event-images columns is-multiline has-text-centered">
          <div v-for="image in event.images" :key="image" class="column is-one-third">
            <img :src="image" :alt="event.name" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'EventSingle',
  data() {
    return {
      events: [
        {
          id: 1,
          name: 'Star Wars',
          category: 'Science Fiction',
          description: 'A long time ago in a galaxy far, far away...',
          featuredImage: 'URL_DE_LA_IMAGEN_1',
          images: [
            'URL_DE_LA_IMAGEN_1',
            'URL_DE_LA_IMAGEN_1',
            'URL_DE_LA_IMAGEN_1',
          ],
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
          images: [
            'URL_DE_LA_IMAGEN_2',
            'URL_DE_LA_IMAGEN_2',
            'URL_DE_LA_IMAGEN_2',
          ],
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
          images: [
            'URL_DE_LA_IMAGEN_3',
            'URL_DE_LA_IMAGEN_3',
            'URL_DE_LA_IMAGEN_3',
          ],
          location: 'Cinema 3',
          date: '2024-07-16',
          time: '10:00',
        },
        {
          id: 4,
          name: 'Spider-Man: No Way Home',
          category: 'Superhero',
          description: 'Spider-Man faces his greatest challenge yet.',
          featuredImage: 'URL_DE_LA_IMAGEN_4',
          images: [
            'URL_DE_LA_IMAGEN_4',
            'URL_DE_LA_IMAGEN_4',
            'URL_DE_LA_IMAGEN_4',
          ],
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
          images: [
            'URL_DE_LA_IMAGEN_5',
            'URL_DE_LA_IMAGEN_5',
            'URL_DE_LA_IMAGEN_5',
          ],
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
          images: [
            'URL_DE_LA_IMAGEN_6',
            'URL_DE_LA_IMAGEN_6',
            'URL_DE_LA_IMAGEN_6',
          ],
          location: 'Cinema 6',
          date: '2024-07-19',
          time: '17:00',
        },
      ],
      event: {},
    };
  },
  created() {
    const ID = Number(this.$route.params.id);
    let event = this.events.find((event) => event.id === ID);
    this.event = event;
  },
};
</script>

<style lang="scss" scoped>
.event-single {
  margin-top: 30px;
  color: #fff; /* Color de texto claro para fondos oscuros */
}

.hero {
  margin-bottom: 70px;
}

.buy-button {
  margin-bottom: 30px; /* Añade más separación debajo del botón */
  font-size: 1.5em; /* Aumenta el tamaño de la fuente del botón */
  padding: 20px 40px; /* Aumenta el padding del botón */
}

.event-images {
  margin-top: 50px;
}

.description {
  margin-bottom: 30px;
  color: #fff; /* Color de texto claro para fondos oscuros */
}
</style>