import { LitElement, html, css, customElement, property } from 'lit-element';
import { MyLeaf } from './my-leaf';

@customElement('my-tree')
class MyTree extends LitElement {

    static get properties() {
        return {
            id: { type: String },
            active: { type: Boolean },
            structure: { type: String }
        };
    }

    static get styles() {
        return css`
        .nested {
            display: none;
            user-select: none;
          }
          .active {
            display: block;
            user-select: none;
          }
          .pointer {
            user-select: none;
            cursor: pointer;
          }
        `;
    }

    render() {

        const data = JSON.parse(this.structure).data;

        return html`
        <ul class="pointer">
            <li><span @click="${this.handleClick}">${this.id}</span>
                <ul class="${this.active ? 'active' : 'nested'} pointer"><my-leaf id="1" .items="${data}"></my-leaf></ul>
            </li>
        </ul>
        `;
    }

    handleClick() {
        this.active = !this.active;
    }
}

customElements.define('my-tree', MyTree);
customElements.define('my-leaf', MyLeaf);