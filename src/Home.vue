<template>
  <div>
      <Navbar></Navbar>
      <Board></Board>
      <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './components/navbar/navbar.vue'
import Footer from './components/footer/footer.vue'
import Board from './components/board/board.vue'
export default {
    name:'Home',
    components:{Navbar,Footer,Board}
}
</script>

<style>

</style>