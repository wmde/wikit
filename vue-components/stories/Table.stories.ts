import { Table } from '@/main';
import { Component } from 'vue';

export default {
	component: Table,
	title: 'Table',
};

export function basic( args: object ): Component {
	return {
		components: { Table },
		props: Object.keys( args ),
		data(): object {
			return {
				cells: [
					{
						col1: 'Uovo in Raviolo',
						col2: 'Italy',
						col3: 'Egg',
						col4: 'High',
					},
					{
						col1: 'Latkes',
						col2: 'Israel',
						col3: 'Potato',
						col4: 'High',
					},
					{
						col1: 'Chile en Nogada',
						col2: 'Mexico',
						col3: 'Poblano pepper',
						col4: 'High',
					},
					{
						col1: 'Käsespätzle',
						col2: 'Germany',
						col3: 'Spätzle pasta',
						col4: 'High',
					},
					{
						col1: 'Clam Chowder',
						col2: 'USA',
						col3: 'Clams',
						col4: 'High',
					},
					{
						col1: 'Salmorejo',
						col2: 'Spain',
						col3: 'Tomato',
						col4: 'High',
					},
				],
			};
		},
		template: `
			<div style="max-width: 75%">
                <Table id="some-table" :linearize="linearize">
                    <thead>
                        <tr>
                            <th scope="col">Dish</th>
                            <th scope="col">Country</th>
                            <th scope="col">Main ingredient</th>
                            <th scope="col">Tastiness</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cell, i) in cells" :key="i">
                            <!-- When using the table make sure to include the
                                data-header to provide additional context in the 
                                table's linearized form -->
                            <td data-header="Dish">{{cell.col1}}</td>
                            <td data-header="Country">{{cell.col2}}</td>
                            <td data-header="Main ingredient">{{cell.col3}}</td>
                            <td data-header="Tastiness">{{cell.col4}}</td>
                        </tr>
                    </tbody>
                </Table>
		    </div>
		`,
	};
}

basic.args = {
	linearize: 'tablet',
};

basic.argTypes = {
	linearize: {
		table: {
			defaultValue: {
				summary: 'tablet',
			},
		},
		control: {
			type: 'select',
			options: [ 'mobile', 'tablet', 'desktop' ],
			default: 'tablet',
		},
	},
};
