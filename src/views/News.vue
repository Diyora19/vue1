<template>
    <div>
    <div class="news">
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click='btn()'
        >
          News
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model="news.title"
                  label="Title"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Date"
                  type="date"
                  v-model="news.date"
                ></v-text-field>
              </v-col>

             
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save()"
            v-if="isShow"
          >
            Save
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            v-else
            @click="editSave()"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
   <v-row>
     <v-col
      cols="4"
      sm="4"
      md="4"
      v-for="list in lists"
    :key="list.id">
        <v-card
    :loading="loading"
    class="mx-auto my-12"
  
  >


    <!-- <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img> -->

    <v-card-title>{{list.title}}</v-card-title>

    <v-card-text>
      {{list.date}}
      <v-btn
        @click="edit(list)"
      >Edit
      </v-btn>

      <v-btn
        @click="deleted(list)"
      >Delete
      </v-btn>
      
      <router-link :to="{name: 'viewNew',
      params:{slug: list.title}}">

      <v-btn
        @click="show(list.id)"
      >Show
      </v-btn>
      </router-link>

    </v-card-text>
  </v-card>
     </v-col>
   </v-row>
  </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: {},
            dialog: false,
            isShow: true
        }
    },

    methods: {
        show(id){
          this.$store.getters.showNew(id)
        },
        btn(){
            
            this.isShow = true,
            this.news = {}

        },
        save(){
            this.dialog = false,
            
            this.$store.dispatch('sendNews', this.news)
        },
        edit(list){
            this.news = list,
            this.isShow = false,
            this.dialog = true
        },
        editSave(){
            this.isShow = true,
            this.dialog = false,
            this.news = {},
            this.$store.dispatch('editNews', this.news)
        },

        deleted(list){
            this.$store.dispatch('deleteNews', list)
        }

    },
    filters:{
      slug(val){
        let res = ''
        res += val && val.replaceAll(' ', '-').replaceAll('--', '-')
        res.toLowerCase()
        return res
      }
    },
    computed:{
        lists(){
            return this.$store.getters.newGet
        }
    }
}
</script>

<style>
 .news{
     margin-top: 100px;
 }
</style>