<template>
  <div class="max-w-5xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">

    <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center">
        <div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
          <svg
            class="dark:bg-slate-400"
            viewBox="0 0 50.8 50.8"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g style="display: inline">
                <path
                  d="M7.854 33.546 16 22.893l7.52 16.293 6.267-27.572 3.76 8.773 5.64-6.893 3.76 8.146"
                  style="fill: none; stroke: #000000; stroke-width: 2.50658; stroke-linecap: round; stroke-linejoin: round;"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <div>
          <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
            Data
          </h5>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Temperature and CO2 data
          </p>
        </div>
      </div>
      <div>
        <span
          class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300"
        >
          <svg
            class="w-2.5 h-2.5 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </span>
      </div>
    </div>

    <!-- Dropdown for Chart Type Selection -->
    <form class="flex justify-between w-full h-12 mx- mb-4">
      <div>
        <label for="charts" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a chart</label> 
        <select 
          id="charts" 
          v-model="selectedChartType" 
          @change="updateChart"
          class="bg-gray-50 border w-32 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        > 
          <option value="bar">Bar</option> 
          <option value="area">Area</option> 
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <label class="block text-sm font-medium text-gray-900 dark:text-white">
          Temperature Alert Threshold
        </label>
        <input
          type="number"
          v-model="tempThreshold"
          placeholder="Enter max temperature"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="block text-sm font-medium text-gray-900 dark:text-white">
          CO2 Alert Threshold
        </label>
        <input
          type="number"
          v-model="co2Threshold"
          placeholder="Enter max CO2"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <Button v-if="!isAlert" class="w-48" @click.prevent="saveThresholds">Set Up Data Alerts</Button>
      <Button2 v-if="isAlert" class="w-48" @click.prevent="isAlert = false">Disable alerts</Button2>
    </form>

    <!-- Chart Display -->
    <div ref="chartRef" id="column-chart"></div>

    <!-- Button -->
    <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
      <div class="flex justify-between items-center pt-5">
        <a
          href="#"
          @click.prevent="openHistory"
          class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-slate-600 hover:text-slate-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
          See history
          <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Modal pour afficher l'historique -->
    <div v-if="showHistory" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-11/12 max-w-xl dark:bg-gray-800">
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">History</h2>
        <div class="overflow-y-auto max-h-96">
          <ul>
            <li v-for="(log, index) in historyLog" :key="index" class="mb-2">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <strong>Time:</strong> {{ log.timestamp }}<br>
                <strong>Temperature:</strong> {{ log.temp }}<br>
                <strong>CO2:</strong> {{ log.co2 }}
              </p>
            </li>
          </ul>
        </div>
        <div class="flex justify-between pt-5">
        <button
          @click="closeHistory"
          class="px-4 py-2 h-10 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
        >
          Close
        </button>
          <button
            @click="downloadData"
            class="bg-slate-600 h-10 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
          >
            Download Data
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import ApexCharts from "apexcharts";
import { useUserStore } from "../stores/userStore";
import { db } from "../db.js";
import { onValue, ref as firebaseRef } from "firebase/database";
import { addDataToLog, getDataLog } from "../data.js";
import Button from "@/components/Button.vue";
import Button2 from "@/components/Button2.vue";

const chartRef = ref(null);
const userStore = useUserStore();
const selectedChartType = ref("bar");
let chart = null;
const showHistory = ref(false);
const historyLog = ref([]);
const MAX_DATA_POINTS = 6;
const tempThreshold = ref(null);
const co2Threshold = ref(null);
const isAlert = ref(false);

const saveThresholds = () => {
  console.log('isalert = ', isAlert);
  if (!tempThreshold.value || !co2Threshold.value) {
    alert("Please enter valid thresholds.");
    return;
  }
  isAlert.value = true;
  // alert("Defined alert thresholds !");
};

const checkAlerts = (data) => {
  console.log('isalert = ', isAlert.value);
  const { temp, co2 } = data;

  if (temp > tempThreshold.value) {
    alert(`Alerte : La température (${temp}°C) a dépassé le seuil (${tempThreshold.value}°C) !`);
  }

  if (co2 > co2Threshold.value) {
    alert(`Alerte : Le niveau de CO2 (${co2}) a dépassé le seuil (${co2Threshold.value}) !`);
  }
};

const renderChart = () => {
  const options = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: [
      { name: "Temperature", data: [] },
      { name: "CO2", data: [] },
    ],
    chart: {
      type: selectedChartType.value,
      height: 300,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: { shared: true, intersect: false },
    xaxis: {
      categories: [],
      labels: {
        style: { cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400" },
      },
    },
    fill: { opacity: 1 },
  };

  chart = new ApexCharts(chartRef.value, options);
  chart.render();
};

const downloadData = () => {
  if (dataLog.length === 0) {
    alert("Aucune donnée disponible pour le téléchargement.");
    return;
  }

  // Création du contenu JSON
  const jsonContent = JSON.stringify(dataLog, null, 2);
  const jsonBlob = new Blob([jsonContent], { type: "application/json" });

  // Création d'un lien pour le téléchargement
  const link = document.createElement("a");
  link.href = URL.createObjectURL(jsonBlob);
  link.download = "data-log.json"; // Nom du fichier
  document.body.appendChild(link); // Ajout du lien au DOM
  link.click(); // Déclenche le téléchargement
  document.body.removeChild(link); // Nettoie le DOM
};


const openHistory = () => {
  historyLog.value = getDataLog();
  showHistory.value = true;
};

const closeHistory = () => {
  showHistory.value = false;
};

const updateChartData = (data) => {
  if (isAlert.value)  {
    console.log('imbecile');
    checkAlerts(data);
  }

  const { co2, temp } = data;
  const currentTime = new Date().toLocaleTimeString();

  chart.updateSeries([
    { name: "Temperature", data: [...chart.w.config.series[0].data, parseFloat(temp)].slice(-MAX_DATA_POINTS) },
    { name: "CO2", data: [...chart.w.config.series[1].data, parseFloat(co2)].slice(-MAX_DATA_POINTS) },
  ]);

  chart.updateOptions({
    xaxis: {
      categories: [...chart.w.config.xaxis.categories, currentTime].slice(-MAX_DATA_POINTS),
    },
  });
};

const updateChart = () => {
  chart.destroy();
  renderChart();
};

onMounted(() => {
  renderChart();

  const deviceId = userStore.devicesId;
  if (deviceId) {
    const deviceRef = firebaseRef(db, `devices/${deviceId}`);
    onValue(deviceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        updateChartData(data);
        addDataToLog(data);
      }
    });
  } else {
    console.log("deviceId non défini dans userStore.");
  }
});
</script>

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>
