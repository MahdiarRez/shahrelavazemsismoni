<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="180"
		height="120"
		viewBox="0 0 180 120"
		role="img"
		aria-label="آیکون تومان"
		preserveAspectRatio="xMidYMid meet">
		<!-- --------─ گرادینت رنگی متن --------- -->
		<defs>
			<linearGradient
				id="txtGrad"
				x1="0%"
				y1="0%"
				x2="0%"
				y2="100%">
				<stop
					offset="0%"
					stop-color="#ff5e00" />
				<stop
					offset="50%"
					stop-color="#ff1600" />
				<stop
					offset="100%"
					stop-color="#c40000" />
			</linearGradient>

			<!-- سایه نازک برای عمق -->
			<filter
				id="txtShadow"
				x="-20%"
				y="-20%"
				width="140%"
				height="140%">
				<feDropShadow
					dx="0"
					dy="2"
					stdDeviation="2"
					flood-color="#00000044" />
			</filter>
		</defs>

		<!-- ایجاد یک مستطیل پس‌زمینهٔ نرم (اختیاری) -->
		<rect
			x="5"
			y="5"
			width="170"
			height="110"
			rx="12"
			ry="12"
			fill="#f9f9f9"
			stroke="#e0e0e0"
			stroke-width="1" />

		<!-- ---------- خط اول : تو ---------- -->
		<text
			x="50%"
			y="45"
			dominant-baseline="middle"
			text-anchor="middle"
			font-family="'Vazir', 'Tahoma', sans-serif"
			font-size="38"
			font-weight="700"
			fill="url(#txtGrad)"
			filter="url(#txtShadow)">
			تو
		</text>

		<!-- ---------- خط دوم : مان ---------- -->
		<text
			x="50%"
			y="85"
			dominant-baseline="middle"
			text-anchor="middle"
			font-family="'Vazir', 'Tahoma', sans-serif"
			font-size="38"
			font-weight="700"
			fill="url(#txtGrad)"
			filter="url(#txtShadow)">
			مان
		</text>

		<!-- خط زیرنویس تزئینی (اختیاری) -->
		<path
			d="M30,100 Q90,130 150,100"
			stroke="#ff5e00"
			stroke-width="2"
			fill="none" />
	</svg>
</template>

<script setup>
// اگر نیاز به منطق خاصی ندارید، این بخش می‌تواند خالی بماند.
</script>

<style scoped>
.icon {
	width: 14px;
	height: 14px;
	fill: #424750;
}
</style>
