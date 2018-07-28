import Vue from "vue";
import Vuex from "vuex";
import lodash from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cookiesCount: 0,
        cookiesPerSecond: 0,
        cookiesOnClick: 1,
        buildings: {
            cursor: {
                count: 0,
                price: 15,
                cps: 0.1
            },
            grandma: {
                count: 0,
                price: 100,
                cps: 1
            },
            farm: {
                count: 0,
                price: 1100,
                cps: 8
            }
        },
        upgrades: {
            cursor: [
                {
                    id: 1,
                    name: "Reinforced index finger",
                    description: "The mouse and cursors are twice as efficient. \"prod prod\"",
                    need: 1,
                    price: 100,
                    active: false
                },
                {
                    id: 2,
                    name: "Carpal tunnel prevention cream",
                    description: "The mouse and cursors are twice as efficient. \"it... it hurts to click...\"",
                    need: 1,
                    price: 500,
                    active: false
                },
                {
                    id: 3,
                    name: "Ambidextrous",
                    description: "The mouse and cursors are twice as efficient. \"Look ma, both hands!\"",
                    need: 10,
                    price: 10000,
                    active: false
                },
            ],
            grandma: [
                {
                    id: 4,
                    name: "Forwards from grandma",
                    description: "Grandmas are twice as efficient. \"RE:RE:thought you'd get a kick out of this ;))\"",
                    need: 1,
                    price: 1000,
                    active: false
                },
                {
                    id: 5,
                    name: "Steel-plated rolling pins",
                    description: "Grandmas are twice as efficient. \"Just what you kneaded.\"",
                    need: 5,
                    price: 5000,
                    active: false
                },
                {
                    id: 6,
                    name: "Lubricated dentures",
                    description: "Grandmas are twice as efficient. \"squish\"",
                    need: 25,
                    price: 50000,
                    active: false
                },
            ],
            farm: [
                {
                    id: 7,
                    name: "Cheap hoes",
                    description: "Farms are twice as efficient. \"Rake in the dough!\"",
                    need: 1,
                    price: 11000,
                    active: false
                },
                {
                    id: 8,
                    name: "Fertilizer",
                    description: "Farms are twice as efficient. \"It's chocolate, I swear.\"",
                    need: 5,
                    price: 55000,
                    active: false
                },
                {
                    id: 9,
                    name: "Cookie trees",
                    description: "Farms are twice as efficient.\"A relative of the breadfruit.\"",
                    need: 25,
                    price: 550000,
                    active: false
                },
            ]
        },
        displayedUpgrades: []
    },
    getters: {
        cookiesCount: state => state.cookiesCount,
        cookiesPerSecond: state => state.cookiesPerSecond,
        buildings: state => state.buildings,
        upgrades: state => state.displayedUpgrades
    },
    mutations: {
        increment(state, selectedBuilding) {
            const {cookiesCount, cookiesPerSecond, cookiesOnClick, buildings, upgrades} = state;
            if (selectedBuilding === "cookie") {
                state.cookiesCount += cookiesOnClick;
            } else if (selectedBuilding === "cookiesPerSecond") {
                /*
                Incrémente le compteur de cookies tous les centièmes de seconde par le nombre de cookies par seconde divisé par 100
                 */
                state.cookiesCount += (cookiesPerSecond / 100);
            } else {
                /*
                Incrémente les constructions si le compteur est suffisant pour acheter la construction
                 */
                if (cookiesCount >= buildings[selectedBuilding].price) {
                    buildings[selectedBuilding].count++;
                    state.cookiesPerSecond += buildings[selectedBuilding].cps;
                    state.cookiesCount -= buildings[selectedBuilding].price;
                    buildings[selectedBuilding].price = buildings[selectedBuilding].price * 1.15;

                    /*
                    Récupération des améliorations qui peuvent être proposées au joueur
                     */
                    state.displayedUpgrades = [];
                    Object.keys(upgrades).forEach(function (building) {
                        let displayableUpgrades = _.filter(upgrades[building], function (upgrade) { return (!upgrade.active && upgrade.need <= buildings[building].count); })
                        state.displayedUpgrades = _.sortBy(_.concat(state.displayedUpgrades, displayableUpgrades), 'price');
                    })
                }
            }
        },

        improvement(state, upgradeId) {
            const {cookiesPerSecond, cookiesOnClick, buildings, upgrades} = state;

            /*
            Recherche de l'id de l'amélioration achetée pour l'activer et la retirer d'achat
             */
            Object.keys(upgrades).forEach(function (building) {
                let selectedUpgrade = _.find(upgrades[building], {id: upgradeId});
                if (selectedUpgrade) {
                    selectedUpgrade.active = true;
                    _.remove(state.displayedUpgrades, function (displayedUpgrade) {
                        return displayedUpgrade.id === upgradeId;
                    });

                    state.cookiesPerSecond = cookiesPerSecond + buildings[building].cps;
                    buildings[building].cps = buildings[building].cps * 2;

                    /*
                    Si le curseur est amélioré, le click sur le cookie l'est aussi
                     */
                    if (building === "cursor") (
                        state.cookiesOnClick = cookiesOnClick * 2
                    )
                }
            })
        }
    },
    actions: {}
});
