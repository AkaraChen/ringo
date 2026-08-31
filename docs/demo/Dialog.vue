<template>
    <Button @click="onClick">Show</Button>
</template>
<script setup lang="ts">
import Button from './Button.vue';
import { dialog } from '../../src';

const onClick = () => {
    dialog({
        title: 'Error Occurred',
        text: 'You need to be logged in to continue.',
        showClose: true,
        buttons: [
            { text: 'Primary', onClick: () => {}, close: true, primary: true },
            { text: 'Secondary', close: true }
        ]
    });
};
</script>
