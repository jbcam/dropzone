<template>
    <div id="app">
        <Dropzone msg="Welcome to Your Vue.js App" />
    </div>
</template>
<script>
import Dropzone from "./components/Dropzone.vue";

export default {
    name: "app",
    components: {
        Dropzone
    }
};
</script>
<style>
/*#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}*/
</style>
