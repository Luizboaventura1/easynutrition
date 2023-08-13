<template>
  <v-app>
    <header>
      <v-container>
        <nav class="d-flex justify-start align-center">
          <h1
            class="font-weight-bold text-white text-h6"
          >
            <span class="logo">Easy</span>Nutrition
          </h1>
        </nav>
      </v-container>
    </header>
    <div class="container-form d-flex justify-center align-center">
      <form
        :style="{height: heightStyle+'px'}"
        class="rounded elevation-8 overflow-hidden"
      >
        <div class="pa-5">
          <div class="w-100 text-center pb-3">
            <h1 class="text-h6 text-white font-weight-bold">
              <span class="logo">Easy</span>Nutrition
            </h1>
          </div>
          <div class="w-100">
            <select
              v-model="goal"
              class="option-form text-white pa-3 rounded w-100 mb-4"
            >
              <option value="">Qual o seu objetivo?</option>
              <option value="opt1">Perder peso</option>
              <option value="opt2">Ganhar massa muscular</option>
            </select>
            <select
              v-model="activity"
              class="option-form text-white pa-3 rounded w-100 mb-4"
            >
              <option value="">Frequência de atividade fisíca</option>
              <option value="sedentario">Sedentário</option>
              <option value="muitoativo">Muito ativo</option>
              <option value="levementeativo">Levemente ativo</option>
              <option value="extremamenteativo">Extremamente ativo</option>
            </select>
            <input
              v-model="weight"
              placeholder="Seu peso"
              class="rounded pa-3 text-white w-100 mb-4"
              type="text"
              @input="validadeInput"
            >
            <input
              v-model="height"
              placeholder="Sua altura em cm"
              class="rounded pa-3 text-white w-100 mb-4"
              type="text"
              @input="validadeInput"
            >
            <input
              v-model="age"
              placeholder="Sua idade"
              class="rounded pa-3 text-white w-100 mb-4"
              type="text"
              @input="validadeInput"
            >
            <select
              v-model="sex"
              class="option-form text-white pa-3 rounded w-100 mb-4"
            >
              <option value="">Sexo</option>
              <option value="m">Masculino</option>
              <option value="f">Feminino</option>
            </select>
          </div>
          <div class="w-100">
            <v-btn
              @click="calculate"
              class="w-100 font-weight-bold bg-blue-accent-3"
            >
              Calcular
            </v-btn>
          </div>
        </div>
      </form>
      <main
        class="result rounded overflow-hidden"
        :style="{height: heightStyleR}"
      >
        <div class="pa-5">
          <div class="s-100">
            <h1
              class="text-white font-weight-bold text-h6 pb-3"
            >
              <span class="logo">Easy</span>Nutrition
            </h1>
          </div>
          <div class="w-100">
            <div class="quantity mb-4 w-100 rounded pa-3">
              <span class="title-protein font-weight-bold">Proteína</span>
              <div class="d-flex justify-space-between">
                <span class="text-white">{{ calculatedProtein }}g</span>
                <div class="text-grey-darken-1">p/dia</div>
              </div>
            </div>

            <div class="quantity mb-4 w-100 rounded pa-3">
              <span class="title-carbohydrate font-weight-bold">Carboidrato</span>
              <div class="d-flex justify-space-between">
                <span class="text-white">{{ calculatedCarbohydrate }}g</span>
                <div class="text-grey-darken-1">p/dia</div>
              </div>
            </div>

            <div class="quantity mb-4 w-100 rounded pa-3">
              <span class="title-fat font-weight-bold">Gordura</span>
              <div class="d-flex justify-space-between">
                <span class="text-white">{{ calculatedFat }}g</span>
                <div class="text-grey-darken-1">p/dia</div>
              </div>
            </div>

            <div class="quantity mb-4 w-100 rounded pa-3">
              <span class="title-calorie font-weight-bold">Calorias</span>
              <div class="d-flex justify-space-between">
                <span class="text-white">{{ calculatedCalories }}cal</span>
                <div class="text-grey-darken-1">p/dia</div>
              </div>
            </div>
            <div class="w-100">
              <v-btn class="w-100 font-weight-bold text-blue-accent-2"
                variant="text"
                @click="redo"
              >
                Refazer
              </v-btn>
            </div>
          </div>
        </div>
      </main>
    </div>
  </v-app>
  <ErrorPopup
    :statePopupPanel="statePopupPanel"
  >
    {{ textPopupPanel }}
  </ErrorPopup>
</template>

<script setup>
import { ref } from 'vue';
import ErrorPopup from '../components/Popups/ErrorPopup.vue';

// windows
let heightStyle = ref('500')
let heightStyleR = ref('0')

let goal = ref('')
let weight = ref('')
let height = ref('')
let sex = ref('')
let age = ref('')
let activity = ref('')

let protein = ref(0)
let carbohydrate = ref(0)
let fat = ref(0)
let calorie = ref(0)


// Final sum

let calculatedProtein = computed(() => {
  return parseFloat(protein.value).toFixed(2).replace('.',',')
})

let calculatedCarbohydrate = computed(() => {
  return parseFloat(carbohydrate.value).toFixed(2).replace('.',',')
})

let calculatedFat = computed(() => {
  return parseFloat(fat.value).toFixed(2).replace('.',',')
})

let calculatedCalories = computed(() => {
  return parseFloat(calorie.value).toFixed(2).replace('.',',')
})

const calculate = () => {
  let weightFormat = Number(weight.value)

  if(verifyInputs()) {
    if(goal.value === 'opt1') {
      if(sex.value === 'm') {
        calorie.value = tbmMasculino() - 500
        protein.value = weightFormat * correctProtein.loseWeight
        fat.value = (Number(calorie.value) * 0.3) / 9
        carbohydrate.value = (parseFloat(calorie.value) - (parseFloat(protein.value) * 4) - (parseFloat(fat.value) * 9)) / 4
      }
      else if(sex.value === 'f') {
        calorie.value = tbmFeminimo() - 500
        protein.value = weightFormat * correctProtein.loseWeight
        fat.value = (Number(calorie.value) * 0.3) / 9
        carbohydrate.value = (parseFloat(calorie.value) - (parseFloat(protein.value) * 4) - (parseFloat(fat.value) * 9)) / 4
      }
    }
    else if(goal.value === 'opt2') {
      if(sex.value === 'm') {
        calorie.value = tbmMasculino() + 1000
        protein.value = weightFormat * correctProtein.gainWeight
        fat.value = (Number(calorie.value) * 0.3) / 9
        carbohydrate.value = (parseFloat(calorie.value) - (parseFloat(protein.value) * 4) - (parseFloat(fat.value) * 9)) / 4
      }
      else if(sex.value === 'f') {
        calorie.value = tbmFeminimo() + 700
        protein.value = weightFormat * correctProtein.gainWeight
        fat.value = (Number(calorie.value) * 0.3) / 9
        carbohydrate.value = (parseFloat(calorie.value) - (parseFloat(protein.value) * 4) - (parseFloat(fat.value) * 9)) / 4
      }
    }

    heightStyle.value = '0'
    heightStyleR.value = '470px'

  }else {
    alertPopupPanel('Preencha os campos!')
  }
}

const correctProtein = {
  gainWeight: 2,
  loseWeight: 1.2
}

const verifyInputs = () => {
  return (goal.value != '' && weight.value != '' && height.value && age.value != '' && sex.value != '' && activity.value != '') ? true : false
}

const tbmFeminimo = () => {
  let weightFormat = Number(weight.value)
  let heightFormat = Number(height.value)
  let ageFormat = Number(age.value)
  
  let TbmFeminimo = 447.593 + (9.247 * weightFormat) + (3.098 * heightFormat) - (4.330 * ageFormat)
  
  if(activity.value === 'sedentario') 
    return TbmFeminimo = TbmFeminimo * 1.2
  else if(activity.value === 'levementeativo') 
    return TbmFeminimo = TbmFeminimo * 1.375
  else if(activity.value === 'muitoativo')
    return TbmFeminimo = TbmFeminimo * 1.725
  else if(activity.value === 'extremamenteativo')
    return TbmFeminimo = TbmFeminimo * 1.9
}

const tbmMasculino = () => {
  let weightFormat = Number(weight.value)
  let heightFormat = Number(height.value)
  let ageFormat = Number(age.value)

  let TbmMasculino = 88.362 + (13.397 * weightFormat) + (4.799 * heightFormat) - (5.677 * ageFormat)
  
  if(activity.value === 'sedentario') 
    return TbmMasculino = TbmMasculino * 1.2
  else if(activity.value === 'levementeativo') 
    return TbmMasculino = TbmMasculino * 1.375
  else if(activity.value === 'muitoativo')
    return TbmMasculino = TbmMasculino * 1.725
  else if(activity.value === 'extremamenteativo')
    return TbmMasculino = TbmMasculino * 1.9
}

const redo = () => {
  heightStyle.value = '500'
  heightStyleR.value = '0'
}

let statePopupPanel = ref(false)
let textPopupPanel = ref('')

const alertPopupPanel = (msg) => {
  statePopupPanel.value = true
  textPopupPanel.value = msg

  setTimeout(() => {
    statePopupPanel.value = false
  },2000)
}

const validadeInput = (() => {
  weight.value = weight.value.replace(/[^0-9]/g, "")
  height.value = height.value.replace(/[^0-9]/g, "")
  age.value = age.value.replace(/[^0-9]/g, "")
})

</script>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,body {
    height: 100%;
  }

  header {
    background-color: #121214;
    nav {
      height: 30px;
    }
  }

  ::-webkit-scrollbar {
    background-color: #202024;
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(46, 48, 49);
    border-radius: 10px;
  }
  
  .container-form {
    height: calc(100% - 30px);
    background-image: linear-gradient(90deg,#36393e,#222428);

    form {
      transition: 1s;
      width: 100%;
      max-width: 360px;
      background-color: #121214;

      .option-form {
        background-color: #202024;
        outline: none;
        border: none;
        cursor: pointer;
      }

      input {
        background-color: #202024;
        outline: none;
        border: none;
      }
    }
  }

  .result {
    transition: 1s;
    width: 100%;
    max-width: 360px;
    background-color: #121214;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    h1 {
      font-size: 18px;
    }

    .quantity {
      background-color: #202024;

      .title-protein {
        color: rgb(255, 196, 0);
      }

      .title-carbohydrate {
        color: rgb(0, 153, 255);
      }

      .title-fat {
        color: rgb(255, 132, 0);
      }

      .title-calorie {
        color: rgb(0, 255, 195);
      }
    }
  }

  .logo {
    color: #009dff;
  }
</style>