<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>
<h3 {...$$restProps} class={`h3 text-inherit ${$$restProps.class}`}>
  <slot />
</h3>
