<template>
    <div>
        <div>
            <label for="area">Area:</label>
            <select id="area" @change="handleArea">
                <option></option>
                <option 
                    :value= "ar.id"
                    v-for="ar in areas"
                    :key="ar.id"
                >
                    {{ ar.name }}
                </option>
            </select>
            <label for="city">City:</label>
            <select id="city" @change="handleCity">
                <option>choose city</option>
                <option
                    :value="city.id"
                    v-for="city in selectableCities"
                    :key="city.id"
                >
                    {{ city.cityName }}
                </option>
            </select>
        </div>
        <button @click="handleSearch">Search</button>
        <DisplayBranch v-bind:branch="branch" v-bind:currentCity="currentCity" v-if="display === true"/>
    </div>
</template>


<script>
import areasJson from '../data/areas.json';
import citiesJson from '../data/cities.json';
import branchesJson from '../data/branches.json';
import DisplayBranch from './DisplayBranch.vue';

export default {
    name: 'SearchBar',
    data() {
        return {
            areas: [],
            cities: [],
            branchesList: [],
            selectableCities: [],
            selectedCityId: '',
            display: false,
            branch: [],
            currentCity: []

        }
    },
    methods: {
        handleArea(e) {
            const { value } = e.target;
            const findCities = this.cities.filter((city) => {
            if(city.area === value) return city
        });
            this.selectableCities = findCities;
        },
        handleCity(e) {
            const { value } = e.target;
            this.selectedCityId = value;
        },
        handleSearch() {
            const findBranch = this.branchesList.filter((x) => {
                return x.cityId === this.selectedCityId
            });
            const find = this.selectableCities.filter( (x) => { return x.id === findBranch[0].cityId});
            this.currentCity = find[0];
            this.display = true;
            this.branch = findBranch[0];

        }
    },
    created() {
        this.areas = areasJson;
        this.cities = citiesJson;
        this.branchesList = branchesJson;
    },
    components: {
        DisplayBranch
    }
}
</script>

<style scoped>
    h1 {
       color: blueviolet; 
    }
</style>
