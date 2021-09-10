<template>
  <div class="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around mt-4">
    <button @click="saveFoo">Save Foo</button>
    <button @click="saveBar">Save Bar</button>
  </div>
  <div class="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around mt-4">
    <unlayer-editor ref="foo" v-model:html="fooHtml" v-model:design="fooDesign"></unlayer-editor>
  </div>
  <div class="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around mt-4">
    <unlayer-editor ref="bar" v-model:html="barHtml" v-model:design="barDesign" :options="{ displayMode: 'web' }"></unlayer-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const foo = ref<any>(null);
    const fooHtml = ref('');
    const fooDesign = ref({});
    watch(fooHtml, function (n) {
      console.log(n);
    });
    watch(fooDesign, function (n) {
      console.log(n);
    });
    const saveFoo = function () {
      foo.value.exportHtml(function (html: string) {
        console.log(html);
      });
    };
    const bar = ref<any>(null);
    const barHtml = ref('');
    const barDesign = ref({});
    watch(barHtml, function (n) {
      console.log(n);
    });
    watch(barDesign, function (n) {
      console.log(n);
    });
    const saveBar = function () {
      bar.value.exportHtml(function (html: string) {
        console.log(html);
      });
    };

    return {
      foo,
      fooHtml,
      fooDesign,
      bar,
      barHtml,
      barDesign,
      saveFoo,
      saveBar
    };
  }
});
</script>
