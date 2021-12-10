import { BouncingDots } from '@/main';
import { bouncingDotsSizes } from '@/components/bouncingDotsProps'; // eslint-disable-line no-restricted-imports
import { Component } from 'vue';

export default {
	component: BouncingDots,
	title: '/Loader/BouncingDots',
};

export function all(): Component {
	return {
		data(): object {
			return { bouncingDotsSizes };
		},
		components: { BouncingDots },
		template: `
			<div>
				<div v-for="size in bouncingDotsSizes" style="font-family: sans-serif; color: #202122">
                    {{ size }}<br><br>
                    <BouncingDots :size="size"></BouncingDots><br><br>
				</div>
            </div>
		`,
	};
}

all.parameters = {
	controls: { hideNoControlsWarning: true },
};
