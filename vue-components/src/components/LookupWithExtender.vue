<template>
  <div
      :class="[ 'wikit', 'wikit-LookupWithExtender' ]"
  >
    <Input
        :value="value"
        @input="onInput"
        @focus.native="showExtension = true"
        @blur.native="showExtension = false"
        :feedback-type="feedbackType"
        :placeholder="placeholder"
        :disabled="disabled"
    />
    <div v-if="showExtension" class="wikit-LookupWithExtender__extension">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, { defineComponent } from '@vue/composition-api';
import Input from "@/components/Input.vue";

Vue.use( VueCompositionAPI );

export default defineComponent( {
  name: 'LookupWithExtender',
  inheritAttrs: false,
  components: {
    Input,
  },
  data() {
    return {
      showExtension: false,
    };
  },
  props: {
    feedbackType: {
      type: String,
      validator( value: string | null ): boolean {
        return value === null || [ 'warning', 'error' ].includes( value );
      },
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: null,
    },
  },
  methods: {
    onInput( value: string ): void {
      this.showExtension = true;
      this.$emit( 'input', value );
    },
    onEsc(): void {
      this.showExtension = false;
    },
  },
} );
</script>

<style lang="scss">
.wikit-LookupWithExtender {
  position: relative;
  width: 300px;

  &__extension {
    position: absolute;
    padding-inline: $wikit-InputExtender-padding-horizontal;
    padding-block: $wikit-InputExtender-padding-vertical;
    background: $wikit-InputExtender-background-color;
    min-width: $wikit-InputExtender-min-width;
    max-width: $wikit-InputExtender-max-width;

    border: $wikit-InputExtender-border-width $wikit-InputExtender-border-style $wikit-InputExtender-border-color;
    box-shadow: $wikit-InputExtender-box-shadow;
    border-radius: $wikit-InputExtender-border-radius;
  }

}
</style>
