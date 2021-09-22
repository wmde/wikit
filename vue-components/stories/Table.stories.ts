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
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                    },
                ],
            }
        },
        template: `
			<div style="max-width: 75%">
                <Table id="some-table" linearize="desktop">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dessert in desserts" :key="dessert.name">
                            <!-- When using the table make sure to include the
                                data-header for linearization and accesibility -->
                            <td data-header="Name">
                                {{dessert.name}}
                            </td>
                            <td data-header="Calories">{{dessert.calories}}</td>
                        </tr>
                    </tbody>
                </Table>
		    </div>
		`,
    };
}
