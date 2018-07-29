<template>
    <div id="mainContainer">
        <div id="cookiesContainer">
            <p id="cookiesCount">{{ cookiesCount.toFixed(0) }} cookies</p>
            <p id="cookiesPerSecond">{{ cookiesPerSecond.toFixed(2) }} cookies per second</p>
            <img id="cookie" width="350" height="350" src="../assets/images/PerfectCookie.png" @click="increment('cookie')"/>
            <a href="#" @click="save()">
                <button>SAVE</button>
            </a>
        </div>

        <div id="upgradesContainer">
            <h3>UPGRADES</h3>
            <div id="upgrades" v-for="upgrade in upgrades">
                <a href="#" v-bind:disabled="cookiesCount < upgrade.price">
                    <div @click="improvement(upgrade.id)">
                        <p class="upgradeName">{{ upgrade.name }}</p>
                        <p class="upgradeDescription">{{ upgrade.description }}</p>
                        <p class="upgradePrice">Price : {{ upgrade.price }} cookies</p>
                    </div>
                </a>
                <hr>
            </div>
        </div>

        <div id="buildingsContainer">
            <h3>BUILDINGS</h3>
            <div id="buildings" v-for="(data, building) in buildings">
                <a href="#" v-bind:disabled="cookiesCount < data.price">
                    <div @click="increment(building)">
                        <p class="buildingCount">{{ data.count + " " + building }}</p>
                        <p class="buildingPrice">Price : {{ data.price.toFixed(0) }} cookies</p>
                    </div>
                </a>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Cookie",
        methods: {
            increment(selectedBuilding) {
                this.$store.commit('increment', selectedBuilding);
            },

            improvement(selectedUpgrade) {
                this.$store.commit('improvement', selectedUpgrade);
            },

            save() {
                this.$store.commit('save');
            }
        },
        computed: {
            ...mapGetters([
                'cookiesCount',
                'cookiesPerSecond',
                'buildings',
                'upgrades'
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

            /*
            Sauvegarde la partie toutes les 10 secondes
             */
            setInterval(function () {
                this.$store.commit('save');
            }.bind(this), 10000);
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
    #mainContainer {
        display: flex;
    }
    #cookiesContainer, #upgradesContainer, #buildingsContainer {
        flex: 1;
        padding-left: 5px;
        padding-right: 5px;
    }
</style>
