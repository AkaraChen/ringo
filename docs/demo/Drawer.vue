<template>
    <Button @click="onClick">Open</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue"
import { drawer } from "../../src/index"
import "../../style/drawer/default.css"

const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, odit, corrupti unde velit minus commodi eaque libero dolor laudantium aliquid laboriosam est? Mollitia delectus sequi nesciunt placeat rerum exercitationem facilis?"
const onClick = () => drawer({
    width: '300px', title: 'Test', content: lorem,
    primaryButton: { text: 'Primary', onClick: () => { }, close: true },
    secondaryButton: {
        text: 'Secondary', onClick: (close) => {
            if (1 === 1) close()
        }
    },
})
</script>