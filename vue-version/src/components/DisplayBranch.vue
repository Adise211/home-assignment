<template>
    <div>
        <div>
            <h1>{{ branch.branch + " - " + currentCity.cityName}}</h1>
            <p>address: {{ branch.address }}</p>
            <p>phone: {{ branch.phone }}</p>

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

</style>