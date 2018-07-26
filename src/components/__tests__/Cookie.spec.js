import { shallowMount } from "@vue/test-utils";
import Cookie from "@/components/Cookie.vue";

describe("Cookie.vue", () => {
    const wrapper = shallowMount(Cookie);

    it("renders cookies count", () => {
        expect(wrapper.html()).toContain('<p id="cookiesCount">0 cookies</p>')
    });

    it("click cookie should increment the cookies count", () => {
        expect(wrapper.vm.cookiesCount).toBe(0);
        const cookie = wrapper.find("img");
        cookie.trigger("click");
        expect(wrapper.vm.cookiesCount).toBe(1);
    });
});