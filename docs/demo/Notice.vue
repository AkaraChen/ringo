<template>
    <Button @click="$notice()">notice</Button>
    <Button @click="$notice({type: 'warning'})">Warning</Button>
    <Button @click="$notice({type: 'error'})">Error</Button>
    <Button @click="$notice({type: 'success'})">Success</Button>
</template>

<script lang="ts" setup>
import { notice, NoticeProps } from "../../src/index"
import "../../style/notice/default.css"
import Button from "./Button.vue"

const $notice = (arg?: Partial<NoticeProps>) => {
    notice(Object.assign({ text: 'Notice' }, arg))
}
</script>

<style scoped>

</style>