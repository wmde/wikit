import BouncingDots from '@/components/BouncingDots';
import { bouncingDotsSizes } from '@/components/bouncingDots';
import { Component } from 'vue';

export default {
    component: BouncingDots,
    title: '/Loader/BouncingDots',
};

export function basic( args: { content: string; underlined: boolean } ): Component {
    return {
        data(): object {
            return { args, bouncingDotsSizes };
        },
        components: { BouncingDots },
        props: Object.keys( args ),
        template: `
			<div>
				<div v-for="size in bouncingDotsSizes">
                    {{ size }}<br><br>
                    <BouncingDots :size="size"></BouncingDots><br><br>
				</div>
            </div>
		`,
    };
}

basic.args = {
    size: 'small',
};

basic.argTypes = {
    position: {
		control: {
			type: 'select',
			options: ['small', 'medium'],
		},
	},
};
