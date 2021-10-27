<template>
  <v-app>
  
    <Menu />

    <v-main class="ma-5 grey--text">
      <router-view/>
    </v-main>
     
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
  components: { Menu },
  name: 'App',

  data: () => ({
    //
  }),
  created(){
    this.$store.dispatch('GetNews')
  }
};
</script>
