<template>
    <div>
        <div>
            <label for="area">Area:</label>
            <select id="area" @change="handleArea">
                <option value="testing">testing</option>
                <option value="testing2">testing 2</option>
            </select>
            <label for="city">City:</label>
            <select id="city" @change="handleCity">
                <option>hi</option>
            </select>
        </div>
    </div>
</template>


<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            areas: [],
            cities: []
        }
    },
    methods: {
        handleArea(e) {
            console.log("test value",e.target.value);
        }
    }
}
</script>

<style scoped>
    h1 {
       color: blueviolet; 
    }
</style>
