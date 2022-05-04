<template>
  <p>Click on a primal to review the names of the subprimal cuts which come from that primal. When you're ready, click Start to begin the sorting game.</p>
  <router-link class="button" to="/game-subprimals">Start</router-link>
  <div
    class="subprimals-container"
  >
    <div 
      class="game-image"
      @click="checkImgClick($event);" 
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
        <img 
          v-if="selectedPrimal == cut"
          style="position: absolute; left: 5rem;" 
          class="cow-cuts-img cow-cuts-img-correct" 
          alt="Cow Cuts" 
          :src="assetUrl('angus-beef-primal/' + cut + '.png')" 
        />
      </div>
    </div>
    <div class="game-items">
      <h2>{{selectedPrimal}}</h2>
      <div
        class="items-grid"
      >
        <div
          v-for="subprimal in subprimalsInPrimal(selectedPrimal)"
          :key="subprimal"
        >
          <div
            class="game-item"
          >
            <p>{{subprimal.name}}</p>
            <img draggable="false" :src="assetUrl('angus-beef-subprimals/' + subprimal.name.replaceAll(' ', '-') + '.png')">
          </div>
        </div>
      </div>
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
      selectedPrimal: '',
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
          primal: 'fore-shank'
        },
        {
          name: 'ribeye steak',
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
          name: 'rolled rib roast',
          primal: 'rib'
        },
        {
          name: 'round',
          primal: 'round'
        },
        {
          name: 'rump roast',
          primal: 'round'
        },
        {
          name: 'sirloin',
          primal: 'loin-end'
        },
        {
          name: 'standing rib roast',
          primal: 'rib'
        },
        {
          name: 'stew meat',
          primal: 'hind-shank'
        },
        {
          name: 't-bone',
          primal: 'short-loin'
        },
      ] as {name: string, primal: string}[],
      correct: [

      ] as string[],
      ctx: document.createElement("canvas").getContext("2d")
    };
  },
  methods: {
    assetUrl(assetName: string) {
      return require('../assets/' + assetName);
    },
    subprimalsInPrimal(primal: string) {
      let subprimals = this.subprimals;
      let subsInPrimal = [];
      for (let s in subprimals) {
        let subprimal = subprimals[s];
        if (subprimal.primal === primal) {
          subsInPrimal.push(subprimal);
        }
      }
      return subsInPrimal;
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
          this.selectedPrimal = cut;
        }
        ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);
      }
    }
  }
});
</script>
<style>
.subprimals-container {
  display: grid;
  max-width: calc(1024px + 20rem);
  margin-left: calc((100% - (1024px + 20rem)) / 2);
  grid-template-columns: auto 20rem;
}
.subprimals-container .game-image {
  grid-column-start: 1;
  grid-column-end: 2;
}
.subprimals-container .game-items {
  grid-column-start: 2;
  grid-column-end: 3;
}
.subprimals-container .items-grid {
  display: grid;
  grid-template-columns: auto auto auto;
}
.subprimals-container .cow-cuts-img-correct {
  filter: invert(48%) sepia(58%) saturate(639%) hue-rotate(83deg) brightness(93%) contrast(87%);
}
.subprimals-container .cow-cuts-img {
  width: 100%;
  max-width: 1024px;
}

</style>
