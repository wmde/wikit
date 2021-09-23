import Table from '@/components/Table';
import { Component } from 'vue';

export default {
	component: Table,
	title: 'Table'
};

export function basic( args: object ): Component {
    return {
        components: { Table },
        props: Object.keys( args ),
        data(): object {
            return {
                cells: [
                    {
                        col1: 'Potato',
                        col2: 'Yes',
                        col3: 1240,
                        col4: 15,
                    },
                    {
                        col1: 'Carrot',
                        col2: 'Yes',
                        col3: 800,
                        col4: 12,
                    },
                    {
                        col1: 'Onion',
                        col2: 'Yes',
                        col3: 50,
                        col4: 3,
                    },
                    {
                        col1: 'Tomato',
                        col2: 'No',
                        col3: 300,
                        col4: 10,
                    },
                    {
                        col1: 'Root Beet',
                        col2: 'Yes',
                        col3: 200,
                        col4: 5,
                    },
                    {
                        col1: 'Lettuce',
                        col2: 'No',
                        col3: 50,
                        col4: 1,
                    }
                ],
            }
        },
        template: `
			<div style="max-width: 75%">
                <Table id="some-table" linearize="desktop">
                    <thead>
                        <tr>
                            <th scope="col">Vegetable</th>
                            <th scope="col">Cooked</th>
                            <th scope="col">Calories</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cell in cells" :key="cell.col1">
                            <!-- When using the table make sure to include the
                                data-header for linearization and accesibility -->
                            <td data-header="Vegetable">
                                {{cell.col1}}
                            </td>
                            <td data-header="Column 2">{{cell.col2}}</td>
                            <td data-header="Column 3">{{cell.col3}}</td>
                            <td data-header="Column 4">{{cell.col4}}</td>
                        </tr>
                    </tbody>
                </Table>
		    </div>
		`,
    };
}
