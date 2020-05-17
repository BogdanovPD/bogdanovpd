import { LitElement, html, css, customElement, property } from 'lit-element';

@customElement('my-leaf')
export class MyLeaf extends LitElement {
    static get properties() {
        return {
            id: { type: String },
            active: { type: Boolean }
        };
    }

    static get styles() {
        return css`
        .nested {
            display: none;
          }
          .active {
            display: block;
          }
          .pointer {
            user-select: none;
            cursor: pointer;
          }
        `;
    }

    render() {
        return html`${this.items ?
            html`
            <li><span @click="${this.handleClick}">${this.id}</span>
                <ul class="${this.active ? 'active' : 'nested'} pointer">
                    ${this.items.map(item => html`<my-leaf .items="${item.items}" .id="${item.id}"></my-leaf>`)}
                </ul>
            </li>
            ` : html`<li><span>${this.id}</span></li>`}`
    }

    handleClick() {
        this.active = !this.active;
    }
}