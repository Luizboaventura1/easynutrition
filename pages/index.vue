<template>
  <v-app class="bg-primary-esn">
    <header>
      <v-container>
        <nav class="d-flex justify-start align-center">
          <h1 class="font-weight-medium text-primary-esn text-h6">
            <span class="text-zual-esn">Easy</span>Nutrition
          </h1>
        </nav>
      </v-container>
    </header>
    <div class="form-container">
      <div>
        <Transition>
          <form v-if="!stateModal" class="form overflow-hidden">
            <div class="form-content pa-5">
              <div class="form-header w-100 text-center pb-3">
                <h1 class="text-h6 text-white font-weight-medium">
                  <span class="text-zual-esn">Easy</span>Nutrition
                </h1>
              </div>
              <div class="form-body w-100">
                <select
                  v-model="userGoal"
                  class="form-select text-white pa-3 w-100 mb-4"
                >
                  <option value="">Select your goal</option>
                  <option value="lose_weight">Lose weight</option>
                  <option value="gain_muscle">Gain muscle</option>
                </select>
                <select
                  v-model="activityLevel"
                  class="form-select text-white pa-3 w-100 mb-4"
                >
                  <option value="">Activity level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="lightly_active">Lightly active</option>
                  <option value="very_active">Very active</option>
                  <option value="extremely_active">Extremely active</option>
                </select>
                <input
                  v-model="userWeight"
                  placeholder="Your weight (kg)"
                  class="form-input pa-3 text-white w-100 mb-4"
                  type="number"
                  @input="validateInput"
                />
                <input
                  v-model="userHeight"
                  placeholder="Your height (cm)"
                  class="form-input pa-3 text-white w-100 mb-4"
                  type="number"
                  @input="validateInput"
                />
                <input
                  v-model="userAge"
                  placeholder="Your age"
                  class="form-input pa-3 text-white w-100 mb-4"
                  type="number"
                  @input="validateInput"
                />
                <select
                  v-model="userGender"
                  class="form-select text-white pa-3 w-100 mb-4"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div class="form-footer w-100">
                <v-btn
                  @click="calculateNutrition"
                  style="border-radius: 10px"
                  class="w-100 font-weight-bold bg-blue-accent-3"
                  >Calculate</v-btn
                >
              </div>
            </div>
          </form>
        </Transition>
        <Transition>
          <form v-if="stateModal" class="form result-section overflow-hidden">
            <div class="result-content pa-5">
              <div class="result-header w-100 pb-3">
                <h1 class="text-h6 text-center text-white font-weight-medium">
                  <span class="text-zual-esn">Easy</span>Nutrition
                </h1>
              </div>
              <div class="result-body w-100">
                <div class="result-item mb-4 w-100 rounded pa-3">
                  <span class="protein result-title font-weight-bold"
                    >Protein</span
                  >
                  <div class="d-flex justify-space-between">
                    <span class="text-white">{{ proteinPerDay }}g</span>
                    <div class="text-grey-darken-1">per day</div>
                  </div>
                </div>
                <div class="result-item mb-4 w-100 rounded pa-3">
                  <span class="carbohydrate result-title font-weight-bold"
                    >Carbohydrate</span
                  >
                  <div class="d-flex justify-space-between">
                    <span class="text-white">{{ carbohydratePerDay }}g</span>
                    <div class="text-grey-darken-1">per day</div>
                  </div>
                </div>
                <div class="result-item mb-4 w-100 rounded pa-3">
                  <span class="fat result-title font-weight-bold">Fat</span>
                  <div class="d-flex justify-space-between">
                    <span class="text-white">{{ fatPerDay }}g</span>
                    <div class="text-grey-darken-1">per day</div>
                  </div>
                </div>
                <div class="result-item mb-4 w-100 rounded pa-3">
                  <span class="calories result-title font-weight-bold"
                    >Calories</span
                  >
                  <div class="d-flex justify-space-between">
                    <span class="text-white">{{ caloriesPerDay }} kcal</span>
                    <div class="text-grey-darken-1">per day</div>
                  </div>
                </div>
                <div class="result-footer w-100">
                  <v-btn
                    class="w-100 font-weight-bold text-blue-accent-2"
                    variant="text"
                    @click="resetForm"
                    >Reset</v-btn
                  >
                </div>
              </div>
            </div>
          </form>
        </Transition>
      </div>
    </div>
  </v-app>

  <ErrorPopup :statePopupPanel="errorPopupVisible">
    {{ errorMessage }}
  </ErrorPopup>
</template>

<script setup>
import { ref } from "vue";
import ErrorPopup from "../components/Popups/ErrorPopup.vue";

let stateModal = ref(false);

const userGoal = ref("");
const userWeight = ref("");
const userHeight = ref("");
const userAge = ref("");
const userGender = ref("");
const activityLevel = ref("");

const proteinPerDay = ref(0);
const carbohydratePerDay = ref(0);
const fatPerDay = ref(0);
const caloriesPerDay = ref(0);

const calculateNutrition = () => {
  const weight = parseFloat(userWeight.value);
  const height = parseFloat(userHeight.value);
  const age = parseInt(userAge.value);

  if (validateInputs(weight, height, age)) {
    const bmr = calculateBMR(weight, height, age, userGender.value);
    const activityMultiplier = getActivityMultiplier(activityLevel.value);
    const totalCalories = bmr * activityMultiplier;

    if (userGoal.value === "lose_weight") {
      caloriesPerDay.value = totalCalories - 500;
    } else if (userGoal.value === "gain_muscle") {
      caloriesPerDay.value = totalCalories + 500;
    }

    proteinPerDay.value = (weight * 1.8).toFixed(2);
    fatPerDay.value = ((caloriesPerDay.value * 0.3) / 9).toFixed(2);
    carbohydratePerDay.value = (
      (caloriesPerDay.value - (proteinPerDay.value * 4 + fatPerDay.value * 9)) /
      4
    ).toFixed(2);

    stateModal.value = true;
  } else {
    showErrorMessage("Please fill out all fields correctly!");
  }
};

const calculateBMR = (weight, height, age, gender) => {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === "female") {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return 0;
};

const getActivityMultiplier = (level) => {
  switch (level) {
    case "sedentary":
      return 1.2;
    case "lightly_active":
      return 1.375;
    case "very_active":
      return 1.55;
    case "extremely_active":
      return 1.725;
    default:
      return 1.2;
  }
};

const validateInputs = (weight, height, age) => {
  return (
    !isNaN(weight) &&
    weight > 0 &&
    !isNaN(height) &&
    height > 0 &&
    !isNaN(age) &&
    age > 0 &&
    userGoal.value &&
    userGender.value &&
    activityLevel.value
  );
};

const resetForm = () => {
  userGoal.value = "";
  userWeight.value = "";
  userHeight.value = "";
  userAge.value = "";
  userGender.value = "";
  activityLevel.value = "";

  proteinPerDay.value = 0;
  carbohydratePerDay.value = 0;
  fatPerDay.value = 0;
  caloriesPerDay.value = 0;

  formHeight.value = 500;
  resultHeight.value = "0";
};

const showErrorMessage = (message) => {
  errorMessage.value = message;
  errorPopupVisible.value = true;

  setTimeout(() => {
    errorPopupVisible.value = false;
  }, 3000);
};

const validateInput = (event) => {
  const value = event.target.value;
  if (value < 0) {
    event.target.value = "";
  }
};

// Error popup state
const errorPopupVisible = ref(false);
const errorMessage = ref("");
</script>

<style scoped>
header {
  height: 64px;
}

.bg-primary-esn {
  background-color: #202020;
}

.text-zual-esn {
  color: #2c8af6;
}

.text-primary-esn {
  color: rgb(233, 233, 233);
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
}

.form,
.result-section {
  width: 100%;
  max-width: 400px;
  transition: height 0.3s ease;
  border: 1px solid #383838;
  border-radius: 20px;
  box-sizing: border-box;
}

.form-select,
.form-input {
  background-color: #292929;
  border: none;
  color: #fff;
  font-size: 14px;
  border-radius: 10px;
  width: 100%;
}

.form-select:focus,
.form-input:focus {
  outline: 2px solid #42a5f5;
}

.result-item {
  background-color: #292929;
}

.form-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
}

.form-container > div {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 500px;
}

.form {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 0.3s ease-in-out;
}

.result-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 0.3s ease-in-out;
}

.form[style*="opacity: 0"] {
  visibility: hidden;
  opacity: 0;
}

.form[style*="opacity: 1"] {
  visibility: visible;
  opacity: 1;
}

.protein {
  color: #ff8c00;
}

.carbohydrate {
  color: #4caf50;
}

.fat {
  color: #2196f3;
}

.calories {
  color: #8a41ff;
}

.result-footer {
  margin-top: 16px;
}

.bg-blue-accent-3 {
  background-color: #42a5f5;
  color: #fff;
}

.text-blue-accent-2 {
  color: #64b5f6;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
