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
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="!searchError && amapSearchResults.lives.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <div
            class="py-2 px-2 hover:bg-weather-primary cursor-pointer"
            @click="previewCity(amapSearchResults)"
          >
            {{ amapSearchResults.lives[0].province }}
            {{ amapSearchResults.lives[0].city }}
          </div>
        </template>
        <!-- 
        <template v-else>
          <li
            v-for="searchResult in amapSearchResults"
            :key="searchResult.id"
            class="py-2 px-2 hover:bg-weather-primary cursor-pointer"
          >
            {{ searchResult.status }}
          </li>
        </template>
         -->
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const previewCity = (amapSearchResults) => {
  console.log(amapSearchResults);
  const [province, city] = [
    amapSearchResults.lives[0].province,
    amapSearchResults.lives[0].city,
  ];
  const cityCode = amapSearchResults.lives[0].adcode;
  router.push({
    name: "cityView",
    params: { state: province, city: city },
    // params: { cityCode: cityCode },
    query: {
      // lat: 
      // lon: 
      preview: true,
    }
  });
};

const amapAPIKey = "254c5f491cf8d907054744313d06d9b8";
const searchQuery = ref("");
const queryTimeout = ref(null);
const amapSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value != "") {
      try {
        const result = await axios.get(
          `https://restapi.amap.com/v3/weather/weatherInfo?city=${searchQuery.value}&key=${amapAPIKey}&type=place`
        );
        amapSearchResults.value = result.data;
        // console.log(amapSearchResults.value);
      } catch {
        searchError.value = true;
      }

      return;
    }
    amapSearchResults.value = null;
  }, 300);
};
</script>
