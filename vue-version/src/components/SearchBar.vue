<template>
    <div>
        <div class='s-container'>
            <div class="inputs">
                <label for="area">Area:</label>
                <select id="area" @change="handleArea" class="select-1">
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
                <select id="city" @change="handleCity" class="select-2">
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
            <button @click="handleSearch" :disabled='selectableCities.length === 0'>Search</button>
        </div>
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
    .s-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        border: 1px solid ghostwhite;
        background-color: ghostwhite;
        box-shadow: 3px 3px 3px 3px grey;
        padding: 100px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
        width: 70em;
    }
    .select-1, .select-2 {
        padding: 10px;
        width: 150px; 
        font-size: 16px;
    }
    .select-1 {
       margin-right: 80px;
    }
    label {
        font-weight: bold;
        margin-right: 1em;
    }
    button {
        background-color: hotpink;
        margin-left: 8em;
        padding: 1em;
        width: 10em;
        border: 1px solid hotpink;
        border-radius: 5em;
        box-shadow: 2px 2px 2px black;
        cursor: pointer;
    }
    button:active {
        background-color: #ff87c3;
    }

</style>
