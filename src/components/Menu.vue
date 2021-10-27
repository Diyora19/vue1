<template>
  <div>
    <v-app-bar flat app dense class="grey--text">
      <v-app-bar-nav-icon class="grey--text" @click="menu"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span>Vue</span>
        <span>Project</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    


      <v-btn depressed class="grey--text">
        <span>Sign Out</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

   <v-navigation-drawer app v-model="drawer" class="info">
      <v-list
        dense
        nav
      >
        <v-list-item>
        <v-list-item-content class="white--text">
          <v-list-item-title class="text-h6">
            MENU
          </v-list-item-title>
          <v-list-item-subtitle  class="white--text">
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider color="white"></v-divider>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          router :to="item.rout"
        >
          <v-list-item-icon class="white--text">
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
   </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      drawer: false,
      items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', rout: '/' },
          { title: 'Projects', icon: 'mdi-image', rout: '/projects' },
          { title: 'Team', icon: 'mdi-help-box', rout: '/team' },
        ],
      // right: null,
    };

  },

  methods: {
    menu(){
      this.drawer = !this.drawer
    }
  },
};
</script>

<style>

</style>