<template>
  <button
    :class="[
      'wikit',
      'wikit-ToggleButton',
      buttonIsActive ? 'wikit-ToggleButton--isActive' : null,
    ]"
    @click="onClick"
  >
    <!-- @slot required. add the content of the button here (label, icon, etc.) -->
    <slot />
  </button>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { ToggleButtonGroupInjection } from "@/components/ToggleButtonGroup.vue";

export default (Vue as VueConstructor<Vue & ToggleButtonGroupInjection>).extend(
  {
    name: "ToggleButton",
    methods: {
      onClick(): void {
        if (this.toggleListener !== null) {
          this.toggleListener(this.value);
          return;
        }
        /**
         * only emitted when not use as part of a ToggleButtonGroup
         */
        this.$emit("click");
      },
    },
    inject: {
      groupValue: { default: null },
      toggleListener: { default: null },
    } as Record<keyof ToggleButtonGroupInjection, object>,
    computed: {
      buttonIsActive(): boolean {
        if (this.groupValue !== null) {
          return this.groupValue() === this.value;
        }
        return this.isActive;
      },
    },
    props: {
      /**
       * required when the ToggleButton is used as part of a ToggleButtonGroup.
       */
      value: {
        default: null,
        type: String,
      },
      /**
       * required when the ToggleButton is used as a standalone component.
       * Ignored when used as part of a ToggleButtonGroup
       */
      isActive: {
        default: false,
        type: Boolean,
      },
    },
  }
);
</script>

<style lang="scss">
.wikit-ToggleButton {
  color: $wikit-ToggleButton-color;
  font-family: $wikit-ToggleButton-font-family;
  font-weight: $wikit-ToggleButton-font-weight;
  font-size: $wikit-ToggleButton-font-size;
  line-height: $wikit-ToggleButton-line-height;
  box-sizing: border-box;
  border-width: $wikit-ToggleButton-border-width;
  border-style: $wikit-ToggleButton-border-style;
  border-radius: $wikit-ToggleButton-border-radius;
  border-color: $wikit-ToggleButton-border-color;
  background-color: $wikit-ToggleButton-background-color;
  padding-inline: $wikit-ToggleButton-medium-padding-horizontal;
  padding-block: $wikit-ToggleButton-medium-padding-vertical;
  transition-property: $wikit-ToggleButton-transition-property;
  transition-duration: $wikit-ToggleButton-transition-duration;
  transition-timing-function: $wikit-ToggleButton-transition-timing-function;

  &:focus {
    color: $wikit-ToggleButton-focus-color;
    border-color: $wikit-ToggleButton-focus-border-color;
    background-color: $wikit-ToggleButton-focus-background-color;
    box-shadow: $wikit-ToggleButton-focus-box-shadow;
    outline: none;
  }

  &:hover {
    color: $wikit-ToggleButton-hover-color;
    border-color: $wikit-ToggleButton-hover-border-color;
    background-color: $wikit-ToggleButton-hover-background-color;
  }

  &:active {
    color: $wikit-ToggleButton-active-color;
    border-color: $wikit-ToggleButton-active-border-color;
    background-color: $wikit-ToggleButton-active-background-color;
  }

  &:focus:hover {
    border-color: $wikit-ToggleButton-focus-border-color;
  }

  &:disabled {
    color: $wikit-ToggleButton-disabled-color;
    border-color: $wikit-ToggleButton-disabled-border-color;
    background-color: $wikit-ToggleButton-disabled-background-color;
  }

  @media (max-width: $width-breakpoint-mobile) {
    padding-inline: $wikit-ToggleButton-large-padding-horizontal;
    padding-block: $wikit-ToggleButton-large-padding-vertical;
  }
}

.wikit-ToggleButton.wikit-ToggleButton--isActive {
  color: $wikit-ToggleButton-selected-color;
  border-color: $wikit-ToggleButton-selected-border-color;
  background-color: $wikit-ToggleButton-selected-background-color;

  &:focus {
    box-shadow: $wikit-ToggleButton-selected-focus-box-shadow;
    outline: none;
  }
}
</style>
