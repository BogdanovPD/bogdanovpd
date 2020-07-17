<template>
  <v-app>
    <v-main>
      <Main v-bind:complexity="5" v-bind:operators="['+','-','*','/','^']" v-bind:duration="5"/>
    </v-main>
  </v-app>
</template>

<script>
// import Settings from './components/Settings';
import Main from './components/Main';

export default {
  name: 'App',
  components: {
    // Settings,
    Main
  },
  data: () => ({
  }),
};
</script>
