import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
 state:{
  news: [], // bazadagi ma'lumotlar to'planayotgan joy
  showId: null
 },
 getters:{
  GetNews(state){
    return state.news
  },
  showNew(state){
    return b=>{
      state.showId = b
      console.log(state.showId);
    }
  },
  viewNew(state){
    return state.news.find(b => {
      if(b.id == state.showId) return b
      console.log(b)
    })
  } 
 },
 mutations:{
  SendNews(state, payload){ 
    state.news.push(payload)
  },
  GetNews(state, payload){
    state.news = payload
  },
  EditNews(state, payload){
    state.news.forEach(n => {
      if(n.id == payload.id){
        n = payload
      }
    });
  },
  Deleted(state, payload){
    // state.news.splice(state.news.findIndex(n =>{
    //   if(n.id === payload){
    //     return payload
    //   }
    // } ), 1);

    state.news = state.news.filter(x => x.id != payload)
  }
     

 }, 
 actions:{
  SendNews(context, payload){
    Axios.post('http://localhost:3000/news', payload)
    .then(res=> context.commit('SendNews',res.data))
  },  
  GetNews(context){
    Axios.get('http://localhost:3000/news')
    .then(res=> context.commit('GetNews', res.data))
  },
  EditNews(context, payload){
    Axios.put('http://localhost:3000/news/' + payload.id, payload)
    .then(res=> context.commit('EditNews', res.data))
  },
  Deleted(context, payload){
    Axios.delete('http://localhost:3000/news/' + payload)
    context.commit('Deleted', payload) 
  },

 }

})
