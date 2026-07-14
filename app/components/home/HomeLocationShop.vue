<script setup lang="js">
    import { useClipboard } from "@vueuse/core";
    import { push } from "notivue";

    const STORE_LOCATION = {
        lat: 36.32865439665321,
        lng: 59.70242764221999,
    };

    const STORE_ADDRESS =
        "خراسان رضوی، مشهد، انتهای طبرسی شمالی، میدان پنجتن سمت چپ، جنب تالار یکتا، شهر لوازم سیسمونی";

    const NESHAN_ROUTE_URL = `https://neshan.org/maps/routing/car/destination/${STORE_LOCATION.lat},${STORE_LOCATION.lng}#c35.538-58.993-9z-0p`;

    const MAP_EMBED_URL =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1607.1494992434482!2d59.70138385699898!3d36.32930268304915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6c9a4d35f5c5e9%3A0xacab83c9f806b632!2z2LTZh9ixINmE2YjYp9iy2YUg2LPbjNiz2YXZiNmG24w!5e0!3m2!1sen!2s!4v1784005210855!5m2!1sen!2s";

    const WORKING_HOURS = [
        {
            days: "شنبه تا پنجشنبه",
            hours: "۹:۰۰ - ۲۰:۰۰",
            colorClass: "text-pink-600",
        },
        { days: "جمعه", hours: "تعطیل", colorClass: "text-green-600" },
    ];

    const TRANSPORT_OPTIONS = [
        {
            icon: "i-iconamoon-number-1-circle",
            label: "خودرو شخصی - پارکینگ رایگان",
            bgClass: "bg-primary-50",
            colorClass: "text-primary",
        },
        {
            icon: "i-iconamoon-number-2-circle",
            label: "اتوبوس - خط ۸۰۰ و ...",
            bgClass: "bg-green-50",
            colorClass: "text-green-600",
        },
        {
            icon: "i-iconamoon-number-3-circle",

            label: "مترو - ایستگاه طبرسی",
            bgClass: "bg-purple-50",
            colorClass: "text-purple-600",
        },
        {
            icon: "i-iconamoon-number-4-circle",
            label: "تاکسی آنلاین - اسنپ و تپ‌سی",
            bgClass: "bg-orange-50",
            colorClass: "text-orange-600",
        },
    ];

    const TABS = [
        { id: "map", label: "نقشه", icon: "i-iconamoon-location-pin" },
        { id: "street", label: "نمای خیابان", icon: "i-iconamoon-eye" },
    ];

    const activeTab = ref("map");

    function setActiveTab(tabId) {
        activeTab.value = tabId;
    }

    const { copy, copied, isSupported } = useClipboard({
        source: STORE_ADDRESS,
        copiedDuring: 1500,
    });

    async function copyAddress() {
        if (!isSupported.value) {
            push.error("مرورگر شما از کپی خودکار پشتیبانی نمی‌کند");
            return;
        }

        await copy();
        push.success("آدرس فروشگاه کپی شد");
    }
</script>

<template>
    <section
        id="shop"
        class="relative py-32 mt-14 bg-white text-dark px-6 rounded-[28px] overflow-hidden"
    >
        <img
            src="/people.png"
            alt="people"
            class="absolute inset-0 h-full w-full object-cover opacity-40 blur-[1px]"
            loading="lazy"
        />

        <div class="max-w-6xl mx-auto relative">
            <!-- Header -->
            <div class="text-center space-y-4 mb-16">
                <h2 class="font-lalezar text-4xl font-bold">
                    منتظر حضور گرمتون در شهر لوازم سیسمونی هستیم
                </h2>
                <p class="text-dark/80 max-w-2xl mx-auto font-normal">
                    فروشگاه ما در مشهد مقدس، آماده ارائه بهترین خدمات به شما و
                    فرشته کوچکتان است.
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Store Information -->
                <div
                    class="flex flex-col items-stretch justify-between gap-y-4"
                >
                    <!-- Address -->
                    <div class="p-6 bg-white rounded-2xl">
                        <div
                            class="flex items-start gap-4 flex-col sm:flex-row"
                        >
                            <div
                                class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white"
                            >
                                <UIcon
                                    name="i-iconamoon-location-pin"
                                    class="text-xl"
                                />
                            </div>
                            <div class="flex-1">
                                <h3 class="font-bold mb-2 text-dark/80">
                                    آدرس فروشگاه
                                </h3>
                                <p class="text-dark/80 mb-4">
                                    {{ STORE_ADDRESS }}
                                </p>
                                <div class="flex gap-2">
                                    <UButton
                                        class="text-xs sm:text-sm py-2 text-nowrap rounded-lg"
                                        @click="copyAddress"
                                    >
                                        <template #leading>
                                            <UIcon
                                                class="text-base"
                                                :name="
                                                    copied
                                                        ? 'i-iconamoon-check'
                                                        : 'i-iconamoon-copy'
                                                "
                                            />
                                        </template>
                                        {{ copied ? "کپی شد" : "کپی" }}
                                    </UButton>

                                    <a
                                        :href="NESHAN_ROUTE_URL"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <UButton
                                            size="sm"
                                            color="white"
                                            variant="solid"
                                            class="text-xs sm:text-sm py-2 text-nowrap rounded-lg"
                                        >
                                            <template #leading>
                                                <UIcon
                                                    name="i-iconamoon-arrow-top-right-1"
                                                    class="text-base"
                                                />
                                            </template>
                                            مسیریابی در نشان
                                        </UButton>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Phone -->
                    <div
                        class="px-6 py-3 bg-white rounded-2xl flex items-center justify-between gap-4"
                    >
                        <div
                            class="flex flex-col sm:flex-row sm:items-center gap-4 text-sm sm:text-base"
                        >
                            <div
                                class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white"
                            >
                                <UIcon
                                    name="i-iconamoon-phone"
                                    class="text-xl"
                                />
                            </div>
                            <h4 class="font-semibold">تلفن تماس</h4>
                        </div>
                        <div
                            class="flex flex-row-reverse gap-2.5 items-center self-end sm:self-auto"
                        >
                            <a
                                href="tel:09395542666"
                                class="font-poppins font-medium tracking-wide text-base sm:text-lg hover:text-blue-500 hover:underline"
                            >
                                09395542666
                            </a>
                        </div>
                    </div>

                    <!-- Working Hours -->
                    <div
                        class="p-6 bg-white rounded-2xl flex flex-col sm:flex-row items-start gap-4"
                    >
                        <div
                            class="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center text-white"
                        >
                            <UIcon name="i-iconamoon-clock" class="text-xl" />
                        </div>
                        <div class="flex-1 w-full">
                            <h4 class="font-semibold mb-4">ساعات کاری</h4>
                            <div class="space-y-2 w-full text-sm sm:text-base">
                                <div
                                    v-for="schedule in WORKING_HOURS"
                                    :key="schedule.days"
                                    class="flex justify-between"
                                >
                                    <span>{{ schedule.days }}</span>
                                    <span
                                        class="font-medium"
                                        :class="schedule.colorClass"
                                    >
                                        {{ schedule.hours }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Transportation -->
                    <div class="p-6 bg-white rounded-2xl">
                        <div class="flex flex-row items-center gap-4 mb-4">
                            <div
                                class="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white"
                            >
                                <UIcon
                                    name="i-iconamoon-store"
                                    class="text-xl"
                                />
                            </div>
                            <h4 class="font-semibold flex items-center gap-2">
                                راه‌های دسترسی
                            </h4>
                        </div>
                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
                        >
                            <div
                                v-for="option in TRANSPORT_OPTIONS"
                                :key="option.label"
                                class="flex items-center gap-3 p-3 rounded-lg"
                                :class="option.bgClass"
                            >
                                <UIcon
                                    :name="option.icon"
                                    :class="option.colorClass"
                                    class="text-xl"
                                />
                                <span>{{ option.label }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Map Section -->
                <div
                    class="flex flex-col items-stretch justify-between gap-y-4 w-full"
                >
                    <!-- Tabs -->
                    <div class="flex gap-2 bg-white rounded-xl p-1.5">
                        <button
                            v-for="tab in TABS"
                            :key="tab.id"
                            type="button"
                            class="flex-1 rounded-lg py-3 cursor-pointer flex items-center justify-center flex-row"
                            :class="
                                activeTab === tab.id
                                    ? 'bg-primary-400 text-white'
                                    : 'bg-transparent hover:bg-primary-400/30 transition-colors duration-300 ease-in-out text-dark/80'
                            "
                            @click="setActiveTab(tab.id)"
                        >
                            <UIcon :name="tab.icon" class="ml-1.5 text-lg" />
                            {{ tab.label }}
                        </button>
                    </div>

                    <!-- Map Container -->
                    <div
                        class="relative h-full bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl overflow-hidden"
                    >
                        <iframe
                            v-if="activeTab === 'map'"
                            :src="MAP_EMBED_URL"
                            width="100%"
                            height="100%"
                            style="border: 0"
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        />
                        <div
                            v-else
                            class="flex items-center justify-center h-full"
                        >
                            <div class="text-center space-y-2">
                                <AppIcon
                                    name="compass"
                                    class="mx-auto text-blue-500 text-4xl"
                                />
                                <p class="text-dark/80">
                                    نمای خیابان - به زودی
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
