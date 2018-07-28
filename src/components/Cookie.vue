<template>
    <div>
        <div id="cookiesContainer">
            <p id="cookiesCount">{{ cookiesCount.toFixed(0) }} cookies</p>
            <p id="cookiesPerSecond">{{ cookiesPerSecond.toFixed(2) }} cookies per second</p>
            <img id="cookie" width="350" height="350" src="../assets/images/PerfectCookie.png" @click="increment($event)"/>
        </div>

        <div id="buildings" v-for="(data, building) in buildings">
            <a href="#" v-bind:disabled="cookiesCount < data.price">
                <div v-bind:id="building" @click="increment($event)">
                    <p class="buildingCount">{{ data.count + " " + building }}</p>
                    <p class="buildingPrice">Price : {{ data.price.toFixed(0) }} cookies</p>
                </div>
            </a>
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
                'buildings'
            ])
        },
        mounted() {
            /*
            Lance la fonction pour incrémenter le nombre de cookies tous les centièmes de seconde pour un refresh rapide du compteur
             */
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
