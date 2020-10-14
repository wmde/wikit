import Lookup from '@/components/Lookup';
import { Component } from 'vue';

export default {
	component: Lookup,
	title: 'Lookup',
};

export function all(): Component {
	return {
		components: { Lookup },
		data() {
			return {
				menuItems: [
					{
						label: 'potato',
						description: 'root vegetable',
					},
					{
						label: 'carrot',
						description: 'root vegetable, usually orange in color',
					},
					{
						label: 'zucchini',
						description: 'Edible summer squash, typically green in colour',
					},
					{
						label: 'eggplant',
						description: 'plant species Solanum melongena',
					},
					{
						label: 'broccoli',
						description: 'edible green plant in the cabbage family',
					},
					{
						label: 'cauliflower',
						description: 'vegetable, for the plant see Q7537 (Brassica oleracea var. botrytis)',
					},
					{
						label: 'brussels sprouts',
						description: 'vegetable',
					},
				],
			};
		},
		template: `
			<div>
			<p>
				<Lookup label="Label" :menu-items="menuItems" placeholder="Placeholder" width="medium"/>
			</p>
			</div>
		`,
	};
}
