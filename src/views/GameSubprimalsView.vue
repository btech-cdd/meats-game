<template>
  <div
    class="game-subprimals-container"
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
          :src="assetUrl('angus-beef-primal/labeled/' + cut + '.png')" 
        />
      </div>
    </div>
    <div class="game-items">
      <div
        v-for="cut in subprimals"
        :key="cut"
      >
        <div
          v-if="!correct.includes(cut.name)"
          @mousedown="selectedItem = cut; console.log(cut.name);"
          class="game-item"
          :style="{
            visibility: selectedItem.name == cut.name ? 'hidden' : 'visible',
            cursor: selectedItem !== '' ? 'grabbing' : 'pointer',
          }"
        >
          <p>{{cut.name}}</p>
          <img draggable="false" :src="assetUrl('angus-beef-subprimals/' + cut.name.replace(' ', '-') + '.png')">
        </div>
        <div
          v-else
          class="game-item"
          :style="{
            visibility: selectedItem.name == cut.name ? 'hidden' : 'visible',
            cursor: selectedItem !== '' ? 'grabbing' : 'pointer',
            color: '#FFFFFF',
            'background-color': '#20A440'
          }"
        >
          <p>SORTED</p>
          <img draggable="false" :src="assetUrl('angus-beef-subprimals/' + cut.name.replace(' ', '-') + '.png')">
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
      <p>{{ selectedItem.name }}</p>
      <img draggable="false" :src="assetUrl('angus-beef-subprimals/' + selectedItem.name.replace(' ', '-') + '.png')">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GameSubprimalsView',
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
      subprimals: [
        {
          name: 'arm roast',
          primal: 'brisket'
        },
        {
          name: 'brisket',
          primal: 'brisket'
        },
        {
          name: 'chuck roast',
          primal: 'chuck'
        },
        {
          name: 'club steak',
          primal: 'short-loin'
        },
        {
          name: 'flank',
          primal: 'flank'
        },
        {
          name: 'ground beef',
          primal: 'brisket'
        },
        {
          name: 'market steak',
          primal: 'rib'
        },
        {
          name: 'plate',
          primal: 'plate'
        },
        {
          name: 'porterhouse',
          primal: 'short-loin'
        },
        {
          name: 'sirloin',
          primal: 'loin-end'
        },
        {
          name: 'round',
          primal: 'round'
        },
        {
          name: 'rump roast',
          primal: 'round'
        }
      ] as {name: string, primal: string},
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
            if (this.selectedItem.primal == cut) {
              this.correct.push(this.selectedItem.name);
              if (this.correct.length == this.subprimals.length) {
                alert(`Congratulations! You've sorted all of the primal cuts.`);
              }
            } else {
              //change this to not be alert, but some custom alert message
              alert(`Sorry, the ${this.selectedItem.name} doesn't come from the ${cut}!`);
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
.game-subprimals-container {
  display: grid;
  max-width: calc(1024px + 306px);
  margin-left: calc((100% - (1024px + 306px)) / 2);
  grid-template-columns: auto 306px;
}
.game-subprimals-container .game-image {
  grid-column-start: 1;
  grid-column-end: 2;
}
.game-subprimals-container .game-items {
  grid-column-start: 2;
  grid-column-end: 3;
  display: grid;
  grid-template-columns: auto auto auto;
}
.game-subprimals-container .game-item {
  border: 1px solid #000000;
  padding: 0.5rem;
  cursor: pointer;
  user-select: none;
}
.game-subprimals-container .cow-cuts-img {
  width: 100%;
  max-width: 1024px;
}

.game-subprimals-container .cow-cuts-img-correct {
  filter: invert(48%) sepia(58%) saturate(639%) hue-rotate(83deg) brightness(93%) contrast(87%);
}

.game-subprimals-container .selected-item {
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 100;
  background-color: #FFFFFF;
  border: solid 1px #000000;
  padding: 0.5rem;
}
</style>
