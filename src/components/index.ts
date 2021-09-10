import { App } from 'vue';
import UnlayerEditor from './UnlayerEditor.vue';

UnlayerEditor.install = (Vue: App) => {
  Vue.component(UnlayerEditor.name, UnlayerEditor);
};

export default UnlayerEditor;
