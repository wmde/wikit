import LookupWithExtender from '@/components/LookupWithExtender';
import { Component } from 'vue';

export default {
    component: LookupWithExtender,
    // the `/` prefix in the title is needed for "Input" to appear as a folded navigation item, and not a headline
    title: '/Input/LookupWithExtender',
};

export function basic(): Component {
    return {
        components: { LookupWithExtender },
        template: `
			<div>
				<LookupWithExtender label="Label" placeholder="Placeholder">
                  <div style="font-family: sans-serif; font-style: normal; font-weight: normal; font-size: 16px; line-height: 20px; color: #72777D;">
                    Menu content placeholder. Any text or component can be displayed here.
                  </div>
                </LookupWithExtender>
			</div>
		`,
    };
}
