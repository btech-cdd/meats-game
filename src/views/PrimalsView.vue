<template>
  <p>Review the names and locations of the primal cuts. When you're ready, click Start to begin the sorting game.</p>
  <router-link class="button" to="/game-primals">Start</router-link>
  <div
    class="primals-container"
  >
    <div 
      class="game-image"
    >
      <div
        v-for="cut in primals"
        :key="cut"
      >
        <img 
          :id="`cow-cuts-img-${cut}`"
          style="position: absolute; left: 5rem;" 
          class="cow-cuts-img" 
          alt="Cow Cuts" 
          :src="assetUrl('angus-beef-primal/labeled/' + cut + '.png')" 
        />
      </div>
    </div>
    <div class="game-items">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrimalsView',
  components: {
  },
  computed: {
    console: () => console,
    window: () => window
  },
  data() {
    return {
      style: {
        itemwidth: '20rem'
      },
      primals: [
        'brisket',
        'chuck',
        'flank',
        'fore-shank',
        'hind-shank',
        'loin-end',
        'plate',
        'rib',
        'round',
        'short-loin'
      ] as string[],
      correct: [

      ] as string[]
    }
  },
  methods: {
    assetUrl(assetName: string) {
      return require('../assets/' + assetName);
    }
  }
});
</script>
<style>
.primals-container .primals-container {
  display: grid;
  max-width: calc(1024px + 20rem);
  margin-left: calc((100% - (1024px + 20rem)) / 2);
  grid-template-columns: auto 20rem;
}
.primals-container .game-image {
  grid-column-start: 1;
  grid-column-end: 2;
}
.primals-container .game-items {
  grid-column-start: 2;
  grid-column-end: 3;
}
.primals-container .cow-cuts-img {
  width: 100%;
  max-width: 1024px;
}

</style>
