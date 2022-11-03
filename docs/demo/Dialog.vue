<template>
    <Button @click="onClick">Show</Button>
</template>
<script setup lang="ts">
import Button from './Button.vue';
import { dialog } from '../../src';
import '../../style/dialog/ant.css'

const onClick = () => {
    dialog({
        title: "Error Occurred", text: 'You need to be logged in to continue.',
        primaryButton: {
            text: 'Primary', onClick: () => { }, close: true
        },
        secondaryButton: {
            text: 'Secondary', onClick: (close) => {
                if (1 === 1) close()
            }
        },
    })
}
</script>