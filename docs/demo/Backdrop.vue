<template>
    <Button @click="show">Show</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue"
import { backdrop, notice } from "../../src";
import "../../style/notice/ant.css"

const { add, remove } = backdrop()
const show = () => {
    add()
    notice({ text: "Backdrop will disappear in 3 seconds" })
    setTimeout(() => {
        remove()
    }, 3000);
}
</script>