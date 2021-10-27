<template>
    <div>
        Team
        <div class="search">
            <v-text-field v-model="search" placeholder="Search" 
            >

            </v-text-field>
        </div>
        
        <v-row wrap class="row mt-5" >
            <v-col class="col" xs='12' sm='6' md="4" lg="4"  v-for="list in cloneList" :key="list.id">

            
                <v-card
                class=""
                width="344"
                >
                    <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                    ></v-img>

                    <v-card-title>
                    {{list.name}}
                    </v-card-title>

              
                    <v-card-actions class="cardAction pa-5" >
                        <span>
                            Id: {{list.id}}
                        </span>
                        <span>
                            Age: {{list.arr1}}
                        </span>
                        <span>
                            Email: {{list.email}}
                        </span>
                        <span>
                            Date: {{list.date | dateSplitter}}
                        </span>
                    </v-card-actions>

                   
                </v-card>

            </v-col>

        </v-row>

       
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            search: '',
            cloneList: null
      
        }
    },

    watch: {
        search: function(val) {
            if (val) {
                this.cloneList = this.cloneList.filter(x => x.name.toLowerCase().includes(val.toLowerCase()))
            } else {
                this.cloneList = this.lists
            }
        }
    },
    
    computed:{
        lists(){
            return this.$store.getters.GetNews;
        },
        // searches(){
            
        //     for (let list of this.lists) {

        //         let list1 =[ list]
        //         console.log(list1)
        //         for(let i=0; i<list.length;i++){

        //             if(list1[i].name.toLowerCase().includes(this.searchM.toLowerCase())){

        //                 return list1[i]
        //                 }
               

                    
        //         }

        //     return list1
        //     }

        // }
    },
    filters:{
        dateSplitter(val){
            let res = ''
            res += val && val.split('-').reverse()[1] + '.'
            res += val && val.split('-').reverse()[0] + '.'
            res += val && val.split('-').reverse()[2] + '.'
            return res
        }
    },

    mounted() {
        this.cloneList = [...this.lists]
    },
    methods:{
        searches(){
            for (const list of this.lists) {
                for (const l in list) {
                    if(l === 'name'){
                        console.log(l)
                    }
                }
            }            
        }

        
    }
}
</script>

<style>
.col{
    display: flex;
    justify-content: center;
}
.cardAction{
    display: flex;
    flex-direction: column;
    text-align: left;
}
.cardAction span{
    width: 100%;
}
</style>