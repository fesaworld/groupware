<template>
  <ValidationProvider
    tag="div"
    :name="name"
    class="form-mood-input"
    rules="required"
    :custom-messages="{
      required: 'Bagian ini harus diisi'
    }"
    #default="{ errors }"
    >
    <FormInputHeader
      :title="inputTitle">
      <template #subtitle>
        <span class="text-gray-600 dark:text-gray-300">
          {{ inputSubtitle }}
        </span>
      </template>
    </FormInputHeader>
    <input
      type="hidden"
      :name="name"
      v-model="mValue"
    />
    <div class="form-mood-input__option-list">
      <i
        v-for="moodValue in moodVariants"
        :key="moodValue"
        aria-hidden="true"
        class="form-mood-input__option-list-item">
        <component
          :is="getMoodComponent(moodValue)"
          :animate="moodValue === mValue"
          class="emoji-animation-disabled with-css-filter"
          style="transform-origin: top center;"
          @click.native="onClick(moodValue)" />
        <span class="form-mood-input__option-list-item__label text-gray-500 dark:text-gray-300">
          {{ getMoodLabel(moodValue) }}
        </span>
      </i>
    </div>
    <p v-if="errors.length"
       class="mt-10 form-input__error-hint">
      <slot name="error">
        {{ errors[0] }}
      </slot>
    </p>
  </ValidationProvider>
</template>

<script>
import FormInputHeader from '../../Form/InputHeader.vue'
import { moods } from '../../Reactions'

export default {
  components: {
    FormInputHeader
  },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      inputTitle: 'Bagaimana mood kamu hari ini?',
      inputSubtitle: 'Yuk bantu rekan kamu untuk tahu mood kamu hari ini',
      moodVariants: moods.map((m) => m.value),
      mValue: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        this.mValue = v
      }
    }
  },
  methods: {
    getMoodComponent (value) {
      const matched = moods.find((m) => m.value === value)
      return matched ? matched.component : null
    },
    getMoodLabel (value) {
      const matched = moods.find((m) => m.value === value)
      return matched ? matched.label : null
    },
    onClick (value) {
      this.mValue = value
      this.$emit('input', value)
      this.$emit('update:value', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-mood-input {

  &__option-list {
    grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
    gap: 3rem 2rem;

    @apply grid mt-4;

    @media screen and (min-width: 360px) {

    }
  }

  &__option-list-item {
    @apply cursor-pointer
    relative inline-flex flex-col items-center;

    &__label {
      bottom: -2rem;
      @apply absolute whitespace-no-wrap
      text-xs text-center
      not-italic;

      @screen sm {
        @apply text-sm;
      }
    }
  }
}
</style>
