<template>
    <div>
        <div id="cookiesContainer">
            <p id="cookiesCount">{{ cookiesCount.toFixed(0) }} cookies</p>
            <p id="cookiesPerSecond">{{ cookiesPerSecond.toFixed(2) }} cookies per second</p>
            <img id="cookies" width="350" height="350" src="../assets/images/PerfectCookie.png" @click="increment($event)"/>
        </div>

        <div id="buildings">
            <div id="cursorsContainer">
                <a href="#" v-if="cookiesCount < cursorPrice" disabled>
                    <p id="cursors" @click="increment($event)">{{ cursorsCount }} cursors</p>
                    <p id="cursorPrice">Cost : {{ cursorPrice.toFixed(0) }} cookies</p>
                </a>
                <a href="#" v-else @click="increment($event)">
                    <p id="cursors" @click="increment($event)">{{ cursorsCount }} cursors</p>
                    <p id="cursorPrice">Cost : {{ cursorPrice.toFixed(0) }} cookies</p>
                </a>
            </div>

            <div id="grandmasContainer">
                <a href="#" v-if="cookiesCount < grandmaPrice" disabled>
                    <p id="grandmas" @click="increment($event)">{{ grandmasCount }} grandmas</p>
                    <p id="grandmaPrice">Cost : {{ grandmaPrice.toFixed(0) }} cookies</p>
                </a>
                <a href="#" v-else @click="increment($event)">
                    <p id="grandmas" @click="increment($event)">{{ grandmasCount }} grandmas</p>
                    <p id="grandmaPrice">Cost : {{ grandmaPrice.toFixed(0) }} cookies</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Cookie",
        methods: {
            increment(event) {
                var clickedElement = event.currentTarget.id;
                this.$store.commit('increment', clickedElement);
            }
        },
        computed: {
            ...mapGetters([
                'cookiesCount',
                'cookiesPerSecond',
                'cursorsCount',
                'grandmasCount',
                'cursorPrice',
                'grandmaPrice',
            ])
        },
        mounted() {
            setInterval(function () {
                if (this.cookiesPerSecond > 0) {
                    this.$store.commit('increment', "cookiesPerSecond");
                }
            }.bind(this), 10);
        }
    }
</script>

<style scoped>
    a {
        color: #000;
        text-decoration: none;
    }
    a[disabled] {
        color: grey;
    }
</style>
