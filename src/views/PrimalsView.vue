<template>
  <div
    class="primals-container"
  >
    <div 
      class="game-image"
    >
      <div
        v-for="cut in primalcuts"
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
      primalcuts: [
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
.primals-container {
  display: grid;
  max-width: calc(1024px + 20rem);
  margin-left: calc((100% - (1024px + 20rem)) / 2);
  grid-template-columns: auto v-bind(style.itemwidth);
}
.game-image {
  grid-column-start: 1;
  grid-column-end: 2;
}
.game-items {
  grid-column-start: 2;
  grid-column-end: 3;
}
.game-item {
  border: 1px solid #000000;
  padding: 0.5rem;
  cursor: pointer;
  user-select: none;
}
.cow-cuts-img {
  width: 100%;
  max-width: 1024px;
}

.cow-cuts-img-correct {
  filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%);
  opacity: 50%;
}

#selected-item {
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 100;
  background-color: #FFFFFF;
  border: solid 1px #000000;
  width: v-bind(style.itemwidth);
  padding: 0.5rem;
}
</style>
