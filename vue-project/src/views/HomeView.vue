<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-2 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#0F9773]"
      />

      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="amapSearchResults"
      >
        <li
          v-for="searchResult in amapSearchResults"
          :key="searchResult.id"
          class="py-2 px-2 hover:bg-weather-primary cursor-pointer"
        >
          {{ searchResult.status }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const amapAPIKey = "254c5f491cf8d907054744313d06d9b8";
const searchQuery = ref("");
const queryTimeout = ref(null);
const amapSearchResults = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value != "") {
      const result = await axios.get(
        `https://restapi.amap.com/v3/weather/weatherInfo?city=${searchQuery.value}&key=${amapAPIKey}&type=place`
      );
      amapSearchResults.value = result.data;
      console.log(amapSearchResults.value);
      return;
    }
    amapSearchResults.value = null;
  }, 300);
};
</script>
