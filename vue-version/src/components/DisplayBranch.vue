<template>
    <div>
        <div class="card">
            <h1>{{ branch.branch + " - " + currentCity.cityName}}</h1>
            <p>address: {{ branch.address }}</p>
            <p>phone: {{ branch.phone }}</p>
            <img src="../images/dounts_2.jpeg">
            <p class="text">No Image</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "DisplayBranch",
    props: ["branch", "currentCity"] 
}
</script>


<style scoped>
    .card {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: center;
        margin: 5em;
    }
    img {
         height: 15em;
        width: 17em;
        align-self: center;
        margin-top: 50px;
        border: 0.5px solid black;
        padding: 5em;
        background-color: antiquewhite;
        opacity: 0.5;
    }
    .text {
        position: relative;
        bottom: 5.5em;
        font-weight: bold;
    }
    
</style>