import Vue from "vue";
import Vuex from "vuex";

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
            }
        }
    },
    getters: {
        cookiesCount: state => state.cookiesCount,
        cookiesPerSecond: state => state.cookiesPerSecond,
        buildings: state => state.buildings
    },
    mutations: {
        increment(state, clickedElement) {
            const {cookiesCount, cookiesPerSecond, cookiesOnClick, buildings} = state;
            if (clickedElement === "cookie") {
                state.cookiesCount += cookiesOnClick;
            } else if (clickedElement === "cookiesPerSecond") {
                /*
                Incrémente le compteur de cookies tous les centièmes de seconde par le nombre de cookies par seconde divisé par 100
                 */
                state.cookiesCount += (cookiesPerSecond / 100);
            } else if (clickedElement === "cursor" && cookiesCount >= buildings.cursor.price) {
                state.buildings.cursor.count++;
                state.cookiesPerSecond += buildings.cursor.cps;
                state.cookiesCount -= buildings.cursor.price;
                state.buildings.cursor.price = buildings.cursor.price * 1.15;
            } else if (clickedElement === "grandma" && cookiesCount >= buildings.grandma.price) {
                state.buildings.grandma.count++;
                state.cookiesPerSecond += buildings.grandma.cps;
                state.cookiesCount -= buildings.grandma.price;
                state.buildings.grandma.price = buildings.grandma.price * 1.15;
            }
        }
    },
    actions: {}
});
