import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cookiesCount: 0,
        cookiesPerSecond: 0,
        cursorsCount: 0,
        grandmasCount: 0,
        cursorPrice: 10,
        grandmaPrice: 20,
    },
    getters: {
        cookiesCount: state => state.cookiesCount,
        cookiesPerSecond: state => state.cookiesPerSecond,
        cursorsCount: state => state.cursorsCount,
        grandmasCount: state => state.grandmasCount,
        cursorPrice: state => state.cursorPrice,
        grandmaPrice: state => state.grandmaPrice,
    },
    mutations: {
        increment(state, clickedElement) {
            const {cookiesCount, cookiesPerSecond, cursorPrice, grandmaPrice} = state;
            if (clickedElement == "cookies") {
                state.cookiesCount++;
            } else if (clickedElement == "cookiesPerSecond") {
                state.cookiesCount += (cookiesPerSecond / 100);
            } else if (clickedElement == "cursors" && cookiesCount >= cursorPrice) {
                state.cursorsCount++;
                state.cookiesPerSecond += 0.2;
                state.cookiesCount -= cursorPrice;
                state.cursorPrice = cursorPrice * 1.2;
            } else if (clickedElement == "grandmas" && cookiesCount >= grandmaPrice) {
                state.grandmasCount++;
                state.cookiesPerSecond += 1;
                state.cookiesCount -= grandmaPrice;
                state.grandmaPrice = grandmaPrice * 1.2;
            }
        }
    },
    actions: {}
});
