<template>
    <div class="max-w-5xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
            <svg class="dark:bg-slate-400" viewBox="0 0 50.8 50.8" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g style="display:inline"> <path d="M7.854 33.546 16 22.893l7.52 16.293 6.267-27.572 3.76 8.773 5.64-6.893 3.76 8.146" style="fill:none;stroke:#000000;stroke-width:2.50658;stroke-linecap:round;stroke-linejoin:round"></path> </g> </g></svg>
          </div>
          <div>
            <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">Data</h5>
            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Temperature and C02 data</p>
          </div>
        </div>
        <div>
          <span class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
            </svg>
            <!-- 42.5% -->
          </span>
        </div>
      </div>
    
      <div ref="chartRef" id="column-chart"></div>
  
      <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div class="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom"
            class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button">
            Last 7 days
            <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <a
            href="#"
            class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
            Leads Report
            <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { onMounted, ref } from 'vue';
  import ApexCharts from 'apexcharts';
  import { useUserStore } from '../stores/userStore';
  import { getDataByDeviceId } from '../db.js';
  
  const chartRef = ref(null);
  const userStore = useUserStore();

  onMounted(async () => {
    console.log('deivceId dans data:', userStore.devicesId);

    const deviceId = userStore.devicesId;

    console.log('deivceId = ', deviceId);

    
    if (deviceId) {
      try {
        const deviceData = await getDataByDeviceId(deviceId);
        
        if (deviceData) {
          console.log("Données récupérées :", deviceData);
          // Utilisez deviceData comme nécessaire dans votre composant
        } else {
          console.log("Aucune donnée trouvée pour ce deviceId.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'appareil :", error);
      }
    } else {
      console.log("deviceId non défini dans userStore.");
    }

    const options = {
      colors: ["#1A56DB", "#FDBA8C"],
      series: [
        { name: "Temperature", data: [1, 1, 63, 421, 122, 323, 111] },
        { name: "CO2", data: [232, 113, 341, 224, 522, 411, 243] },
      ],
      chart: { type: "bar", height: 320, toolbar: { show: false } },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "70%", borderRadiusApplication: "end", borderRadius: 8 },
      },
      tooltip: { shared: true, intersect: false },
      xaxis: {
        categories: ["Mon"],
        // categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        labels: { style: { cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400' } },
      },
      fill: { opacity: 1 },
    };
  
    if (chartRef.value) {
      const chart = new ApexCharts(chartRef.value, options);
      chart.render();
    }
  });
</script>
  
  <style scoped>
  /* Ajoutez des styles personnalisés si nécessaire */
  </style>
  