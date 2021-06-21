import Vue from 'vue'
import App from './App.vue'

import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

Vue.config.productionTip = false

Vue.use(WaveUI)

const waveui = new WaveUI({
  // Some Wave UI options.
})

new Vue({
  waveui,
  render: h => h(App),
}).$mount('#app')
