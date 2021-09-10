<template>
  <div :id="id" class="unlayer-editor" :style="{ minHeight }"></div>
</template>

<script lang="ts">
import { injectScript, isInjected, isScriptInjected, scriptUrl } from '../utilities/load-sciprt';
import { computed, defineComponent, nextTick, onMounted, PropType, ref, toRaw, toRefs, watch } from 'vue';

export default defineComponent({
  name: 'unlayer-editor',
  props: {
    modelValue: { type: Object },
    design: { type: Object },
    html: { type: String },
    data: { type: Object },
    chunks: { type: Object },
    projectId: { type: String as PropType<string> },
    editorId: {
      type: String as PropType<string>,
      default: () => {
        const arr = new Uint8Array(2);
        crypto.getRandomValues(arr);
        const str = btoa(arr.toString());
        return str.replace(/=/g, '');
      }
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    tools: { type: Object },
    appearance: { type: Object },
    locale: { type: String },
    displayMode: { type: String },
    minHeight: { type: String, default: '500px' }
  },
  setup(props, { expose, emit }) {
    const { projectId, editorId, options, tools, appearance, locale, displayMode, minHeight } = toRefs(props);
    const id = computed(function () {
      return `editor-${editorId.value}`;
    });
    let editor: any = null;
    const isLoaded = ref(false);
    const isInitialized = ref(false);
    if (typeof projectId.value === 'string') {
      options.value.projectId = projectId.value;
    }
    if (typeof tools.value === 'object') {
      options.value.tools = tools.value;
    }
    if (typeof appearance.value === 'object') {
      options.value.appearance = appearance.value;
    }
    if (typeof locale.value === 'string') {
      options.value.locale = locale.value;
    }
    if (typeof displayMode.value === 'string') {
      options.value.displayMode = displayMode.value;
    }
    if (typeof options.value.displayMode !== 'string') {
      options.value.displayMode = 'email';
    }

    onMounted(function () {
      // we should confirm the div is inserted to DOM before launching the script
      nextTick(function () {
        if (isScriptInjected(scriptUrl) && isInjected.value) {
          isLoaded.value = true;
        } else {
          injectScript(scriptUrl, function () {
            isLoaded.value = true;
          });
        }
      });
    });

    watch(isLoaded, function () {
      if (isLoaded.value === false || isInitialized.value === true) return;
      const o: any = {
        ...options.value,
        id: id.value
      };
      // @ts-expect-error
      editor = unlayer.createEditor(o);
      editor.addEventListener('design:updated', function () {
        editor.exportHtml(function (ctx: any) {
          emit('update:modelValue', ctx);
          emit('update:html', ctx.html);
          emit('update:chunks', ctx.chunks);
          emit('update:design', ctx.design);
          emit('update:amp', ctx.amp);
        });
      });
      isInitialized.value = true;
      try {
        (document.querySelector(`#${id.value} iframe`) as HTMLElement).style.minHeight = '500px';
      } catch {}
      emit('load', editor);
    });

    expose({
      isLoaded,
      isInitialized,
      editor,
      loadDesign(design: any) {
        editor.loadDesign(toRaw(design));
      },
      saveDesign(callback: any) {
        editor.saveDesign(callback);
      },
      exportHtml(callback: any) {
        editor.exportHtml(callback);
      }
    });

    return {
      id,
      minHeight
    };
  }
});
</script>

<style lang="scss" scoped>
.unlayer-editor {
  flex: 1;
  display: flex;
}
</style>