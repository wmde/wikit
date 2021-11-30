import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import { Component } from 'vue';

export default {
	component: Dialog,
	title: '/Dialog',
};

export function normal(): Component {
	return {
		components: { Button, Dialog },
		template: `
			<div>
				<Button 
					@click.native="$refs.simple.show()" 
					variant="primary" type="progressive"
				>
					Open Simple Dialog
				</Button>
				<Dialog
					title="This is a simple dialog"
					ref="simple"
					:actions="[
						{
							label: 'Close me',
							namespace: 'close'
						}
					]"
					style="transform: translate(50%, 50%)"
					@action="(_, dialog) => dialog.hide()"
					dismiss-button
					visible
				>
					<p style="margin-bottom:10px">Hello, I am a simple dialog</p>
					<ul style="list-style-type: none;">
						<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						Fusce imperdiet metus eget ipsum euismod, non dictum velit 
						consequat. Curabitur sit amet neque vitae eros placerat luct
						us. Aenean sagittis, libero sed lacinia sollicitudin, </li>
						<li>Vestibulum vitae tortor ac ipsum blandit vulputate.
						Suspendisse eget nisi tortor. Vestibulum non odio pharetra</li>
					</ul>
				</Dialog>
			</div>
		`,
	};
}

export function complex(): Component {
	return {
		components: { Button, Dialog },
		// The primary button types are all in the same story to achieve high % of visual tests coverage.
		// Do not use controls to change the type unless you actively decide that is better than having test coverage.
		template: `
			<div>
				<Button 
					@click.native="$refs.complex.show()" 
					variant="primary" type="progressive"
				>
				Open Complex Dialog
				</Button>
				<Dialog
					title="This is a complex dialog"
					ref="complex"
					:actions="[
						{
							label: 'Test Primary',
							namespace: 'primary'
						}
					]"
					style="transform: translate(50%, 50%)"
					@action="(_, dialog) => dialog.hide()"
					dismiss-button
					visible
				>
					<h1 style="font-size:1.2rem;margin-bottom:1rem;">Hello, I am a complex dialog</h1>
					<ul style="list-style-type: none;">
						<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						Fusce imperdiet metus eget ipsum euismod, non dictum velit 
						consequat. Curabitur sit amet neque vitae eros placerat luct
						us. Aenean sagittis, libero sed lacinia sollicitudin, </li>
						<li>Vestibulum vitae tortor ac ipsum blandit vulputate.
						Suspendisse eget nisi tortor. Vestibulum non odio pharetra</li>
					</ul>
				</Dialog>
			</div>
		`
	};
}