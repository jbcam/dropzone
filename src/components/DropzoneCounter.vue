<template>
    <div class="counter">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve">
            <polygon style="fill:#7383BF;" points="20,3.5 25,10.5 58,10.5 58,3.5 " />
            <polygon style="fill:#424A60;" points="25,10.5 20,3.5 0,3.5 0,10.5 0,54.5 58,54.5 58,17.5 30,17.5 " />
            <polygon style="fill:#71C3A9;" points="30,17.5 58,17.5 58,10.5 25,10.5 " />
        </svg>
        <p class="counter-text">{{totalFiles}} files on server</p>
    </div>
</template>
<script>
export default {
    name: "DropzoneCounter",
    props: {
        totalFiles: Number
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.counter {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #d6d6d6;
}

.counter-text {
    padding-left: 10px;
}
</style>
