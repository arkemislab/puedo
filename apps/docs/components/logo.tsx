import { cn } from "../lib/utils";

export function Logo({ className }: { className?: string }) {
	return (
		<svg
			className={cn("h-6", className)}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 634.04 296.18"
		>
			<path
				fill="currentColor"
				d="M31.16,165.37c-9.59,9.66-7.21,29.76-1.88,41.38,16.74,36.46,68.91,56.22,105.7,63.3,88.7,17.09,166.39-7.2,242.48-50.88,55.95-32.12,108.95-89.77,178.24-85.84,77.3,4.38,109.21,76.36,40.77,123.86-64.64,44.86-145.65,25.25-218.86,28.14-33.51,1.32-66.54,8.61-99.97,10.03-77.81,3.31-236.31.59-272.67-85.31-15.64-36.96,6.73-82.08,50.41-74.41,41.11,7.23,58.57,45.59,96.2,57.67l1.57-2.45c13.77-50.32,21.05-105.04,36.29-154.71,5.18-16.87,12.4-25.18,29.04-31.96,32.91-13.43,52.03,12.78,81.53,6.53,14.32-3.04,26.1-9.4,41.61-10.39,37.7-2.41,60,8.69,88.01,32.07,18.98,15.84,19.02,21.59,22.39,45.61,3.53,25.15,4.56,50.69,8.15,75.84.03,1.58-1.15,2.07-2.07,2.96-4.72,4.57-18.44,10.96-24.85,15.14-52.2,34.03-103.33,68.81-166.71,78.31-.82.12-3.48.52-1.87-.89,19.48-7.31,37.83-17.57,55.49-28.5-13.4-.08-27.21-2.57-40.55-2.54-28.99.07-59.13.86-87.94,4.05-13.55,1.5-26.98,4.38-40.51,6,7.22,7.3,17.09,9.82,26.39,13.1,1.09.38,2.44.25,2.61,1.88-25.46,4.25-50.24,9.66-76.23,5.74-28.14-4.24-57.7-22.37-68.54-49.46-.97-2.44-4.24-11.84-4.24-13.76v-20.5ZM341.16,24.38c-1.73-.22-3.36.13-5.04.44-18.16,3.35-42.45,14.04-59.99,10.08-7.08-1.6-14.88-5.47-21.96-7.53,10.29,25.54,7.51,51.81-15.68,68.83-10.34,7.58-24.03,7.94-33.57,13.43-4.97,2.86-6.03,7.38-7.46,12.54-4.45,16.01-6.39,33.94-10.29,50.2l139.99-12c-.22-1.71-3.76-1.96-5.17-2.32-18.94-4.83-40.82-5.9-60.32-6.68l-21.5-2.98c24.89-3.84,49.77-8.63,74.99-9.02-1.94-2.45-7.63-3.06-10.79-3.7-14.31-2.87-29.15-3.33-43.59-5.41-1.12-.16-4.67-.36-4.61-1.87l50.99-6.02-3.45-2.04-39.54-6.94,30.99-6.02c-9.92-18.09-21.52-44.45-1.7-60.19l47.69-22.79ZM375.17,193.37c-48.34-6.74-97.59-8.7-146.55-7.05-2.36.08-4.55.98-6.92,1.08-13.11.59-26.4.23-39.32,3.18-.22,2.73-5.35,14.92-1.77,15.52,30.08-4.13,60.7-4.16,91.09-4.78,29.42-.6,59.26,1.28,88.69-3.23,3.89-.6,9.63-1.62,13.31-2.7,1.47-.43,1.74.56,1.46-2.02Z"
			/>
		</svg>
	);
}
