<template>
	<div class="flex flex-col gap-2 bg-slate-200">
		<div class="bg-white flex flex-col gap-3">
			<!-- Map -->
			<div class="flex justify-center">
				<div style="height: 50vh; width: 100vw">
					<LMap
						ref="map"
						:zoom="30"
						:options="{
							zoomControl: false,
							scrollWheelZoom: false,
						}"
						:center="[40.68034, -73.88416]"
					>
						<LTileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
							layer-type="base"
							name="OpenStreetMap"
						/>
						<LMarker
							:lat-lng="[40.68034, -73.88416]"
							:name="'location'"
						>
							<LPopup> Pickup location. </LPopup>
						</LMarker>
					</LMap>
					<UButton
						icon="i-heroicons-chevron-left"
						class="text-blue-500 rounded-full absolute top-[15%] left-[10%] z-[401]"
					/>
				</div>
			</div>
			<!-- Badges -->
			<div class="flex gap-3 justify-center">
				<UBadge
					class="whitespace-nowrap"
					:variant="badge.variant"
					:color="badge.color"
					size="md"
					:ui="{ rounded: 'rounded-full' }"
					v-for="badge in badges"
					:key="badge.name"
					>{{ badge.text }}</UBadge
				>
			</div>
			<!-- Date & Time -->
			<div class="flex gap-3 justify-around">
				<div class="flex gap-3 items-center">
					<div
						class="border border-blue-500 p-1 flex flex-col justify-center items-center rounded-xl w-12 h-12"
					>
						<UIcon
							name="i-heroicons-calendar"
							class="text-blue-500 text-3xl"
						></UIcon>
					</div>
					<div class="flex flex-col gap-1">
						<span class="text-gray-500">Date</span>
						<span class="text-black font-bold">March&nbsp;6</span>
					</div>
				</div>
				<div class="flex gap-3 items-center">
					<div
						class="border border-blue-500 p-1 flex flex-col justify-center items-center rounded-xl w-12 h-12"
					>
						<UIcon
							name="i-heroicons-clock"
							class="text-blue-500 text-3xl"
						></UIcon>
					</div>
					<div class="flex flex-col gap-1">
						<span class="text-gray-500">Time</span>
						<span class="text-black font-bold"
							>11&nbsp;am&nbsp;-&nbsp;12&nbsp;pm</span
						>
					</div>
				</div>
			</div>
			<!-- Reward Card -->
			<UCard :ui="rewardCardUI">
				<div class="text-black font-bold">You&nbsp;will&nbsp;earn</div>
				<div class="text-blue-500 text-3xl">$30</div>
			</UCard>
			<div>
				<!-- Customer Card -->
				<UCard class="rounded-none">
					<div class="flex items-center justify-between gap-3">
						<div class="flex flex-col gap-1">
							<div class="text-gray-500">Customer</div>
							<div class="text-black font-bold">
								Christopher&nbsp;Nunez
							</div>
							<div class="text-black font-bold">
								+1&nbsp;(516)&nbsp;812-9200
							</div>
						</div>
						<div class="flex gap-3 items-center">
							<div
								class="flex flex-col justify-center items-center rounded-xl gap-1 bg-slate-300 p-1 w-16 h-16"
							>
								<UIcon
									name="i-heroicons-chat-bubble-bottom-center-solid"
									class="text-blue-500 text-3xl"
								></UIcon>
								<span class="text-blue-600">Msg</span>
							</div>
							<div
								class="flex flex-col justify-center items-center rounded-xl gap-1 bg-slate-300 p-1 w-16 h-16"
							>
								<UIcon
									name="i-heroicons-phone-solid"
									class="text-blue-500 text-3xl"
								></UIcon>
								<span class="text-blue-600">Call</span>
							</div>
						</div>
					</div>
				</UCard>
				<!-- Address Card -->
				<UCard class="rounded-none">
					<div class="flex items-center justify-between gap-3">
						<div class="flex flex-col gap-1">
							<div class="text-gray-500">Pickup&nbsp;address</div>
							<div class="text-black font-bold">
								3001&nbsp;Fulton&nbsp;St,&nbsp;Brooklyn,&nbsp;NY&nbsp;11208
							</div>
							<div class="text-blue-500 flex gap-1 items-center">
								<UIcon
									name="i-heroicons-map-pin"
									class="text-xl"
								></UIcon>
								<template v-if="gettingLocation"
									>Calculating&nbsp;distance
								</template>
								<template v-else>
									{{
										distance
									}}&nbsp;mi&nbsp;away&nbsp;from&nbsp;my&nbsp;location
								</template>
							</div>
						</div>
						<UButton
							label="GO"
							class="text-2xl w-16 h-16 justify-center"
						/>
					</div>
				</UCard>
				<!-- Icons Card -->
				<UCard class="rounded-none">
					<div class="flex items-center justify-between gap-3">
						<div
							v-for="icon in icons"
							:key="icon.text"
							class="flex flex-col justify-center items-center gap-1 p-1 w-16 h-16"
						>
							<UIcon
								:name="icon.icon"
								class="text-blue-500 text-3xl"
							></UIcon>
							<span :class="icon.class">{{ icon.text }}</span>
						</div>
					</div>
				</UCard>
			</div>
		</div>
		<!-- Devices -->
		<div class="bg-white flex flex-col gap-3">
			<div>
				<h1 class="text-2xl text-black font-bold my-3 ml-4 sm:ml-6">
					Devices
				</h1>
				<UCard
					v-for="(device, index) in devices"
					:key="device.name"
					:class="index == 0 ? 'ring-0' : 'ring-1'"
					class="rounded-none"
				>
					<div class="flex gap-3 items-center justify-between">
						<div class="flex gap-3 items-center">
							<div class="w-fit h-20">
								<img
									class="max-h-full max-w-full"
									:src="device.src"
									:alt="device.name"
								/>
							</div>
							<div class="flex flex-col gap-1">
								<span class="text-black font-bold">{{
									device.name
								}}</span>
								<span class="text-gray-500">{{
									device.state
								}}</span>
								<span class="text-blue-500">{{
									device.offer
								}}</span>
							</div>
						</div>
						<div
							class="flex flex-col justify-between items-end gap-4 h-20"
						>
							<UIcon
								name="i-heroicons-ellipsis-horizontal-circle"
								class="text-rose-600 text-3xl"
							></UIcon>
							<UButton
								label="Start inspection"
								class="text-nowrap text-white"
								color="pink"
								:disabled="loading"
								@click="showImageUploadModal = true"
							/>
						</div>
					</div>
				</UCard>
			</div>
		</div>
		<!-- Payment -->
		<div class="bg-white flex flex-col gap-3 pb-20">
			<div class="flex flex-col gap-3 border-b border-gray-200">
				<div
					class="flex justify-between items-center gap-3 my-3 mx-4 sm:mx-6"
				>
					<div class="flex items-center gap-3">
						<UIcon
							name="i-heroicons-clock"
							class="text-3xl text-amber-700"
						></UIcon>
						<span class="text-2xl text-black font-bold">
							Payment&nbsp;Pending
						</span>
					</div>
					<UIcon
						name="i-heroicons-clock"
						class="text-rose-600 text-3xl"
					></UIcon>
				</div>
				<div class="flex flex-col gap-1 mx-4 sm:mx-6">
					<span class="text-black">Subtotal</span>
					<div class="flex justify-between items-center gap-3">
						<span class="text-gray-500"
							>{{ devices.length }}&nbsp;Devices</span
						>
						<span class="text-black">$1300</span>
					</div>
				</div>
				<div class="flex flex-col gap-1 mx-4 sm:mx-6">
					<span class="text-black">Payment&nbsp;Method</span>
					<span class="text-gray-500"
						>Cashapp:<span class="text-blue-500"
							>&nbsp;$scga12</span
						></span
					>
				</div>
				<div
					class="flex justify-between items-center gap-3 mx-4 sm:mx-6 mb-3"
				>
					<span class="text-black">Total</span>
					<span class="text-black">$1300</span>
				</div>
			</div>
			<div class="flex justify-center">
				<UButton
					class="px-14 text-2xl"
					size="xl"
					label="Send Payment"
					color="blue"
				/>
			</div>
		</div>
		<!-- Image Modal-->
		<UModal v-model="showImageUploadModal">
			<UCard class="rounded-none">
				<template #header>
					<div class="flex items-center justify-between">
						<h3
							class="text-base font-semibold leading-6 text-black"
						>
							Attachments
						</h3>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							@click="closeModal"
							:disabled="loading"
						/>
					</div>
				</template>
				<div class="flex flex-col gap-3">
					<span v-if="loading">Converting</span>
					<template v-else>
						<label for="fileAttachment" class="w-100"
							>Upload&nbsp;file</label
						>
						<input
							id="fileAttachment"
							type="file"
							class="w-100"
							accept="image/*"
							@change="fileChanges"
							:disabled="loading"
						/>
					</template>
				</div>
				<template #footer>
					<div class="flex justify-end gap-3">
						<UButton
							label="close"
							color="pink"
							:disabled="loading"
							@click="closeModal"
						/>
					</div>
				</template>
			</UCard>
		</UModal>
	</div>
</template>

<script setup>
import { onMounted } from "vue";

const distance = ref(0);
const gettingLocation = ref(false);
const toast = useToast();
const showImageUploadModal = ref(false);
const loading = ref(false);
const selectedFile = ref(null);

onMounted(() => {
	if (!("geolocation" in navigator)) {
		return;
	}
	gettingLocation.value = true;
	// get position
	navigator.geolocation.getCurrentPosition(
		(pos) => {
			gettingLocation.value = false;
			distance.value = distanceInMilesBetweenEarthCoordinates(
				pos.coords.latitude,
				pos.coords.longitude,
				40.68034,
				-73.88416
			);
		},
		(err) => {
			gettingLocation.value = false;
		}
	);
});
const badges = [
	{
		variant: "outline",
		color: "blue",
		text: "Offer #T216",
	},
	{
		variant: "solid",
		color: "rose",
		text: "Pending payment",
	},
	{
		variant: "solid",
		color: "gray",
		text: "Assigned",
	},
];
const icons = [
	{
		icon: "i-heroicons-chat-bubble-bottom-center",
		text: "Chats",
		class: "text-black",
	},
	{
		icon: "i-heroicons-calendar",
		text: "Schedule",
		class: "text-black",
	},
	{
		icon: "i-heroicons-map-pin",
		text: "Pickups",
		class: "text-blue-500",
	},
	{
		icon: "i-heroicons-currency-dollar",
		text: "Earnings",
		class: "text-black",
	},
	{
		icon: "i-heroicons-user",
		text: "Accounts",
		class: "text-black",
	},
];
const devices = [
	{
		src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGWBZvzbG2xVGoBK_ecazYSi_Yebggp6elc9XM3Lk&s",
		name: "iPhone 13 Pro Max",
		state: "128GP - Unlocked - Flawless",
		offer: "Estimated offer $750",
	},
	{
		src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGWBZvzbG2xVGoBK_ecazYSi_Yebggp6elc9XM3Lk&s",
		name: "iPhone 13",
		state: "128GP - Unlocked - Good",
		offer: "Estimated offer $550",
	},
];
const rewardCardUI = {
	base: "mx-12",
	background: "bg-blue-200",
	ring: "ring-1 ring-blue-500",
	body: {
		base: "flex justify-between gap-3 items-center mx-12",
	},
};
const closeModal = () => {
	showImageUploadModal.value = false;
};
const fileChanges = async (event) => {
	const files = event.target.files;
	toast.add({
		title: "Image selected successfully.",
		icon: "i-heroicons-check-circle",
	});
	loading.value = true;
	selectedFile.value = await convertBase64(files[0]);
	loading.value = false;
};
const convertBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};
const degreesToRadians = (degrees) => {
	return (degrees * Math.PI) / 180;
};
const distanceInMilesBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
	var earthRadiusKm = 6371;
	var dLat = degreesToRadians(lat2 - lat1);
	var dLon = degreesToRadians(lon2 - lon1);
	lat1 = degreesToRadians(lat1);
	lat2 = degreesToRadians(lat2);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) *
			Math.sin(dLon / 2) *
			Math.cos(lat1) *
			Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return ((earthRadiusKm * c) / 1.609).toFixed(1);
};
</script>
