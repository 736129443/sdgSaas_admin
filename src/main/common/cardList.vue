<template>
    <div class="fl w">
        <div class="card_list-body fl" v-for="card in cards" @click="onCardClick(card)">
            <h2>{{ card.title }}</h2>
            <p>{{ card.content }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            cards: {
                type: Array,
                default: ()=>[]
            }
        },
        methods:{
            onCardClick (card) {
                this.$emit('onCardClick', card);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card_list-body {
        margin:10px;
        background-color:#E2E2E2;
        padding:10px;
        text-align: center;
        width:180px;
        h2 {
            padding: 10px;
            font-size:20px;
        }
        p {
            font-size:18px;
        }
    }
</style>