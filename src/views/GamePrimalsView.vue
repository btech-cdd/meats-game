<template>
  <p>Drag and drop the name of each primal cut to its location on the cow.</p>
  <router-link class="start-button" to="/primals">Restart</router-link>
  <div
    class="game-primals-container"
    :style="{
      cursor: selectedItem !== '' ? 'grabbing' : '',
    }"
    @mouseup="selectedItem = ''"
    @mousemove="onMouseMove($event)"
  >
    <div 
      @mouseup="checkImgClick($event);" 
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
          :src="assetUrl('angus-beef-primal/' + cut + '.png')" 
        />
        <img 
          v-if="correct.includes(cut)"
          style="position: absolute; left: 5rem;" 
          class="cow-cuts-img cow-cuts-img-correct" 
          alt="Cow Cuts" 
          :src="assetUrl('angus-beef-primal/' + cut + '.png')" 
        />
      </div>
    </div>
    <div class="game-items">
      <div
        v-for="cut in primals"
        :key="cut"
      >
        <div
          v-if="!correct.includes(cut)"
          @mousedown="selectedItem = cut"
          class="game-item"
          :style="{
            color: selectedItem == cut ? '#FFFFFF' : '#000000',
            cursor: selectedItem !== '' ? 'grabbing' : 'pointer',
          }"
        >
          {{ cut }}
        </div>
      </div>
    </div>
    <div
      v-if="selectedItem !== ''"
      class="selected-item"
      :style="{
        'left': mousePos.x - 16 + 'px',
        'top': mousePos.y - 16 + 'px'
      }"
    >
      {{ selectedItem }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GamePrimalsView',
  components: {
  },
  computed: {
    console: () => console,
    window: () => window
  },
  data() {
    return {
      selectedItem: "",
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

      ] as string[],
      mousePos: {
        x: 0,
        y: 0
      },
      ctx: document.createElement("canvas").getContext("2d")
    }
  },
  methods: {
    assetUrl(assetName: string) {
      return require('../assets/' + assetName);
    },
    onMouseMove(e: { clientX: number, clientY: number}) {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY + window.scrollY;
    },
    checkImgClick(e: { pageX: number, pageY: number, target: { offsetLeft: number, offsetTop: number, width: number, height: number}}) {
      var x = e.pageX - e.target.offsetLeft;
      var y = e.pageY - e.target.offsetTop;
      var ctx = this.ctx;
      if (ctx === undefined || ctx === null) ctx = document.createElement("canvas").getContext("2d");
      ctx!.canvas.width = e.target.width;
      var w = ctx!.canvas!.width;
      ctx!.canvas.height = e.target.height;
      var h = ctx!.canvas!.height;
      var alpha;

      ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);
      for (let i in this.primals) {
        let cut = this.primals[i];
        // Draw image to canvas
        // and read Alpha channel value
        let img = document.getElementById(`cow-cuts-img-${cut}`) as HTMLCanvasElement;
        ctx!.drawImage(img!, 0, 0, w, h);
        alpha = ctx!.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A

        // If pixel is transparent,
        // retrieve the element underneath and trigger it's click event
        if( alpha===0 ) {
          // console.log("NOT " + cut);
        } else {
          if (this.selectedItem !== '') {
            if (this.selectedItem == cut) {
              this.correct.push(cut);
              if (this.correct.length == this.primals.length) {
                alert(`Congratulations! You've sorted all of the primal cuts.`);
              }
            } else {
              //change this to not be alert, but some custom alert message
              alert(`Sorry, that's not the ${this.selectedItem}!`);
            }
          }
          console.log(cut);
        }
        ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);
      }
    }
  }
});
</script>
<style>
.start-button {
  text-decoration: none;
  border: 1px solid #000000;
  background-color: #000000;
  color: #FFFFFF;
  padding: .5rem;
  border-radius: 10px;
}
.game-primals-container {
  display: grid;
  max-width: calc(1024px + 20rem);
  margin-left: calc((100% - (1024px + 20rem)) / 2);
  grid-template-columns: auto 20rem;
}
.game-primals-container .game-image {
  grid-column-start: 1;
  grid-column-end: 2;
}
.game-primals-container .game-items {
  grid-column-start: 2;
  grid-column-end: 3;
}
.game-primals-container .game-item {
  border: 1px solid #000000;
  padding: 0.5rem;
  cursor: pointer;
  user-select: none;
}
.game-primals-container .cow-cuts-img {
  width: 100%;
  max-width: 1024px;
}

.game-primals-container .cow-cuts-img-correct {
  filter: invert(48%) sepia(58%) saturate(639%) hue-rotate(83deg) brightness(93%) contrast(87%);
}

.game-primals-container .selected-item {
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 100;
  background-color: #FFFFFF;
  border: solid 1px #000000;
  width: 20rem;
  padding: 0.5rem;
}
</style>
