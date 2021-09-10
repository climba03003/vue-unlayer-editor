import { App, Component } from 'vue';
import './assets/index.css';
import UnlayerEditor from './components';

const components: Record<string, Component & { name: string }> = {
  UnlayerEditor
};

function install(Vue: App) {
  for (const component in components) {
    Vue.component(components[component].name, components[component]);
  }
}

export default { install };

export { default as UnlayerEditor } from './components';
