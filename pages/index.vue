<template>
  <div>
    <nuxt-layout name="default-layout">
      <div class="d-none d-md-block">
        <navbar />
      </div>
      <div class="container mt-4">
        <h2 class="heading-primary fw-bold mb-2">Update Patient Medical Record</h2>
        <p class="paragraph-primary mb-4">Click the tabs to view and edit patient medical details</p>


        <div v-if="loading" class="text-center text-secondary">Loading investigations...</div>
        <div v-else-if="error" class="text-danger">{{ error }}</div>
        <div v-else class="card">
                          <!-- Success Modal -->
            <div v-if="showSuccessModal" class="modal-overlay">
            <div class="modal-content">
              <p>Medical record created successfully!</p>
              <button @click="showSuccessModal = false" class="btn btn-success">OK</button>
            </div>
          </div>
          <div v-for="(investigations, type) in groupedInvestigations" :key="type" class="mb-4">
            <h3 class="heading-secondary fw-semibold pb-2 mb-3">{{ type }}</h3>
            <div class="row border-bottom">
              <div class="col-md-3 col-sm-6 mb-4" v-for="inv in investigations" :key="inv.id">
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    :id="'inv-' + inv.id" 
                    v-model="selectedInvestigations" 
                    :value="inv.id">
                  <label class="form-check-label" :for="'inv-' + inv.id">{{ inv.title }}</label>
                </div>
              </div>
            </div>
          </div>
          
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="ct-scan" class="form-label">CT Scan</label>
              <select id="ct-scan" class="form-select" v-model="selectedCtScan">
                <option disabled value="">*Specify</option>
                <option v-for="option in ctScanOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="mri" class="form-label">MRI</label>
              <select id="mri" class="form-select" v-model="selectedMri">
                <option disabled value="">*Specify</option>
                <option v-for="option in mriOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
          </div>

          <div> 
            <button class="btn w-45 float-end py-2" @click="submitSelections">Save and Send</button>
          </div>
        </div>
      </div>
    </nuxt-layout>

  
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useInvestigations } from '@/composables/useInvestigations';
import { useAuth } from '@/composables/useAuth';
import { useMedicalRecords } from '@/composables/useMedicalRecords';

const investigations = ref([]);
const loading = ref(true);
const error = ref(null);
const token = ref(process.client ? localStorage.getItem('authToken') : null);
const selectedInvestigations = ref([]);
const selectedCtScan = ref("");
const selectedMri = ref("");
const showSuccessModal = ref(false);

const ctScanOptions = ref([
  "Brain CT Scan",
  "Abdominal CT Scan",
  "Chest CT Scan",
  "Pelvic CT Scan"
]);

const mriOptions = ref([
  "Brain MRI",
  "Spinal MRI",
  "Knee MRI",
  "Abdominal MRI"
]);

const { fetchInvestigations } = useInvestigations();
const { createMedicalRecord } = useMedicalRecords();
const { login } = useAuth();

const authenticateAndFetch = async () => {
  try {
    if (!token.value) {
      token.value = await login('tester@kompletecare.com', 'password');
      if (process.client) {
        localStorage.setItem('authToken', token.value);
      }
    }
    investigations.value = await fetchInvestigations();
  } catch (err) {
    error.value = 'Failed to load investigations.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(authenticateAndFetch);

const groupedInvestigations = computed(() => {
  const groups = {};
  investigations.value.forEach(inv => {
    const typeTitle = inv.type?.title || "Unknown";
    if (!groups[typeTitle]) {
      groups[typeTitle] = [];
    }
    groups[typeTitle].push(inv);
  });
  return groups;
});

const submitSelections = async () => {
  console.log("Selected Investigations:", selectedInvestigations.value);
  console.log("Selected CT Scan:", selectedCtScan.value);
  console.log("Selected MRI:", selectedMri.value);

  const newRecord = await createMedicalRecord({
    investigations: selectedInvestigations.value,
    ctscan: selectedCtScan.value,
    mri: selectedMri.value
  });

  if (newRecord) {
    console.log("Medical record created successfully:", newRecord);
    showSuccessModal.value = true;
    setTimeout(() => {
      selectedInvestigations.value = "";
      selectedCtScan.value = "",
      selectedMri.value = "",
      showSuccessModal.value = false;
    },2000)
  } else {
    console.error("Failed to create medical record");
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  width: 50%;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
