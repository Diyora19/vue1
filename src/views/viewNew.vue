<template>
    <div class="red--text pt-5">
        {{viewNew}}
    </div>
</template>

<script>
export default {
    computed: {
        viewNew(){
            return this.$store.getters['viewNew']
        }
    }
}
</script>
