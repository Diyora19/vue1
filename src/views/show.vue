<template>
    <div class="lola">
        <v-btn @click="back()" flat depressed>Back to Dashboard</v-btn>
        <v-row wrap class="mt-5">
            <v-col xs="12" sm="12" md="12" lg="12" xl="12">
                 <v-card
                class=""
                width="390"
                height="420"
                >
                    <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                    ></v-img>

                    <v-card-title>
                    {{view.name}}
                    </v-card-title>

              
                    <v-card-actions class="cardAction pa-5" >
                        <span>
                            Id: {{view.id}}
                        </span>
                        <span>
                            Age: {{view.arr1}}
                        </span>
                        <span>
                            Email: {{view.email}}
                        </span>
                        <span>
                            Date: {{view.date | dateSplitter}}
                        </span>
                    </v-card-actions>

                   
                </v-card> 
            </v-col> 
        </v-row>
    </div>
</template>
<script>
export default {
    computed:{

        view(){
            return this.$store.getters.viewNew
        }
    },
    methods:{
        back(){
            this.$router.push('/')
        }
    },
    filters:{
        dateSplitter(val){
            let res = ''
            res += val && val.split('-')[1] + '.'
            res += val && val.split('-')[2] + '.'
            res += val && val.split('-')[0]

            return res

        }
    }
}
</script>
<style>
.lola{
    margin: 50px;
}
</style>