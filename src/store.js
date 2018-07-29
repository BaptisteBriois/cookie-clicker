import Vue from "vue";
import Vuex from "vuex";
import lodash from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cookiesCount: localStorage.getItem("cookiesCount") ? parseFloat(localStorage.getItem("cookiesCount")) : 0,
        cookiesPerSecond: localStorage.getItem("cookiesPerSecond") ? parseFloat(localStorage.getItem("cookiesPerSecond")) : 0,
        cookiesOnClick: localStorage.getItem("cookiesOnClick") ? parseFloat(localStorage.getItem("cookiesOnClick")) : 1,
        clicksCount: localStorage.getItem("clicksCount") ? parseFloat(localStorage.getItem("clicksCount")) : 0,
        buildings: localStorage.getItem("buildings") ? JSON.parse(localStorage.getItem("buildings")) : {
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
        upgrades: localStorage.getItem("upgrades") ? JSON.parse(localStorage.getItem("upgrades")) : {
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
            ],
            click: [
                {
                    id: 10,
                    name: "Plastic mouse",
                    description: "Clicking gains +1% of your CpS. \"Slightly squeaky.\"",
                    need: 1000,
                    price: 50000,
                    active: false
                },
                {
                    id: 11,
                    name: "Iron mouse\t",
                    description: "Clicking gains +1% of your CpS. \"Click like it's 1,349!\"",
                    need: 100000,
                    price: 5000000,
                    active: false
                }
            ]
        },
        displayedUpgrades: localStorage.getItem("displayedUpgrades") ? JSON.parse(localStorage.getItem("displayedUpgrades")) : []
    },
    getters: {
        cookiesCount: state => state.cookiesCount,
        cookiesPerSecond: state => state.cookiesPerSecond,
        cookiesOnClick: state => state.cookiesOnClick,
        buildings: state => state.buildings,
        upgrades: state => state.displayedUpgrades
    },
    mutations: {
        increment(state, selectedBuilding) {
            const {cookiesCount, cookiesPerSecond, cookiesOnClick, clicksCount, buildings, upgrades} = state;
            if (selectedBuilding === "cookie") {
                state.cookiesCount += cookiesOnClick;
                state.clicksCount += 1;

                let searchClickUpgrade = _.find(upgrades.click, {need: state.clicksCount});
                if (searchClickUpgrade) {
                    state.displayedUpgrades = _.sortBy(_.concat(state.displayedUpgrades, searchClickUpgrade), 'price');
                }
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
                    let displayableUpgrades = _.filter(upgrades[selectedBuilding], function (upgrade) {
                        return (!upgrade.active && upgrade.need === buildings[selectedBuilding].count);
                    });
                    state.displayedUpgrades = _.sortBy(_.concat(state.displayedUpgrades, displayableUpgrades), 'price');
                }
            }
        },

        improvement(state, upgradeId) {
            const {cookiesCount, cookiesPerSecond, cookiesOnClick, buildings, upgrades} = state;

            /*
            Recherche de l'id de l'amélioration achetée pour l'activer et la retirer d'achat
             */
            Object.keys(upgrades).forEach(function (building) {
                let selectedUpgrade = _.find(upgrades[building], {id: upgradeId});
                if (selectedUpgrade && cookiesCount >= selectedUpgrade.price) {
                    selectedUpgrade.active = true;
                    _.remove(state.displayedUpgrades, function (displayedUpgrade) {
                        return displayedUpgrade.id === upgradeId;
                    });

                    if (building === "click") {
                        state.cookiesOnClick += cookiesPerSecond / 100;
                    } else {
                        state.cookiesPerSecond = cookiesPerSecond + buildings[building].count * buildings[building].cps;
                        buildings[building].cps = buildings[building].cps * 2;

                        /*
                        Si le curseur est amélioré, le click sur le cookie l'est aussi
                         */
                        if (building === "cursor") {
                            state.cookiesOnClick = cookiesOnClick * 2
                        }
                    }

                    state.cookiesCount -= selectedUpgrade.price;
                }
            })
        },

        save(state) {
            localStorage.setItem("cookiesCount", state.cookiesCount);
            localStorage.setItem("cookiesPerSecond", state.cookiesPerSecond);
            localStorage.setItem("cookiesOnClick", state.cookiesOnClick);
            localStorage.setItem("buildings", JSON.stringify(state.buildings));
            localStorage.setItem("upgrades", JSON.stringify(state.upgrades));
            localStorage.setItem("displayedUpgrades", JSON.stringify(state.displayedUpgrades));
        }
    },
    actions: {}
});
