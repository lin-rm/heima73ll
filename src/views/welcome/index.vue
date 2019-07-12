<template>
    <div class="container">
        <img class="home-welcome" src="../../assets/images/welcome.jpg" alt="">
    </div>
</template>

<script>
export default {
  created () {
    this.$http.get('articles').then(res => console.log(res.data))
  }
}
</script>

<style scoped lang='less'>
    .container {
        // position: relative;

        .home-welcome {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%)
        }
    }
</style>
