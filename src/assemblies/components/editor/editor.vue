<template>
  <div class="tw-editor">
    <textarea
      class="tw-editor-body"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)">
    </textarea>
    <div class="tw-editor-toolbar">
      <div class="tw-editor-toolbar-left">
        <slot name="toolbar-left"></slot>
      </div>
      <div class="tw-editor-toolbar-right">
        <span v-if="maxLength>0" class="tw-editor-length">{{`${value.length}/${maxLength}`}}</span>
        <slot name="toolbar-right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tw-editor',

  props: {
    value: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      Boolean: 0
    },
    placeholder: {
      type: String,
      Boolean: 0
    }
  }
}
</script>
