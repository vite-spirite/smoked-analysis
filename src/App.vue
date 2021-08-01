<template>
  <div id='app' class='hero'>
    <div id='contain' class='hero-body'>
      <router-view id='page'></router-view>
    </div>

    <div class='hero-foot' style='width: 100%;'>
      <div class='p-2'>
        <b-button type="is-info" expanded @click='smoke();'>Fumer</b-button>
      </div>

      <div id='nav' class='box is-shadowless p-1 mb-1 mx-2 has-background-dark has-text-white is-size-7 is-family-monospace'>
        <router-link to="/" class='nav-item'>
          <b-icon pack="fas" size="is-small" icon="smoking"></b-icon>
          <span>Conteur</span>
        </router-link>

        <router-link :to="{name: 'nowAnalysis'}" class='nav-item'>
          <b-icon pack="fas" size="is-small" icon="chart-line"></b-icon>
          <span>Graphique</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: space-between;
}
#background {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: -1;
}

#contain, #page {
  position: relative;
  width: 100%;
}
#contain {
  background: url("../public/background.svg");
  background-position: bottom;
  background-size: contain;
  background-repeat: no-repeat;
}
#nav {
  display: flex;
  flex-direction: row;

  justify-content: space-around;
  align-items: center;
}
.hero-foot {
  display: flex;
  flex-direction: column;
}

.nav-item {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: color .2s;
}
.nav-item:hover, .router-link-exact-active {
  color: hsl(217, 71%, 53%);
}

button {
  border-radius: 6px;
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {smokeCounter} from '@/composable/counter.composable';

export default defineComponent({
  setup() {
    const {button, init} = smokeCounter();

    init();

    return {
      smoke: button,
    }
  },
})
</script>
