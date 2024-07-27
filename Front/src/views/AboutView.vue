<template>
  <div class="about container">
    <div class="about-header">
      <img src="../assets/cine.png" alt="Cine" class="about-image"/>
      <h1 class="has-text-centered">Sobre Nosotros</h1>
    </div>
    <div class="content">
      <p>
        Bienvenido a Cinecity, tu cine de confianza. Ofrecemos la mejor experiencia cinematográfica
        con la última tecnología en sonido e imagen. Disfruta de tus películas favoritas en nuestras
        cómodas instalaciones.
      </p>
    </div>
    <div class="reviews">
      <h2 class="has-text-centered">Reseñas</h2>
      <div class="review" v-for="(review, index) in reviews" :key="index">
        <blockquote>{{ review.text }}</blockquote>
        <p class="has-text-right">- {{ review.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      reviews: [
        { text: "¡Excelente servicio y las mejores películas!", author: "Juan Pérez" },
        { text: "Un lugar cómodo y con buen ambiente.", author: "María Gómez" },
        { text: "Siempre disfruto de mi tiempo en Cinecity.", author: "Carlos Sánchez" },
      ],
    };
  },
};
</script>

<style scoped>
.about {
  margin-top: 30px;
}

.about-header {
  text-align: center;
  margin-bottom: 20px;
}

.about-image {
  max-width: 100%;
  height: auto;
}

.content {
  margin-bottom: 40px;
}

.reviews {
  margin-top: 20px;
}

.reviews h2 {
  margin-bottom: 20px;
}

.review {
  margin-bottom: 20px;
  background: #ffffff; 
  padding: 15px;
  border-radius: 10px;
  color: #000000; 
}

.review blockquote {
  color: #000000; 
}

.review p {
  color: #000000; 
}

h1 {
  font-size: 2.5rem; 
  color: #d88d00; 
}

h2 {
  color: #d88d00; 
  font-size: 1.5rem
}
</style>

