<template>
  <div>
    Dashboard
    <div class="user">
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="addBtn" v-bind="attrs" v-on="on" @click="btn()">
              Add User
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Full Name*"
                      v-model="news.name"
                      required
                      :rules="[
                        (v) => v.length >= 3 || 'Minimum 3 letters',
                        (v) => !!v || 'Required.',
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="news.arr1"
                      :items="['0-17', '18-29', '30-54', '54+']"
                      label="Age*"
                      required
                      :rules="[
                        (v) => !!v || 'Required.',
                      ]"
                    ></v-select>
                  </v-col>
                 

                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      v-model="news.email"
                      required
                      :rules="[
                      v=> !!v || 'Required!'
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password*"
                      type="password"
                      v-model="news.password"
                      required
                      :rules="[
                      v=> !! v || 'Required!'
                      ]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="Date"
                      type="date"
                      v-model="news.date"
                      :rules="[
                      v=> !! v || 'Required!'
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close()"> Close </v-btn>
              <v-btn color="blue darken-1" text @click="save()" v-if="isShow"> Save </v-btn>
              <v-btn color="blue darken-1" text @click="EditSave()" v-else> Edit </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    <v-container >

      <v-row class="mb-5">
        <v-tooltip top  small>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small flat depressed v-bind="attrs"
          v-on="on" class="grey--text" @click="sort('name')">
              <v-icon small left>mdi-folder</v-icon>
              <span class="text-lowercase"> By user name</span>
            </v-btn>
            
          </template>
          <span>Sorted by User Name</span>
        </v-tooltip>
      </v-row>

      <v-row flex wrap v-for="list in lists" :key="list.id" :class="{infoBorder: list.id%2, greyBorder:!(list.id%2)}">
        
        
        <v-col cols="2" sm="2" md="2">
        <span>{{list.id}}</span>
        </v-col>
        <v-col cols="2" sm="2" md="2">
          <span>{{list.name}}</span>
        </v-col>
        <v-col cols="2" sm="2" md="2">
          <span>{{list.arr1}}</span>
        </v-col>
        <v-col cols="2" sm="2" md="2">
          <span>{{list.email}}</span>
        </v-col>
        <v-col cols="2" sm="2" md="2">
          <span>{{list.date | dateSplitter}}</span>
        </v-col>
        <v-col cols="2" sm="2" md="2" align='right'>
          <span>
              <v-icon @click="edit(list)" class="info--text ">mdi-pencil</v-icon>

              <router-link class="show" :to="{name: 'show', params:{
                slug: list.name
                }}">

              <v-icon @click="show(list.id)" class=" primary--text mx-4">mdi-eye</v-icon>

              </router-link>

              <v-icon @click="deleted(list.id)" class="red--text">mdi-delete</v-icon>
          </span>
        </v-col>
        
      </v-row>
    </v-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      news: {
        arr1: [],
      },
      dialog: false,
      isShow: true,
      // lists: []
    };
  },

  async asyncData({store}) {
    let allItems = store.getters.GetNews
    console.log('all', allItems)
    return { allItems }
  },

  methods: {
    btn(){
        this.news = {};
        this.isShow = true
    },
    close() {
      this.dialog = false;

    },
    save() {
      this.dialog = false;
      this.$store.dispatch("SendNews", this.news);
    },
    edit(list){
        this.dialog = true;
        this.news = list;
        this.isShow = false
    },
    EditSave(){
        this.dialog = false;
        this.$store.dispatch('EditNews', this.news);
        this.news={}

    },
    deleted(id){
      let a = confirm('This user will be delete')
      if(a){
        this.$store.dispatch('Deleted', id)
        this.lists = this.$store.getters.GetNews

      }
    },
    show(id){
      this.$store.getters.showNew(id)
    },
    sort(prop){
      this.lists.sort((a, b)=>a[prop] > b[prop] ? 1 : -1) // hamma malumotlar lists ga saqlangan
    }
  },
  filters:{
    dateSplitter(value){
      let res = ''
      res += value && value.split('-').reverse()[1] +'.' // day
      res += value && value.split('-').reverse()[0] +'.' // month
      res += value && value.split('-').reverse()[2]  // year
      return res
    },
    slug(val){
      let res = ''
      res += val && val.replaceAll(' ', '-').replaceAll('--', '-')
      res.toLowerCase()
      return res
    }
  },

  computed: {
    lists() {
      return this.$store.getters.GetNews;
    },
  },

  mounted() {
    // this.lists = this.$store.getters.GetNews;
    document.addEventListener('keypress', event=>{
      if(event.keyCode == 13){ // Enter
        this.save()
      }
    })
  },

};
</script>

<style>
.addBtn{
  margin: 60px 0;
}

.user{
  margin: 10px 100px;
}

.infoBorder{
  border-left: 4px solid rgb(38, 139, 233);
}
.greyBorder{
  border-left: 4px solid rgb(209, 209, 209);
}

.show{
  text-decoration: none;
}
</style>